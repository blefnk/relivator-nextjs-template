// Stripe Utilities
// =================
// This file contains utility functions and configurations for Stripe integration,
// specifically for handling subscription plans and customer status within the Stripe payment system.
// It includes methods for mapping Stripe price IDs to corresponding plans and for determining
// the customer's status based on their subscription history and payment methods.
// Please scroll down to the bottom of this file to read a detailed description of this file.
import { redirect } from "next/navigation";

//
import type Stripe from "stripe";

// You will also find links to inspirations and other additional learning resources there.
import { eq } from "drizzle-orm";

import { authjs } from "~/auth/authjs";
import { stripe } from "~/core/stripe/connect";
import { db } from "~/db/postgres";
import { users } from "~/db/schema/provider";
import { env } from "~/env";

export const PROFESSIONAL = env.STRIPE_PROFESSIONAL_SUBSCRIPTION_PRICE_ID || "";

export const ENTERPRISE =
  env.STRIPE_ENTERPRISE_SUBSCRIPTION_PRICE_ID || PROFESSIONAL || "";

// Retrieves a plan based on a Stripe price ID.
// @param {string} priceId - The Stripe price ID.
// _returns_ The corresponding plan object.
export function getPlanFromPriceId(priceId: string) {
  const mode = env.NODE_ENV === "production" ? "production" : "test";

  return PLANS.find(
    (plan) =>
      plan.price.monthly.priceIds[mode] === priceId ||
      plan.price.yearly.priceIds[mode] === priceId,
  )!;
}

// Definition of various subscription plans with theirs details
export const PLANS = [
  {
    name: "starter",
    price: {
      monthly: {
        amount: 9,
        priceIds: {
          production: "",
          test: "",
        },
      },
      yearly: {
        amount: 90,
        priceIds: {
          production: "",
          test: "",
        },
      },
    },
    quota: 20000,
    slug: "starter",
  },
  {
    name: "professional",
    price: {
      monthly: {
        amount: 9,
        priceIds: {
          production: PROFESSIONAL,
          test: PROFESSIONAL,
        },
      },
      yearly: {
        amount: 90,
        priceIds: {
          production: PROFESSIONAL,
          test: PROFESSIONAL,
        },
      },
    },
    quota: 50000,
    slug: "professional",
  },
  {
    name: "enterprise", // Usage-based subscription type - will be fully implemented in the feature
    price: {
      monthly: {
        amount: 49,
        priceIds: {
          production: ENTERPRISE,
          test: ENTERPRISE,
        },
      },
      yearly: {
        amount: 490,
        priceIds: {
          production: ENTERPRISE,
          test: ENTERPRISE,
        },
      },
    },
    quota: 1000000000, // Arbitrary large number to represent 'unlimited' - subject to future changes
    slug: "enterprise",
  },
];

// Cancels a Stripe subscription at the end of the current period.
// @param {string} [customer] - The Stripe customer ID.
// _returns_ The updated subscription details or void.
export async function cancelSubscription(customer?: string) {
  if (!customer) {
    return;
  }

  try {
    const subscriptionId = await stripe.subscriptions
      .list({
        customer,
      })
      .then((res) => res && res.data[0] && (res.data[0].id as string));

    return await stripe.subscriptions.update(subscriptionId || "", {
      cancel_at_period_end: true,
      cancellation_details: {
        comment: "🔔 Customer canceled their subscription.",
      },
    });
  } catch {
    return;
  }
}

// Type definition for parameters passed to getOrCreateCustomerId function
type GetOrCreateCustomerIdProps = {
  stripe: Stripe;
};

// Retrieves or creates a new Stripe customer ID based on the current user session.
// Redirects to the sign-in page if no session is found, or throws an error if no user is found.
// @param {GetOrCreateCustomerIdProps} Object containing Stripe instance.
// _returns_ {Promise<string>} - The Stripe customer ID.
export async function getOrCreateCustomerId({
  stripe,
}: GetOrCreateCustomerIdProps) {
  // const session = await authjs();
  // const user = await getUserById(session?.user.id || "");
  const user = await authjs();

  if (!user) {
    return redirect("/auth");
  }

  // const billingUrl = absoluteUrl("/dashboard/billing");
  // if (user.stripeCustomerId) {
  //   return user.stripeCustomerId;
  // }
  // Creating a new Stripe customer for the user
  // if (debugEnabled) consola.info("⌛customer-create...");
  const customer = await stripe.customers.create({
    name: user.name || undefined,
    email: user.email || undefined,

    // invoice_settings: { default_payment_method: ["card"] },
    metadata: {
      userId: user.id,
    }, // payment_method: paymentMethodId,
    // invoice_settings: {
    //   default_payment_method: paymentMethodId
    // },
    // payment_method: ["card"],
    preferred_locales: ["auto"],
  });

  // if (debugEnabled) consola.info(" ✓ [customer data]:", customer);
  const updatedUser = await db
    .update(users)
    .set({
      stripeCustomerId: customer.id,

      // stripePriceId: env.STRIPE_STARTER_SUBSCRIPTION_PRICE_ID,

      // stripeSubscriptionCurrentPeriodStart: new Date(

      //   subscription.current_period_start * 1000,

      // ),

      // stripeProductId: env.STRIPE_FREE_PRODUCT_PRICE_ID,

      // stripeSubscriptionCurrentPeriodEnd: new Date(

      //   subscription.current_period_end * 1000,

      // ),
    })
    .where(eq(users.id, user.id))
    .returning()
    .then((res) => res[0] || null);

  if (updatedUser && updatedUser.stripeCustomerId) {
    return updatedUser.stripeCustomerId;
  }
} /// / Stripe Utilities// =================// Description:// ------------// This file contains utility functions and configurations for Stripe integration,// specifically for handling subscription plans and customer status within the Stripe payment system.// It includes methods for mapping Stripe price IDs to corresponding plans and for determining// the customer's status based on their subscription history and payment methods.// Key Components:// ---------------// - PROFESSIONAL, ENTERPRISE: Constants for Stripe subscription price IDs.// - getPlanFromPriceId: Function to retrieve plan details based on a given Stripe price ID.// - PLANS: An array of plan objects detailing plan names, slugs, quotas, and prices.// Future Developments:// --------------------// There are placeholders for further enhancements, such as the introduction of usage-based subscriptions// for the 'enterprise' plan and adjustments to quota representations.// Usage:// ------// These utilities are intended to be used across the application wherever Stripe subscription// data is required. This centralization ensures consistency and ease of updates as Stripe's API evolves.// Learning Resources and Inspirations:// ------------------------------------// @see https://github.com/steven-tey/dub/blob/main/apps/web/lib/stripe// @see https://github.com/alissonsleal/brapi/blob/main/services/stripe// @see https://github.com/sadmann7/skateshop/blob/main/src/app/_actions/stripe.ts// @see https://github.com/sadmann7/skateshop/blob/main/src/app/api/webhooks/stripe/route.ts// @see https://github.com/jackblatch/OneStopShop/blob/main/server-actions/stripe/payment.ts//
