/**
 * Stripe Utilities
 * =================
 *
 * This file contains utility functions and configurations for Stripe integration,
 * specifically for handling subscription plans and customer status within the Stripe payment system.
 * It includes methods for mapping Stripe price IDs to corresponding plans and for determining
 * the customer's status based on their subscription history and payment methods.
 *
 * Please scroll down to the bottom of this file to read a detailed description of this file.
 * You will also find links to inspirations and other additional learning resources there.
 */

import { redirect } from "next/navigation";
import { absoluteUrl } from "~/utils";
import { eq } from "drizzle-orm";
import type Stripe from "stripe";

import { stripe } from "~/core/stripe/connect";
import { db } from "~/data/db";
import { users } from "~/data/db/schema";
import { env } from "~/env.mjs";
import { getServerAuthSession, getUserById } from "~/utils/auth/users";

export const PROFESSIONAL = env.STRIPE_PROFESSIONAL_SUBSCRIPTION_PRICE_ID ?? "";
export const ENTERPRISE =
  env.STRIPE_ENTERPRISE_SUBSCRIPTION_PRICE_ID ?? PROFESSIONAL ?? "";

const debug = env.NODE_ENV === "development";

/**
 * Retrieves a plan based on a Stripe price ID.
 *
 * @param {string} priceId - The Stripe price ID.
 *
 * _returns_ The corresponding plan object.
 */
export function getPlanFromPriceId(priceId: string) {
  const mode = env.NODE_ENV === "production" ? "production" : "test";
  // biome-ignore lint/style/noNonNullAssertion: <explanation>
  return PLANS.find(
    (plan) =>
      plan.price.monthly.priceIds[mode] === priceId ||
      plan.price.yearly.priceIds[mode] === priceId,
  )!;
}

/**
 * Determines if a user is a new customer based on Stripe data.
 *
 * @param previousAttributes - The previous Stripe subscription attributes.
 *
 * _returns_ {boolean} - True if the user is a new customer.
 */
