import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs";
import { RocketIcon } from "@radix-ui/react-icons";
import { desc, eq, sql } from "drizzle-orm";

import {
  getDashboardRedirectPath,
  getPlanFeatures,
  getUserSubscriptionPlan
} from "~/server/subs";
import { cn } from "~/server/utils";
import { db } from "~/data/db/client";
import { products, stores } from "~/data/db/schema";
import { env } from "~/data/env";
import { fullURL } from "~/data/meta/builder";
import { StoreCard } from "~/islands/modules/cards/store-card";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading
} from "~/islands/navigation/page-header";
import {
  Alert,
  AlertDescription,
  AlertTitle
} from "~/islands/primitives/alert";
import { buttonVariants } from "~/islands/primitives/button";
import { Shell } from "~/islands/wrappers/shell";

export const metadata: Metadata = {
  metadataBase: fullURL(),
  title: "Stores",
  description: "Manage your stores"
};

export default async function StoresPage() {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  const allStores = await db
    .select({
      id: stores.id,
      name: stores.name,
      description: stores.description,
      stripeAccountId: stores.stripeAccountId
    })
    .from(stores)
    .leftJoin(products, eq(products.storeId, stores.id))
    .groupBy(stores.id)
    .orderBy(desc(stores.stripeAccountId), desc(sql<number>`count(*)`))
    .where(eq(stores.userId, user.id));

  const subscriptionPlan = await getUserSubscriptionPlan(user.id);

  const { maxStoreCount, maxProductCount } = getPlanFeatures(
    subscriptionPlan?.id
  );

  return (
    <Shell variant="sidebar">
      <PageHeader
        id="dashboard-stores-page-header"
        aria-labelledby="dashboard-stores-page-header-heading"
      >
        <div className="flex space-x-4">
          <PageHeaderHeading size="sm" className="flex-1">
            Stores
          </PageHeaderHeading>
          <Link
            aria-label="Create store"
            href={getDashboardRedirectPath({
              storeCount: allStores.length,
              subscriptionPlan: subscriptionPlan
            })}
            className={cn(
              buttonVariants({
                size: "sm"
              })
            )}
          >
            Create store
          </Link>
        </div>
        <PageHeaderDescription size="sm">
          Manage your stores
        </PageHeaderDescription>
      </PageHeader>
      <Alert
        id="dashboard-stores-page-alert"
        aria-labelledby="dashboard-stores-page-alert-heading"
      >
        <RocketIcon className="h-4 w-4" aria-hidden="true" />
        <AlertTitle>Heads up!</AlertTitle>
        <AlertDescription>
          You are currently on the{" "}
          <span className="font-semibold">{subscriptionPlan?.name}</span> plan.
          You can create up to{" "}
          <span className="font-semibold">{maxStoreCount}</span> stores and{" "}
          <span className="font-semibold">{maxProductCount}</span> products on
          this plan.
        </AlertDescription>
      </Alert>
      <section
        id="dashboard-stores-page-stores"
        aria-labelledby="dashboard-stores-page-stores-heading"
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        {allStores.map((store) => (
          <StoreCard
            key={store.id}
            store={store}
            href={`/dashboard/stores/${store.id}`}
          />
        ))}
      </section>
    </Shell>
  );
}
