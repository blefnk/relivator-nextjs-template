import type { Plan } from "~/types/plan";

import { pricingConfig } from "~/constants/pricing";

export function getPlanByPriceId({ priceId }: { priceId: string }) {
  return Object.values(pricingConfig.plans).find(
    (plan) => plan.stripePriceId === priceId,
  );
}

export function getPlanLimits({ planId }: { planId?: Plan["id"] }) {
  // @ts-expect-error disable ts error during migration
  const { features } = pricingConfig.plans[planId ?? "free"];

  // @ts-expect-error disable ts error during migration
  const [storeLimit, productLimit] = features.map((feature) => {
    const [value] = feature.match(/\d+/) || [];

    return value ? Number.parseInt(value, 10) : 0;
  });

  return { productLimit: productLimit ?? 0, storeLimit: storeLimit ?? 0 };
}
