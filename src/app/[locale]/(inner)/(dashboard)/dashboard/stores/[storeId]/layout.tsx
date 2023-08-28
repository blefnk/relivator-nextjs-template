import { notFound, redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs";
import { eq } from "drizzle-orm";

import {
  getDashboardRedirectPath,
  getUserSubscriptionPlan
} from "~/server/subs";
import { db } from "~/data/db/client";
import { stores } from "~/data/db/schema";
import { PageHeaderHeading } from "~/islands/navigation/page-header";
import { StoreSwitcher } from "~/islands/navigation/pagination/store-switcher";
import { StoreTabs } from "~/islands/navigation/pagination/store-tabs";
import { Shell } from "~/islands/wrappers/shell";

interface StoreLayoutProps {
  children: React.ReactNode;
  params: {
    storeId: string;
  };
}

export default async function StoreLayout({
  children,
  params
}: StoreLayoutProps) {
  const storeId = Number(params.storeId);

  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  const allStores = await db
    .select({
      id: stores.id,
      name: stores.name
    })
    .from(stores)
    .where(eq(stores.userId, user.id));

  const store = allStores.find((store) => store.id === storeId);

  if (!store) {
    notFound();
  }

  const subscriptionPlan = await getUserSubscriptionPlan(user.id);

  return (
    <Shell variant="sidebar" className="gap-4">
      <div className="flex items-center space-x-4 pr-1">
        <PageHeaderHeading className="line-clamp-1 flex-1" size="sm">
          {store.name}
        </PageHeaderHeading>
        {allStores.length > 1 ? (
          <StoreSwitcher
            currentStore={store}
            stores={allStores}
            dashboardRedirectPath={getDashboardRedirectPath({
              subscriptionPlan,
              storeCount: allStores.length
            })}
          />
        ) : null}
      </div>
      <div className="space-y-4 overflow-hidden">
        <StoreTabs storeId={storeId} />
        {children}
      </div>
    </Shell>
  );
}
