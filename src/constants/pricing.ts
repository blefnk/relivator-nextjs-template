import type { Plan } from "~/types/plan";

import { env } from "~/env";

export const pricingConfig = {
  plans: {
    free: {
      id: "free",
      description: "Perfect for small businesses that want to sell online.",
      features: ["Create up to 1 store", "Create up to 25 products"],
      limits: {
        products: 25,
        stores: 1,
        tags: 5,
        variants: 5,
      },
      stripePriceId: "",
      title: "Free",
    },
    pro: {
      id: "pro",
      description: "Perfect for big businesses that want to sell online.",
      features: ["Create up to 5 stores", "Create up to 100 products/store"],
      limits: {
        products: 100,
        stores: 5,
        tags: 50,
        variants: 15,
      },
      stripePriceId: env.STRIPE_ENTERPRISE_SUBSCRIPTION_PRICE_ID || "",
      title: "Pro",
    },
    // @ts-expect-error TODO: Fix ts
    starter: {
      id: "starter",
      description: "Perfect for midsize businesses that want to sell online.",
      features: ["Create up to 3 store", "Create up to 50 products/store"],
      limits: {
        products: 25,
        stores: 3,
        tags: 25,
        variants: 10,
      },
      stripePriceId: env.STRIPE_PROFESSIONAL_SUBSCRIPTION_PRICE_ID || "",
      title: "Starter",
    },
  } satisfies Record<Plan["id"], Plan>,
};

export type PricingConfig = typeof pricingConfig;
