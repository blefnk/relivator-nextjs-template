import type { ReactNode } from "react";

import { redirect } from "next/navigation";

import { ScrollArea } from "@/components/ui/scroll-area";
import { config } from "@reliverse/core";
import consola from "consola";

import { authProvider } from "~/auth/provider";
import { SidebarNav } from "~/components/Navigation/SidebarNav";
import { GeneralShell } from "~/components/Wrappers/GeneralShell";
import { env } from "~/env";

// import { SidebarNav } from "~/components/Navigation/SidebarNav";
// import { dashboardConfig } from "~/constants/nav-items";

export default function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  if (
    authProvider === "clerk" &&
    env.CLERK_SECRET_KEY &&
    env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
  ) {
    return <DashboardLayoutContent>{children}</DashboardLayoutContent>;
  }

  if (authProvider === "authjs" && env.AUTH_SECRET) {
    return <DashboardLayoutContent>{children}</DashboardLayoutContent>;
  }

  consola.error(
    `Fill auth config, use .env.example file provided by ${config.framework.name} v${config.framework.version}`,
  );

  return redirect("/");
}

function DashboardLayoutContent({
  children,
}: {
  children: ReactNode;
}) {
  // await revalidateUser();
  // const session = await authjs();
  // consola.info("session:", session?.user.id);
  return (
    <GeneralShell>
      <div className="flex min-h-screen flex-col">
        <div
          className={`
            container flex-1 items-start

            lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10

            md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6
          `}
        >
          <aside
            className={`
              fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full
              shrink-0 overflow-y-auto border-r

              md:sticky md:block
            `}
          >
            <ScrollArea
              className={`
                py-6 pr-6

                lg:py-8
              `}
            >
              <SidebarNav />
            </ScrollArea>
          </aside>
          <main className="flex w-full flex-col overflow-hidden">
            {children}
          </main>
        </div>
      </div>
    </GeneralShell>
  );
}
