"use server";

import {
  unstable_cache as cache,
  unstable_noStore as noStore,
} from "next/cache";

import type { SearchParams } from "@/types/reliverse/meta";

import { getStoresSchema } from "@/actions/reliverse/validations/store";
import { takeFirstOrThrow } from "@/utils/reliverse/throw";
import consola from "consola";
import {
  and,
  asc,
  count,
  countDistinct,
  desc,
  eq,
  isNull,
  not,
  sql,
} from "drizzle-orm";

import type { Store } from "~/db/schema/provider";

import { db } from "~/db";
import { orders, products, stores } from "~/db/schema/provider";

export async function getFeaturedStores() {
  return await cache(
    async () => {
      return db
        .select({
          id: stores.id,
          name: stores.name,
          description: stores.description,
          productCount: count(products.id),
          slug: stores.slug,
          stripeAccountId: stores.stripeAccountId,
        })
        .from(stores)
        .limit(4)
        .leftJoin(products, eq(products.storeId, stores.id))
        .groupBy(stores.id)
        .orderBy(desc(sql`count(*)`));
    },
    ["featured-stores"],
    {
      revalidate: 3600, // every hour
      tags: ["featured-stores"],
    },
  )();
}

export async function getStoreByUserId(input: {
  userId: string;
}) {
  noStore();
  try {
    return await db
      .select({
        id: stores.id,
        slug: stores.slug,
      })
      .from(stores)
      .where(eq(stores.userId, input.userId))
      .orderBy(desc(stores.stripeAccountId))
      .then(takeFirstOrThrow);
  } catch (error) {
    consola.error(error);

    return null;
  }
}

export async function getStoresByUserId(input: {
  userId: string;
}) {
  return await cache(
    async () => {
      return db
        .select({
          id: stores.id,
          name: stores.name,
          customerCount: countDistinct(orders.email),
          description: stores.description,
          orderCount: count(orders.id),
          productCount: count(products.id),
          slug: stores.slug,
          stripeAccountId: stores.stripeAccountId,
        })
        .from(stores)
        .leftJoin(products, eq(products.storeId, stores.id))
        .leftJoin(orders, eq(orders.storeId, stores.id))
        .groupBy(stores.id)
        .orderBy(desc(stores.stripeAccountId), desc(sql`count(*)`))
        .where(eq(stores.userId, input.userId));
    },
    [`stores-${input.userId}`],
    {
      revalidate: 900,
      tags: [`stores-${input.userId}`],
    },
  )();
}

export async function getStores(input: SearchParams) {
  noStore();

  try {
    const search = getStoresSchema.parse(input);

    const limit = 10;
    const searchPage = search.page || 1;
    const offset = (searchPage - 1) * limit;

    const [column, order] =
      (search.sort?.split(".") as [
        keyof Store | undefined,
        "asc" | "desc" | undefined,
      ]) || [];

    const statuses = search.statuses?.split(".") || [];

    const { data, total } = await db.transaction(async (tx) => {
      const data = await tx
        .select({
          id: stores.id,
          name: stores.name,
          description: stores.description,
          productCount: count(products.id),
          slug: stores.slug,
          stripeAccountId: stores.stripeAccountId,
        })
        .from(stores)
        .limit(limit)
        .offset(offset)
        .leftJoin(products, eq(stores.id, products.storeId))
        .where(
          and(
            search.userId ? eq(stores.userId, search.userId) : undefined,
            statuses.includes("active") && !statuses.includes("inactive")
              ? not(isNull(stores.stripeAccountId))
              : undefined,
            statuses.includes("inactive") && !statuses.includes("active")
              ? isNull(stores.stripeAccountId)
              : undefined,
          ),
        )
        .groupBy(stores.id)
        .orderBy(
          input.sort === "stripeAccountId.asc"
            ? asc(stores.stripeAccountId)
            : input.sort === "stripeAccountId.desc"
              ? desc(stores.stripeAccountId)
              : input.sort === "productCount.asc"
                ? asc(sql`count(*)`)
                : input.sort === "productCount.desc"
                  ? desc(sql`count(*)`)
                  : column && column in stores
                    ? order === "asc"
                      ? asc(stores[column])
                      : desc(stores[column])
                    : desc(stores.createdAt),
        );

      const total = await tx
        .select({
          count: count(stores.id),
        })
        .from(stores)
        .where(
          and(
            search.userId ? eq(stores.userId, search.userId) : undefined,
            statuses.includes("active") && !statuses.includes("inactive")
              ? not(isNull(stores.stripeAccountId))
              : undefined,
            statuses.includes("inactive") && !statuses.includes("active")
              ? isNull(stores.stripeAccountId)
              : undefined,
          ),
        )
        .execute()
        .then((res) => res[0]?.count || 0);

      return {
        data,
        total,
      };
    });

    const pageCount = Math.ceil(total / limit);

    return {
      data,
      pageCount,
    };
  } catch (error) {
    consola.error(error);

    return {
      data: [],
      pageCount: 0,
    };
  }
}
