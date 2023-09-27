import { type Metadata } from "next";
import { redirect } from "next/navigation";
import { RocketIcon } from "@radix-ui/react-icons";
import { desc, eq, sql } from "drizzle-orm";
import { getServerSession } from "next-auth";
import Link from "next-intl/link";

import { authOptions } from "~/server/auth";
import {
  getDashboardRedirectPath,
  getPlanFeatures,
  getUserSubscriptionPlan,
} from "~/server/subs";
import { cn } from "~/server/utils";
import { db } from "~/data/db/client";
import { products, stores } from "~/data/db/schema";
import { fullURL } from "~/data/meta/builder";
import { findUserById, getUserAccounts } from "~/data/routers/handlers/users";
import { StoreCard } from "~/islands/modules/cards/store-card";
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

export const metadata: Metadata = {
  metadataBase: fullURL(),
  title: "Stores",
  description: "Manage stores owned by you",
};

export default async function StoresPage() {
  const session = await getServerSession(authOptions());

  /**
   * todo: we can try to use here, and in ths similar app moments, the following library:
   * @see https://francoisbest.com/posts/2023/storing-react-state-in-the-url-with-nextjs
   * todo: so, we can have something like `/sign-in?from=/dashboard/stores`
   * todo: and then use `from` param to tell user eg "login to see stores"
   */
  if (!session?.userId) {
    redirect("/sign-in");
  }

  const user = await findUserById(session.userId);

  // if (session?.userId) {
  // const user = await findUserById(session?.userId);
  // const accounts = await getUserAccounts(session.userId);

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
    .orderBy(desc(stores.stripeAccountId), desc(sql<number>`count(*)`));
  // .where(eq(stores.userId, session.user?.name));
  // .where(eq(stores.userId, user.id));
  // }

  // const subscriptionPlan = await getUserSubscriptionPlan(user.id);

  // const { maxStoreCount, maxProductCount } = getPlanFeatures(
  //   subscriptionPlan?.id,
  // );

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
              // subscriptionPlan: subscriptionPlan,
            })}
            // href="/"
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
          You are currently on the{" "}
          <span className="font-semibold">{user?.subscriptionPlan}</span> plan.
          You can create up to{" "}
          <span className="font-semibold">{/* {maxStoreCount} */}...</span>{" "}
          stores and{" "}
          <span className="font-semibold">{/* {maxProductCount} */}...</span>{" "}
          products on this plan.
        </AlertDescription>
      </Alert>
      <section
        id="dashboard-stores-page-stores"
        aria-labelledby="dashboard-stores-page-stores-heading"
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        <>
          {allStores.map((store) => (
            <StoreCard
              key={store.id}
              store={store}
              href={`/dashboard/stores/${store.id}`}
            />
          ))}
        </>
      </section>
    </Shell>
  );
}
