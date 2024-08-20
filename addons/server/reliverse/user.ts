"use server";

import { cache } from "react";

import { unstable_noStore as noStore } from "next/cache";

import consola from "consola";
import { count, countDistinct, eq } from "drizzle-orm";

import { authjs } from "~/auth/authjs";
import { clerk } from "~/auth/clerk";
import { db } from "~/db";
import { products, stores } from "~/db/schema/provider";

// import { getPlan } from "@/actions/reliverse//stripe";
// import { getPlanLimits } from "@/server/reliverse/subscription";
// Cache is used with a data-fetching function like fetch to share a data snapshot between components.
// eslint-disable-next-line @stylistic/max-len
// It ensures a single request is made for multiple identical data fetches, with the returned data cached and shared across components during the server render.
// @see https://react.dev/reference/react/cache#reference
export const getCachedUserClerk = cache(clerk);

export const getCachedUserAuthJs = cache(authjs);

export async function getUserUsageMetrics(input: {
  userId: string;
}) {
  noStore();
  try {
    const data = await db
      .select({
        productCount: count(products.id),
        storeCount: countDistinct(stores.id),
      })
      .from(stores)
      .leftJoin(products, eq(stores.id, products.storeId))
      .where(eq(stores.userId, input.userId))
      .groupBy(stores.userId)
      .execute()
      .then((res) => res[0]);

    return {
      productCount: data?.productCount || 0,
      storeCount: data?.storeCount || 0,
    };
  } catch (error) {
    consola.error(error);

    return {
      productCount: 0,
      storeCount: 0,
    };
  }
}

// export async function getUserPlanMetrics(input: { userId: string }) {
export async function getUserPlanMetrics() {
  noStore();

  // TODO: Finish (src\server\queries\user.ts)
  // try {
  //   const subscriptionPlan = await getPlan({ userId: input.userId });
  //   if (!subscriptionPlan) {
  //     return fallback;
  //   }
  //   const { productCount, storeCount } = await getUserUsageMetrics({
  //     userId: input.userId,
  //   });
  //   const { productLimit, storeLimit } = getPlanLimits({
  //     planId: subscriptionPlan.id,
  //   });
  //   const storeLimitExceeded = storeCount >= storeLimit;
  //   const productLimitExceeded = productCount >= productLimit;
  //   return {
  //     productCount,
  //     productLimit,
  //     productLimitExceeded,
  //     storeCount,
  //     storeLimit,
  //     storeLimitExceeded,
  //     subscriptionPlan,
  //   };
  // } catch (error) {
  //   return fallback;
  // }
  return {
    productCount: 0,
    productLimit: 0,
    productLimitExceeded: false,
    storeCount: 0,
    storeLimit: 0,
    storeLimitExceeded: false,
    subscriptionPlan: null,
  };
}
