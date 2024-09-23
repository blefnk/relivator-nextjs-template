import type { Store } from "~/db/schema";

export type Plan = {
  limits: {
    products: number;
    stores: number;
    tags: number;
    variants: number;
  };
  description: string;
  features: string[];
  id: Store["plan"];
  stripePriceId: string;
  title: string;
};

export type PlanWithPrice = {
  price: string;
} & Plan;

export type UserPlan = {
  isActive: boolean;
  isCanceled: boolean;
  isSubscribed: boolean;
  stripeCurrentPeriodEnd?: null | string;
  stripeCustomerId?: null | string;
  stripeSubscriptionId?: null | string;
} & Plan;

export type SubscriptionPlanTypes = {
  description: string;
  features: string[];
  id: "enterprise" | "professional" | "starter";
  name: string;
  price: number;
  stripePriceId: string;
};

export type UserSubscriptionPlan = {
  isActive: boolean;
  isCanceled: boolean;
  isSubscribed: boolean;
  stripeCurrentPeriodEnd?: null | string;
  stripeCustomerId?: null | string;
  stripeSubscriptionId?: null | string;
} & SubscriptionPlanTypes;
