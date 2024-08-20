import type {
  SubscriptionPlanTypes,
  UserSubscriptionPlan,
} from "@/types/reliverse/plan";

import { storeSubscriptionPlans } from "~/core/stripe/subs";
import { env } from "~/env";

export const PROFESSIONAL = env.STRIPE_PROFESSIONAL_SUBSCRIPTION_PRICE_ID || "";

// export const ENTERPRISE = env.STRIPE_ENTERPRISE_SUBSCRIPTION_PRICE_ID || PROFESSIONAL || "";
// export async function getUserSubscriptionPlan(): Promise<UserSubscriptionPlan | null> {
export function getPlanFeatures(planId?: SubscriptionPlanTypes["id"]) {
  const plan = storeSubscriptionPlans.find((plan) => plan.id === planId);

  const features = plan?.features.flatMap((feature) => feature.split(","));

  const maxStoreCount =
    (features?.find((feature) => feature.match(/store/)) && // @ts-expect-error TODO: fix
      features.find((feature) => feature.match(/store/)).match(/\d+/)) ||
    0;

  const maxProductCount =
    (features?.find((feature) => feature.match(/product/)) &&
      features.find((feature) => feature.match(/product/)) &&
      features.find((feature) => feature.match(/product/))?.match(/\d+/)) ||
    0;

  return {
    maxProductCount,
    maxStoreCount,
  };
}

export function getDashboardRedirectPath(input: {
  storeCount: number;
  subscriptionPlan?: null | UserSubscriptionPlan;
}): string {
  const { storeCount, subscriptionPlan } = input;

  // todo: implement `enterprise` custom things
  const minStoresWithProductCount = {
    enterprise: 4,
    professional: 3,
    starter: 2,
  }[(subscriptionPlan && subscriptionPlan.id) || "starter"];

  const isActive = (subscriptionPlan && subscriptionPlan.isActive) || false;
  const hasEnoughStores = storeCount >= minStoresWithProductCount;

  return isActive && hasEnoughStores
    ? "/dashboard/billing"
    : "/dashboard/stores/new";
}
