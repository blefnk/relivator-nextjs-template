import type { ReactNode } from "react";

import { notFound, redirect } from "next/navigation";

import { getDashboardRedirectPath } from "@/server/reliverse/plan";
import { eq } from "drizzle-orm";

import { authjs } from "~/auth/authjs";
import { clerk } from "~/auth/clerk";
import { authProvider } from "~/auth/provider";
import { PageHeaderHeading } from "~/components/Navigation/PageNavMenu";
import { StoreSwitcher } from "~/components/Navigation/Pagination/StoreSwitcher";
import { StoreTabs } from "~/components/Navigation/Pagination/StoreTabs";
import { Shell } from "~/components/Wrappers/ShellVariants";
import { db } from "~/db";
import { stores } from "~/db/schema/provider";

type StoreLayoutProps = {
  params: {
    storeId: string;
  };
  children: ReactNode;
};

export default async function StoreLayout({
  children,
  params,
}: StoreLayoutProps) {
  const { storeId } = params;

  const user = authProvider === "clerk" ? await clerk() : await authjs();

  if (!user) {
    return redirect("/auth");
  }

  const allStores = await db
    .select({
      id: stores.id,
      name: stores.name,
    })
    .from(stores)
    .where(eq(stores.userId, user.id));

  const store = allStores.find((store) => store.id === storeId);

  if (!store) {
    notFound();
  }

  // const subscriptionPlan = await getUserSubscriptionPlan(user.id || "");
  // const subscriptionPlan = await getUserSubscriptionPlan();
  return (
    <Shell className="gap-4" variant="sidebar">
      <div className="flex items-center space-x-4 pr-1">
        <PageHeaderHeading className="line-clamp-1 flex-1" size="sm">
          {store.name}
        </PageHeaderHeading>
        {allStores.length > 1 ? (
          <StoreSwitcher
            currentStore={store}
            dashboardRedirectPath={getDashboardRedirectPath({
              // subscriptionPlan,
              storeCount: allStores.length,
            })}
            stores={allStores}
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
