import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { RocketIcon } from "@radix-ui/react-icons";
import { cn } from "~/utils";
import { desc, eq, sql } from "drizzle-orm";

import { getSubscriptionPlanAction } from "~/core/stripe/actions";
import { db } from "~/data/db";
import { products, stores, users } from "~/data/db/schema";
import { env } from "~/env.mjs";
import { StoreCard } from "~/islands/modules/cards/store-card-dashboard";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "~/islands/navigation/page-header";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "~/islands/primitives/alert";
import { buttonVariants } from "~/islands/primitives/button";
import { Shell } from "~/islands/wrappers/shell-variants";
import { getDashboardRedirectPath, getPlanFeatures } from "~/server/subs";
import { getServerAuthSession, getUserData } from "~/utils/auth/users";

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"),
  title: "Stores",
  description: "Manage your stores",
};

export default async function StoresPage() {
  const user = await getServerAuthSession();
  if (!user) redirect("/auth");

  const allStores = await db
    .select({
      id: stores.id,
      name: stores.name,
      description: stores.description,
      stripeAccountId: stores.stripeAccountId,
    })
    .from(stores)
    .leftJoin(products, eq(products.storeId, stores.id))
    .groupBy(stores.id)
    .orderBy(desc(stores.stripeAccountId), desc(sql<number>`count(*)`))
    .where(eq(stores.userId, user.id));

  const subscriptionPlan = await getSubscriptionPlanAction(user.id);

  const { maxStoreCount, maxProductCount } = getPlanFeatures(
    subscriptionPlan?.id,
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
              subscriptionPlan,
            })}
            className={cn(
              buttonVariants({
                size: "sm",
              }),
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
          Your current plan is{" "}
          <span className="font-semibold">
            {subscriptionPlan?.name ?? "Starter"}
          </span>
          . It allows you to create{" "}
          <span className="font-semibold">up to {maxStoreCount} stores</span>{" "}
          and include{" "}
          <span className="font-semibold">
            up to {maxProductCount} products
          </span>{" "}
          per store.
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
