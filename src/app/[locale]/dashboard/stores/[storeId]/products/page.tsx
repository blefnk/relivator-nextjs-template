import { and, asc, desc, eq, gte, inArray, like, lte, sql } from "drizzle-orm";
import { type Metadata } from "next";
import { unstable_noStore as noStore } from "next/cache";
import { notFound } from "next/navigation";
import * as React from "react";

import type { SearchParams } from "~/types";

import { AlertCard } from "~/components/alert-card";
import { DataTableSkeleton } from "~/components/data-table/data-table-skeleton";
import { DateRangePicker } from "~/components/date-range-picker";
import { ProductsTable } from "~/components/tables/products-table";
import { env } from "~/env.js";
import { db } from "~/server/db";
import { categories, products, stores, type Product } from "~/server/db/schema";
import { storesProductsSearchParamsSchema } from "~/server/validations/params";

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
  title: "Products",
  description: "Manage your products",
};

type ProductsPageProps = {
  params: Promise<{
    storeId: string;
  }>;
  searchParams: Promise<SearchParams>;
};

export default async function ProductsPage({
  params,
  searchParams,
}: ProductsPageProps) {
  // Await params and searchParams
  const { storeId } = await params;
  const resolvedSearchParams = await searchParams;
  const decodedStoreId = decodeURIComponent(storeId);

  // Parse search params using zod schema
  const { page, per_page, sort, name, category, from, to } =
    storesProductsSearchParamsSchema.parse(resolvedSearchParams);

  const store = await db.query.stores.findFirst({
    where: eq(stores.id, decodedStoreId),
    columns: {
      id: true,
      name: true,
    },
  });

  if (!store) {
    notFound();
  }

  // Fallback page for invalid page numbers
  const fallbackPage = isNaN(page) || page < 1 ? 1 : page;
  const limit = isNaN(per_page) ? 10 : per_page;
  const offset = fallbackPage > 0 ? (fallbackPage - 1) * limit : 0;
  const [column, order] = (sort.split(".") as [
    keyof Product | undefined,
    "asc" | "desc" | undefined,
  ]) ?? ["createdAt", "desc"];

  const categoryIds = category?.split(".") ?? [];
  const fromDay = from ? new Date(from) : undefined;
  const toDay = to ? new Date(to) : undefined;

  // Transaction is used to ensure both queries are executed in a single transaction
  const productsPromise = db.transaction(async (tx) => {
    noStore();
    try {
      const data = await tx
        .select({
          id: products.id,
          name: products.name,
          category: categories.name,
          price: products.price,
          inventory: products.inventory,
          rating: products.rating,
          createdAt: products.createdAt,
        })
        .from(products)
        .limit(limit)
        .offset(offset)
        .leftJoin(categories, eq(products.categoryId, categories.id))
        .where(
          and(
            eq(products.storeId, decodedStoreId),
            name ? like(products.name, `%${name}%`) : undefined,
            categoryIds.length > 0
              ? inArray(products.categoryId, categoryIds)
              : undefined,
            fromDay && toDay
              ? and(
                  gte(products.createdAt, fromDay),
                  lte(products.createdAt, toDay),
                )
              : undefined,
          ),
        )
        .orderBy(
          column && column in products
            ? order === "asc"
              ? asc(products[column])
              : desc(products[column])
            : desc(products.createdAt),
        );

      const count = await tx
        .select({
          count: sql<number>`count(${products.id})`,
        })
        .from(products)
        .where(
          and(
            eq(products.storeId, decodedStoreId),
            name ? like(products.name, `%${name}%`) : undefined,
            categoryIds.length > 0
              ? inArray(products.categoryId, categoryIds)
              : undefined,
            fromDay && toDay
              ? and(
                  gte(products.createdAt, fromDay),
                  lte(products.createdAt, toDay),
                )
              : undefined,
          ),
        )
        .then((res) => res[0]?.count ?? 0);

      const pageCount = Math.ceil(count / limit);

      return {
        data,
        pageCount,
      };
    } catch (err) {
      console.error(err);
      return {
        data: [],
        pageCount: 0,
      };
    }
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 xs:flex-row xs:items-center xs:justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Products</h2>
        <DateRangePicker align="end" />
      </div>
      {/* <React.Suspense fallback={<DataTableSkeleton columnCount={6} />}>
        <ProductsTable promise={productsPromise} storeId={decodedStoreId} />
      </React.Suspense> */}
      <AlertCard />
    </div>
  );
}
