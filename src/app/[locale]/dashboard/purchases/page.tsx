import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { getTranslations } from "next-intl/server";

import { authjs } from "~/auth/authjs";
import { clerk } from "~/auth/clerk";
import { authProvider } from "~/auth/provider";
import { UserNotFound } from "~/components/Account/Guest/UserNotFound";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "~/components/Navigation/PageNavMenu";
import { Shell } from "~/components/Wrappers/ShellVariants";
import { auth } from "~/server/queries/user";

export const metadata: Metadata = {
  description: "Manage the purchases",
  title: "Purchases",
};

export default async function PurchasesPage() {
  const t = await getTranslations();

  const session = await auth();

  if (!session) {
    return <UserNotFound />;
  }

  return (
    <Shell variant="sidebar">
      <PageHeader
        id="dashboard-purchases-header"
        aria-labelledby="dashboard-purchases-header-heading"
      >
        <PageHeaderHeading size="sm">{t("page.purchases")}</PageHeaderHeading>
        <PageHeaderDescription size="sm">
          Manage the purchases
        </PageHeaderDescription>
      </PageHeader>
      <div>{t("page.purchasesTable")}</div>
    </Shell>
  );
}
