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
