"use server";

import type { UserSubscriptionPlan } from "~/types/plan";
import type { z } from "zod";

import { redirect } from "next/navigation";

import dayjs from "dayjs";
import { eq } from "drizzle-orm";

import { authjs } from "~/auth/authjs";
import { clerk } from "~/auth/clerk";
import { authProvider } from "~/auth/provider";
import { stripe } from "~/core/stripe/connect";
import { storeSubscriptionPlans } from "~/core/stripe/subs";
import { db } from "~/db";
import { users } from "~/db/schema";
import { userPrivateMetadataSchema } from "~/server/validations/deprecated/auth";

// Getting the subscription plan for a user
export async function getPlan(
  userId: string,
): Promise<null | UserSubscriptionPlan> {
  try {
    let userPrivateMetadata: z.infer<typeof userPrivateMetadataSchema> = {};

    console.log("userId", userId);

    const user = await db
      .select()
      .from(users)
      .where(eq(users.id, userId))
      .then((res) => res[0] || null);

    console.log("user", user);

    userPrivateMetadata = userPrivateMetadataSchema.parse(user);

    // Check if user is subscribed
    const ONE_DAY_MS = 86_400_000;

    const isSubscribed =
      userPrivateMetadata.stripePriceId &&
      Date.now() <
        dayjs(userPrivateMetadata.stripeCurrentPeriodEnd).valueOf() +
          ONE_DAY_MS;

    // Set default to "Starter" subscription
    const plan = isSubscribed
      ? storeSubscriptionPlans.find(
          (plan) => plan.stripePriceId === userPrivateMetadata.stripePriceId,
        )
      : storeSubscriptionPlans[0];

    // Check if user has canceled subscription
    let isCanceled = false;

    if (isSubscribed && !!userPrivateMetadata.stripeSubscriptionId) {
      const stripePlan = await stripe.subscriptions.retrieve(
        userPrivateMetadata.stripeSubscriptionId,
      );

      isCanceled = stripePlan.cancel_at_period_end;
    }

    if (plan) {
      return {
        ...plan,

        // @ts-expect-error TODO: fix
        isActive: isSubscribed && !isCanceled,
        isCanceled,
        // @ts-expect-error TODO: fix
        isSubscribed,
        stripeCurrentPeriodEnd:
          userPrivateMetadata.stripeCurrentPeriodEnd || "",
        stripeCustomerId: userPrivateMetadata.stripeCustomerId,
        stripeSubscriptionId: userPrivateMetadata.stripeSubscriptionId,
      };
    }

    return null;
  } catch {
    return null;
  }
}
