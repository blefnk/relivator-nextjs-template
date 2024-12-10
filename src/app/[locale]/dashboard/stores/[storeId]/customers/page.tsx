import type { Metadata } from "next";

import { and, asc, desc, eq, gte, like, lte, sql } from "drizzle-orm";
import { notFound } from "next/navigation";
import * as React from "react";

import type { SearchParams } from "~/types";

import { AlertCard } from "~/components/alert-card";
import { DataTableSkeleton } from "~/components/data-table/data-table-skeleton";
import { DateRangePicker } from "~/components/date-range-picker";
import { CustomersTable } from "~/components/tables/customers-table";
import { env } from "~/env.js";
import { db } from "~/server/db";
import { orders, stores } from "~/server/db/schema";
import { customersSearchParamsSchema } from "~/server/validations/params";

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
  title: "Customers",
  description: "Customers for your store",
};

type CustomersPageProps = {
  params: Promise<{
    storeId: string;
  }>;
  searchParams: Promise<SearchParams>;
};

export default async function CustomersPage({
  params,
  searchParams,
}: CustomersPageProps) {
  const { storeId } = await params;
  const resolvedSearchParams = await searchParams;
  const decodedStoreId = decodeURIComponent(storeId);

  const { page, per_page, sort, email, from, to } =
    customersSearchParamsSchema.parse(resolvedSearchParams);

  const store = await db.query.stores.findFirst({
    where: eq(stores.id, decodedStoreId),
    columns: {
      id: true,
      name: true,
      description: true,
    },
  });

  if (!store) {
    notFound();
  }

  const fallbackPage = isNaN(page) || page < 1 ? 1 : page;
  const limit = isNaN(per_page) ? 10 : per_page;
  const offset = fallbackPage > 0 ? (fallbackPage - 1) * limit : 0;
  const fromDay = from ? new Date(from) : undefined;
  const toDay = to ? new Date(to) : undefined;

  const ordersPromise = db.transaction(async (tx) => {
    const data = await tx
      .select({
        name: orders.name,
        email: orders.email,
        orderPlaced: sql<number>`count(*)`,
        totalSpent: sql<number>`sum(${orders.amount})`,
        createdAt: sql<string>`min(${orders.createdAt})`,
      })
      .from(orders)
      .limit(limit)
      .offset(offset)
      .where(
        and(
          eq(orders.storeId, decodedStoreId),
          email ? like(orders.email, `%${email}%`) : undefined,
          fromDay && toDay
            ? and(gte(orders.createdAt, fromDay), lte(orders.createdAt, toDay))
            : undefined,
        ),
      )
      .groupBy(orders.email, orders.name)
      .orderBy(
        sort === "name.asc"
          ? asc(orders.name)
          : sort === "name.desc"
            ? desc(orders.name)
            : sort === "email.asc"
              ? asc(orders.email)
              : sort === "email.desc"
                ? desc(orders.email)
                : sort === "totalSpent.asc"
                  ? asc(sql<number>`sum(${orders.amount})`)
                  : sort === "totalSpent.desc"
                    ? desc(sql<number>`sum(${orders.amount})`)
                    : sort === "orderPlaced.asc"
                      ? asc(sql<number>`count(*)`)
                      : sort === "orderPlaced.desc"
                        ? desc(sql<number>`count(*)`)
                        : sort === "createdAt.asc"
                          ? asc(sql<string>`min(${orders.createdAt})`)
                          : desc(sql<string>`min(${orders.createdAt})`),
      );

    const altCount = await tx
      .select({
        count: sql<number>`count(*)`,
      })
      .from(orders)
      .where(eq(orders.storeId, decodedStoreId))
      .then((res) => res[0]?.count ?? 0);

    const count = await tx
      .select({
        count: sql<number>`count(*)`,
      })
      .from(orders)
      .where(
        and(
          eq(orders.storeId, decodedStoreId),
          email ? like(orders.email, `%${email}%`) : undefined,
          fromDay && toDay
            ? and(gte(orders.createdAt, fromDay), lte(orders.createdAt, toDay))
            : undefined,
        ),
      )
      .groupBy(orders.email, orders.name)
      .then((res) => res[0]?.count ?? 0);

    return {
      data,
      pageCount: Math.ceil((altCount - count) / limit),
    };
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 xs:flex-row xs:items-center xs:justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Customers</h2>
        <DateRangePicker align="end" />
      </div>
      <React.Suspense
        fallback={
          <DataTableSkeleton columnCount={5} filterableColumnCount={0} />
        }
      >
        <CustomersTable promise={ordersPromise} storeId={store.id} />
      </React.Suspense>
      <AlertCard />
    </div>
  );
}
