/**
 * This file contains the subscription plans that are available for purchase.
 * TODO: Merge with ./subscriptions2.ts
 * @see https://github.com/sadmann7/skateshop/blob/main/src/config/subscriptions.ts
 */

import { type SubscriptionPlan } from "~/types";

import { env } from "~/data/env/env.mjs";

export const storeSubscriptionPlans: SubscriptionPlan[] = [
  {
    id: "starter",
    name: "Starter",
    description: "Kickstart Your Online Sales",
    features: [
      "1 Store Max",
      "10 Products (per store)",
      "Limited Analytics",
      "Community Support",
    ],
    stripePriceId: "",
    price: 0,
  },
  {
    id: "basic",
    name: "Basic",
    description: "Expand Your Online Presence.",
    features: [
      "2 Stores Max",
      "15 Products (per store)",
      "Basic Analytics",
      "Community Support",
    ],
    stripePriceId: env.STRIPE_BASIC_MONTHLY_PRICE_ID,
    price: 10,
  },
  {
    id: "advanced",
    name: "Advanced",
    description: "Scale Your Online Business",
    features: [
      "4 Stores Max",
      "20 Products (per store)",
      "Advanced Analytics",
      "Email Support",
    ],
    stripePriceId: env.STRIPE_ADVANCED_MONTHLY_PRICE_ID,
    price: 20,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    description: "Crafted for High-Volume Sales",
    features: [
      "Custom Store Count",
      "Custom Products (per store)",
      "Advanced Analytics",
      "Email Support",
    ],
    stripePriceId: env.STRIPE_ENTERPRISE_MONTHLY_PRICE_ID,
    price: 0,
  },
];
