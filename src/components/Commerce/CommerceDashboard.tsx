import type { ReactNode } from "react";

import type { Session } from "next-auth";

import { useTranslations } from "next-intl";

type RootLayoutProps = {
  children: ReactNode;
  user: Session["user"];
};

export default function DashboardLayout({ children, user }: RootLayoutProps) {
  const t = useTranslations();

  return (
    <main
      className={`
        container mx-auto flex min-h-screen flex-col gap-8 bg-gray-900 p-4
      `}
    >
      <div
        className={`
          flex h-fit flex-col items-center

          md:flex-row md:justify-between
        `}
      >
        <h1 className="text-4xl font-bold">
          {t("CommerceDashboard.dashboard")}
        </h1>
        <div
          className={`
            hidden h-fit items-center gap-2

            sm:flex
          `}
        >
          <div className="flex flex-col text-right">
            {/* @ts-expect-error TODO: fix */}
            <p className="text-sm">{user.name}</p>
            {/* @ts-expect-error TODO: fix */}
            <p className="text-xs">{user.email}</p>
          </div>
        </div>
      </div>
      <div>{children}</div>
    </main>
  );
}