export function isNewCustomer(
  previousAttributes:
    | {
        default_payment_method?: string;
        items?: {
          data?: {
            price?: {
              id?: string;
            }[];
          };
        };
      }
    | undefined,
) {
  let isNewCustomer = false;
  try {
    if (
      // Check for upgrade from free to pro
      previousAttributes?.default_payment_method === null
    ) {
      isNewCustomer = true;
    } else {
      // Check for upgrade from pro to enterprise
      const oldPriceId =
        // biome-ignore lint/complexity/useOptionalChain: <explanation>
        previousAttributes?.items?.data &&
        previousAttributes?.items?.data[0].price.id;
      if (
        oldPriceId &&
        getPlanFromPriceId(oldPriceId).slug === "professional"
      ) {
        isNewCustomer = true;
      }
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }
  return isNewCustomer;
}

// Definition of various subscription plans with theirs details
export const PLANS = [
  {
    name: "starter",
    slug: "starter",
    quota: 20000,
    price: {
      monthly: {
        amount: 9,
        priceIds: {
          test: "",
          production: "",
        },
      },
      yearly: {
        amount: 90,
        priceIds: {
          test: "",
          production: "",
        },
      },
    },
  },
  {
    name: "professional",
    slug: "professional",
    quota: 50000,
    price: {
      monthly: {
        amount: 9,
        priceIds: {
          test: PROFESSIONAL,
          production: PROFESSIONAL,
        },
      },
      yearly: {
        amount: 90,
        priceIds: {
          test: PROFESSIONAL,
          production: PROFESSIONAL,
        },
      },
    },
  },
  {
    name: "enterprise", // Usage-based subscription type - will be fully implemented in the feature
    slug: "enterprise",
    quota: 1000000000, // Arbitrary large number to represent 'unlimited' - subject to future changes
    price: {
      monthly: {
        amount: 49,
        priceIds: {
          test: ENTERPRISE,
          production: ENTERPRISE,
        },
      },
      yearly: {
        amount: 490,
        priceIds: {
          test: ENTERPRISE,
          production: ENTERPRISE,
        },
      },
    },
  },
];

/**
 * Cancels a Stripe subscription at the end of the current period.
 *
 * @param {string} [customer] - The Stripe customer ID.
 *
 * _returns_ The updated subscription details or void.
 */
export async function cancelSubscription(customer?: string) {
  if (!customer) return;

  try {
    const subscriptionId = await stripe.subscriptions
      .list({
        customer,
      })
      .then((res) => res?.data[0]?.id as string);

    return await stripe.subscriptions.update(subscriptionId, {
      cancel_at_period_end: true,
      cancellation_details: {
        comment: "🔔 Customer canceled their subscription.",
      },
    });
  } catch (error) {
    console.error("❌ Error cancelling Stripe subscription.", error);
    return;
  }
}

// Type definition for parameters passed to getOrCreateCustomerId function
type getOrCreateCustomerIdProps = { stripe: Stripe };

/**
 * Retrieves or creates a new Stripe customer ID based on the current user session.
 * Redirects to the sign-in page if no session is found, or throws an error if no user is found.
 *
 * @param {getOrCreateCustomerIdProps} Object containing Stripe instance.
 *
 * _returns_ {Promise<string>} - The Stripe customer ID.
 */
export async function getOrCreateCustomerId({
  stripe,
}: getOrCreateCustomerIdProps) {
  const session = await getServerAuthSession();
  if (!session) return redirect("/auth");
  const user = await getUserById(session.id);
  if (!user) throw new Error("❌ [getOrCreateCustomerId] something wrong");
  const billingUrl = absoluteUrl("/dashboard/billing");
  if (user.stripeCustomerId) return user.stripeCustomerId;

  // Creating a new Stripe customer for the user
  // if (debug) console.log("⌛customer-create...");
  const customer = await stripe.customers.create({
    email: user.email ?? undefined,
    name: user.name ?? undefined,
    preferred_locales: ["auto"],
    // payment_method: paymentMethodId,
    // invoice_settings: {
    //   default_payment_method: paymentMethodId
    // },
    // payment_method: ["card"],
    // invoice_settings: { default_payment_method: ["card"] },
    metadata: {
      userId: user.id,
    },
  });
  // if (debug) console.log(" ✓ [customer data]:", customer);

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
    .then((res) => res[0] ?? null);

  if (updatedUser?.stripeCustomerId) {
    if (debug) {
      console.log(
        " ✓ [getOrCreateCustomerId] stripeCustomerId was successfully created for user:",
        user.id,
      );
    }
    return updatedUser.stripeCustomerId;
  }
}

/**
 * Stripe Utilities
 * =================
 *
 * Description:
 * ------------
 * This file contains utility functions and configurations for Stripe integration,
 * specifically for handling subscription plans and customer status within the Stripe payment system.
 * It includes methods for mapping Stripe price IDs to corresponding plans and for determining
 * the customer's status based on their subscription history and payment methods.
 *
 * Key Components:
 * ---------------
 * - PROFESSIONAL, ENTERPRISE: Constants for Stripe subscription price IDs.
 * - getPlanFromPriceId: Function to retrieve plan details based on a given Stripe price ID.
 * - isNewCustomer: Custom type coercion function to check if a user is a new Stripe customer.
 * - PLANS: An array of plan objects detailing plan names, slugs, quotas, and prices.
 *
 * Note on isNewCustomer:
 * ----------------------
 * This function performs custom type checks due to discrepancies in Stripe's type definitions.
 * It identifies new customers based on their payment methods and previous subscription plans.
 *
 * Future Developments:
 * --------------------
 * There are placeholders for further enhancements, such as the introduction of usage-based subscriptions
 * for the 'enterprise' plan and adjustments to quota representations.
 *
 * Usage:
 * ------
 * These utilities are intended to be used across the application wherever Stripe subscription
 * data is required. This centralization ensures consistency and ease of updates as Stripe's API evolves.
 *
 * Learning Resources and Inspirations:
 * ------------------------------------
 * @see https://github.com/steven-tey/dub/blob/main/apps/web/lib/stripe
 * @see https://github.com/alissonsleal/brapi/blob/main/services/stripe
 * @see https://github.com/sadmann7/skateshop/blob/main/src/app/_actions/stripe.ts
 * @see https://github.com/sadmann7/skateshop/blob/main/src/app/api/webhooks/stripe/route.ts
 * @see https://github.com/jackblatch/OneStopShop/blob/main/server-actions/stripe/payment.ts
 */
