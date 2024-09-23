import "server-only";

import type { Product } from "~/db/schema";
import type { SearchParams } from "~/types/meta";

import {
  unstable_cache as cache,
  unstable_noStore as noStore,
} from "next/cache";

import { and, asc, count, desc, eq, gte, inArray, lte, sql } from "drizzle-orm";

import { db } from "~/db";
import { categories, products, stores, subcategories } from "~/db/schema";
import { getProductsSchema } from "~/server/validations/product";

// See the unstable_cache API docs: https://nextjs.org/docs/app/api-reference/functions/unstable_cache
export async function getFeaturedProducts() {
  return await cache(
    async () => {
      return db
        .select({
          id: products.id,
          name: products.name,
          category: categories.name,
          images: products.images,
          inventory: products.inventory,
          price: products.price,
          stripeAccountId: stores.stripeAccountId,
        })
        .from(products)
        .limit(8)
        .leftJoin(stores, eq(products.storeId, stores.id))
        .leftJoin(categories, eq(products.categoryId, categories.id))
        .groupBy(products.id, stores.stripeAccountId, categories.name)
        .orderBy(
          desc(count(stores.stripeAccountId)),
          desc(count(products.images)),
          desc(products.createdAt),
        );
    },
    ["featured-products"],
    {
      revalidate: 3600, // every hour
      tags: ["featured-products"],
    },
  )();
}

// See the unstable_noStore API docs: https://nextjs.org/docs/app/api-reference/functions/unstable_noStore
export async function getProducts(input: SearchParams) {
  noStore();

  try {
    const search = getProductsSchema.parse(input);

    const limit = search.per_page;
    const offset = (search.page - 1) * limit;

    const [column, order] = (search.sort?.split(".") as [
      keyof Product | undefined,
      "asc" | "desc" | undefined,
    ]) ?? ["createdAt", "desc"];
    const [minPrice, maxPrice] = search.price_range?.split("-") ?? [];
    const categoryIds = search.categories?.split(".") ?? [];
    const subcategoryIds = search.subcategories?.split(".") ?? [];
    const storeIds = search.store_ids?.split(".") ?? [];

    const transaction = await db.transaction(async (tx) => {
      const data = await tx
        .select({
          id: products.id,
          name: products.name,
          category: categories.name,
          createdAt: products.createdAt,
          description: products.description,
          images: products.images,
          inventory: products.inventory,
          price: products.price,
          rating: products.rating,
          storeId: products.storeId,
          stripeAccountId: stores.stripeAccountId,
          subcategory: subcategories.name,
          updatedAt: products.updatedAt,
        })
        .from(products)
        .limit(limit)
        .offset(offset)
        .leftJoin(stores, eq(products.storeId, stores.id))
        .leftJoin(categories, eq(products.categoryId, categories.id))
        .leftJoin(subcategories, eq(products.subcategoryId, subcategories.id))
        .where(
          and(
            categoryIds.length > 0
              ? inArray(products.categoryId, categoryIds)
              : undefined,
            subcategoryIds.length > 0
              ? inArray(products.subcategoryId, subcategoryIds)
              : undefined,
            minPrice ? gte(products.price, minPrice) : undefined,
            maxPrice ? lte(products.price, maxPrice) : undefined,
            storeIds.length > 0
              ? inArray(products.storeId, storeIds)
              : undefined,
            input.active === "true"
              ? sql`(${stores.stripeAccountId}) is not null`
              : undefined,
          ),
        )
        .groupBy(products.id)
        .orderBy(
          column && column in products
            ? order === "asc"
              ? asc(products[column])
              : desc(products[column])
            : desc(products.createdAt),
        );

      const total = await tx
        .select({
          count: count(products.id),
        })
        .from(products)
        .where(
          and(
            categoryIds.length > 0
              ? inArray(products.categoryId, categoryIds)
              : undefined,
            subcategoryIds.length > 0
              ? inArray(products.subcategoryId, subcategoryIds)
              : undefined,
            minPrice ? gte(products.price, minPrice) : undefined,
            maxPrice ? lte(products.price, maxPrice) : undefined,
            storeIds.length > 0
              ? inArray(products.storeId, storeIds)
              : undefined,
          ),
        )
        .execute()
        .then((res) => res[0]?.count ?? 0);

      const pageCount = Math.ceil(total / limit);

      return {
        data,
        pageCount,
      };
    });

    return transaction;
  } catch (error) {
    return {
      data: [],
      pageCount: 0,
    };
  }
}

export async function getProductCountByCategory({
  categoryId,
}: {
  categoryId: string;
}) {
  return await cache(
    async () => {
      return db
        .select({
          count: count(products.id),
        })
        .from(products)
        .where(eq(products.categoryId, categoryId))
        .execute()
        .then((res) => res[0]?.count ?? 0);
    },
    [`product-count-${categoryId}`],
    {
      revalidate: 3600, // every hour
      tags: [`product-count-${categoryId}`],
    },
  )();
}

export async function getCategories() {
  return await cache(
    async () => {
      return db
        .selectDistinct({
          id: categories.id,
          name: categories.name,
          description: categories.description,
          image: categories.image,
          slug: categories.slug,
        })
        .from(categories)
        .orderBy(desc(categories.name));
    },
    ["categories"],
    {
      revalidate: 3600, // every hour
      tags: ["categories"],
    },
  )();
}

export async function getCategorySlugFromId({ id }: { id: string }) {
  return await cache(
    async () => {
      return db
        .select({
          slug: categories.slug,
        })
        .from(categories)
        .where(eq(categories.id, id))
        .execute()
        .then((res) => res[0]?.slug);
    },
    [`category-slug-${id}`],
    {
      revalidate: 3600, // every hour
      tags: [`category-slug-${id}`],
    },
  )();
}

export async function getSubcategories() {
  return await cache(
    async () => {
      return db
        .selectDistinct({
          id: subcategories.id,
          name: subcategories.name,
          description: subcategories.description,
          slug: subcategories.slug,
        })
        .from(subcategories);
    },
    ["subcategories"],
    {
      revalidate: 3600, // every hour
      tags: ["subcategories"],
    },
  )();
}

export async function getSubcategorySlugFromId({ id }: { id: string }) {
  return await cache(
    async () => {
      return db
        .select({
          slug: subcategories.slug,
        })
        .from(subcategories)
        .where(eq(subcategories.id, id))
        .execute()
        .then((res) => res[0]?.slug);
    },
    [`subcategory-slug-${id}`],
    {
      revalidate: 3600, // every hour
      tags: [`subcategory-slug-${id}`],
    },
  )();
}

export async function getSubcategoriesByCategory({
  categoryId,
}: {
  categoryId: string;
}) {
  return await cache(
    async () => {
      return db
        .selectDistinct({
          id: subcategories.id,
          name: subcategories.name,
          description: subcategories.description,
          slug: subcategories.slug,
        })
        .from(subcategories)
        .where(eq(subcategories.id, categoryId));
    },
    [`subcategories-${categoryId}`],
    {
      revalidate: 3600, // every hour
      tags: [`subcategories-${categoryId}`],
    },
  )();
}
