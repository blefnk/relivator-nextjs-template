"use server";

import type {
  PlanWithPrice,
  UserPlan,
  UserSubscriptionPlan,
} from "~/types/plan";
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
import { HOUR } from "~/constants/math";
import { pricingConfig } from "~/constants/pricing";
import { stripe } from "~/core/stripe/connect";
import { storeSubscriptionPlans } from "~/core/stripe/subs";
import { db } from "~/db";
import { users } from "~/db/schema";
import { userPrivateMetadataSchema } from "~/server/validations/deprecated/auth";
import { formatPrice } from "~/utils/number";

// Retrieve prices for all plans from Stripe
export async function getPlans(): Promise<PlanWithPrice[]> {
  // @ts-expect-error disable ts error during migration
  return await cache(
    async () => {
      const starterPriceId = pricingConfig.plans.starter.stripePriceId;
      const proPriceId = pricingConfig.plans.pro.stripePriceId;

      const [starterPrice, proPrice] = await Promise.all([
        stripe.prices.retrieve(starterPriceId),
        stripe.prices.retrieve(proPriceId),
      ]);

      const currency = proPrice.currency;

      return Object.values(pricingConfig.plans).map((plan) => {
        const price =
          plan.stripePriceId === proPriceId
            ? proPrice
            : plan.stripePriceId === starterPriceId
              ? starterPrice
              : null;

        return {
          ...plan,
          price: formatPrice((price?.unit_amount ?? 0) / 100, { currency }),
        };
      });
    },
    ["subscription-plans"],
    {
      revalidate: HOUR,
      tags: ["subscription-plans"],
    },
  )();
}
