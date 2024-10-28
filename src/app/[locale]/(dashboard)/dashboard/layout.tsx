import { redirect } from "next/navigation";
import { getStoresByUserId } from "~/lib/queries/store";
import { getCachedUser, getUserPlanMetrics } from "~/lib/queries/user";

import { SidebarProvider } from "~/components/layouts/sidebar-provider";
import { DashboardHeader } from "./stores/[storeId]/_components/dashboard-header";
import { DashboardSidebar } from "./stores/[storeId]/_components/dashboard-sidebar";
import { DashboardSidebarSheet } from "./stores/[storeId]/_components/dashboard-sidebar-sheet";
import { StoreSwitcher } from "./stores/[storeId]/_components/store-switcher";
import consola from "consola";
import { User, usersTable } from "~/db/schema";
import { eq } from "drizzle-orm";
import { db } from "~/db";
import { getCurrentStoreId } from "./stores/[storeId]/_components/storeSwitcherActions";

interface DashboardLayoutProps {
  params?: {
    storeId?: string;
  };
  children: React.ReactNode;
}

export default async function DashboardLayout({
  params = {},
  children,
}: DashboardLayoutProps) {
  const user = await getCachedUser();
  if (!user) {
    redirect("/signin");
  }

  let storeId = params.storeId;

  try {
    await db.transaction(async (trx) => {
      const existingUser = await trx
        .select()
        .from(usersTable)
        .where(eq(usersTable.email, user.emailAddresses[0].emailAddress))
        .limit(1);

      let userRecord = existingUser[0];

      // If the user does not exist, create it
      if (!userRecord) {
        consola.info(
          `Creating user ${user.emailAddresses[0].emailAddress} in usersTable.`,
        );
        const newUser = {
          id: user.id,
          name: `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim(),
          age: 0,
          email: user.emailAddresses[0].emailAddress,
          currentStoreId: "",
        };

        await trx.insert(usersTable).values(newUser);
        userRecord = newUser;
      }

      storeId =
        storeId || (userRecord.currentStoreId ? userRecord.currentStoreId : "");

      if (!storeId) {
        const stores = await getStoresByUserId({ userId: user.id });
        storeId = stores[0]?.id;

        if (storeId) {
          await trx
            .update(usersTable)
            .set({ currentStoreId: storeId } as User)
            .where(eq(usersTable.id, userRecord.id));
        } else {
          return redirect("/onboarding");
        }
      }
    });

    const planMetricsPromise = getUserPlanMetrics({ userId: user.id });

    const currentStoreId = await getCurrentStoreId(user.id);

    return (
      <SidebarProvider>
        <div className="grid min-h-screen w-full lg:grid-cols-[17.5rem_1fr]">
          <DashboardSidebar
            storeId={storeId}
            className="top-0 z-30 hidden flex-col gap-4 border-r border-border/60 lg:sticky lg:block"
          >
            <StoreSwitcher
              userId={user.id}
              storesPromise={getStoresByUserId({ userId: user.id })}
              planMetricsPromise={planMetricsPromise}
              currentStoreId={currentStoreId}
            />
          </DashboardSidebar>
          <div className="flex flex-col">
            <DashboardHeader user={user} storeId={storeId}>
              <DashboardSidebarSheet className="lg:hidden">
                <DashboardSidebar storeId={storeId}>
                  <StoreSwitcher
                    userId={user.id}
                    storesPromise={getStoresByUserId({ userId: user.id })}
                    planMetricsPromise={planMetricsPromise}
                    currentStoreId={currentStoreId}
                  />
                </DashboardSidebar>
              </DashboardSidebarSheet>
            </DashboardHeader>
            <main className="flex-1 overflow-hidden px-6">{children}</main>
          </div>
        </div>
      </SidebarProvider>
    );
  } catch (error) {
    consola.error("❌ An error occurred:", error);
    redirect("/");
  }
}
