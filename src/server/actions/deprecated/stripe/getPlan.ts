"use server";

import type { UserPlan, UserSubscriptionPlan } from "~/types/plan";
import type { z } from "zod";

import {
  unstable_cache as cache,
  unstable_noStore as noStore,
} from "next/cache";
import { redirect } from "next/navigation";

import { clerkClient, currentUser } from "@clerk/nextjs/server";
import { addDays } from "date-fns";
import dayjs from "dayjs";
import { eq } from "drizzle-orm";

import { authjs } from "~/auth/authjs";
import { clerk } from "~/auth/clerk";
import { authProvider } from "~/auth/provider";
import { pricingConfig } from "~/constants/pricing";
import { stripe } from "~/core/stripe/connect";
import { storeSubscriptionPlans } from "~/core/stripe/subs";
import { db } from "~/db";
import { users } from "~/db/schema";
import { userPrivateMetadataSchema } from "~/server/validations/deprecated/auth";

// Getting the subscription plan by store id
export async function getPlan(input: {
  userId: string;
}): Promise<null | UserPlan> {
  noStore();

  try {
    const user = await clerkClient.users.getUser(input.userId);

    if (!user) {
      throw new Error("User not found.");
    }

    const userPrivateMetadata = userPrivateMetadataSchema.parse(
      user.privateMetadata,
    );

    // Check if user is subscribed
    const isSubscribed =
      !!userPrivateMetadata.stripePriceId &&
      !!userPrivateMetadata.stripeCurrentPeriodEnd &&
      addDays(
        new Date(userPrivateMetadata.stripeCurrentPeriodEnd),
        1,
      ).getTime() > Date.now();

    const plan = isSubscribed
      ? Object.values(pricingConfig.plans).find(
          (plan) => plan.stripePriceId === userPrivateMetadata.stripePriceId,
        )
      : pricingConfig.plans.free;

    if (!plan) {
      throw new Error("Plan not found.");
    }

    // Check if user has canceled subscription
    let isCanceled = false;

    if (isSubscribed && !!userPrivateMetadata.stripeSubscriptionId) {
      const stripePlan = await stripe.subscriptions.retrieve(
        userPrivateMetadata.stripeSubscriptionId,
      );

      isCanceled = stripePlan.cancel_at_period_end;
    }

    // @ts-expect-error disable ts error during migration
    return {
      ...plan,
      isActive: isSubscribed && !isCanceled,
      isCanceled,
      isSubscribed,
      stripeCurrentPeriodEnd: userPrivateMetadata.stripeCurrentPeriodEnd,
      stripeCustomerId: userPrivateMetadata.stripeCustomerId,
      stripeSubscriptionId: userPrivateMetadata.stripeSubscriptionId,
    };
  } catch (error) {
    return null;
  }
}
