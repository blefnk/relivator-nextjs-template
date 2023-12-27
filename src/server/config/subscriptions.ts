/**
 * This file manages the configuration of Stripe subscription plans used on the website.
 * Ensure to set the Stripe price IDs in your environment variables to maintain a layer of security.
 * Always keep your subscription plans synchronized between this file and your Stripe dashboard
 * to prevent discrepancies and potential issues in transaction handling.
 *
 * @see https://github.com/apestein/nextflix/blob/main/src/lib/configs.ts
 * @see https://github.com/sadmann7/skateshop/blob/main/src/config/subscriptions.ts
 */

import type { SubscriptionPlanTypes } from "~/types";

import { env } from "~/env.mjs";

export const PROFESSIONAL = env.STRIPE_PROFESSIONAL_SUBSCRIPTION_PRICE_ID ?? "";
export const ENTERPRISE =
  env.STRIPE_ENTERPRISE_SUBSCRIPTION_PRICE_ID ?? PROFESSIONAL ?? "";

export const storeSubscriptionPlans: SubscriptionPlanTypes[] = [
  {
    id: "starter",
    name: "Starter",
    description: "Free, for trying things out.",
    features: ["Create up to 1 store", "Create up to 20 products per store"],
    stripePriceId: "none",
    price: 0,
  },
  {
    id: "professional",
    name: "Professional",
    description: "For you and your team, with all the pro features.",
    features: ["Create up to 2 store", "Create up to 25 products per store"],
    stripePriceId: PROFESSIONAL,
    price: 12,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    description: "Extended plan crafted for high-volume sales.",
    features: ["Create up to 3 stores", "Create up to 35 products per store"],
    stripePriceId: ENTERPRISE,
    price: 24,
  },
];

// description: "Usage-based plan crafted for high-volume sales, with unlimited features.",
// features: [
//   "20 Products (per store)",
//   "2 Stores Max",
//   "Basic Analytics",
//   "Community Support",
// ],
// features: [
//   "40 Products (per store)",
//   "3 Stores Max",
//   "Advanced Analytics",
//   "Email Support",
// ],
// features: [
//   "Custom Store Count",
//   "Custom Products",
//   "Unlimited Analytics",
//   "Email Support",
// ],
