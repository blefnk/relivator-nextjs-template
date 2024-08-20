// This file manages the configuration of Stripe subscription plans used on the website.
// Ensure to set the Stripe price IDs in the environment variables to maintain a layer of security.
// Always keep the subscription plans synchronized between this file and the Stripe dashboard
// to prevent discrepancies and potential issues in transaction handling.
// @see https://github.com/apestein/nextflix/blob/main/src/lib/configs.ts
import type { SubscriptionPlanTypes } from "@/types/reliverse/plan";

import { env } from "~/env";

const PROFESSIONAL = env.STRIPE_PROFESSIONAL_SUBSCRIPTION_PRICE_ID || "";

const ENTERPRISE =
  env.STRIPE_ENTERPRISE_SUBSCRIPTION_PRICE_ID || PROFESSIONAL || "";

export const storeSubscriptionPlans: SubscriptionPlanTypes[] = [
  {
    id: "starter",
    name: "Starter",
    description: "Free, for trying things out.",
    features: ["Create up to 1 store", "Create up to 20 products per store"],
    price: 0,
    stripePriceId: "none",
  },
  {
    id: "professional",
    name: "Professional",
    description: "For you and the team, with all the pro features.",
    features: ["Create up to 2 store", "Create up to 25 products per store"],
    price: 12,
    stripePriceId: PROFESSIONAL,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    description: "Extended plan crafted for high-volume sales.",
    features: ["Create up to 3 stores", "Create up to 35 products per store"],
    price: 24,
    stripePriceId: ENTERPRISE,
  }, // eslint-disable-next-line @stylistic/max-len
]; // description: "Usage-based plan crafted for high-volume sales, with unlimited features.",// features: [//   "20 Products (per store)",//   "2 Stores Max",//   "Basic Analytics",//   "Community Support",// ],// features: [//   "40 Products (per store)",//   "3 Stores Max",//   "Advanced Analytics",//   "Email Support",// ],// features: [//   "Custom Store Count",//   "Custom Products",//   "Unlimited Analytics",//   "Email Support",// ],
