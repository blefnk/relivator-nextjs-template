import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { getTranslations } from "next-intl/server";

import { authjs } from "~/auth/authjs";
import { clerk } from "~/auth/clerk";
import { authProvider } from "~/auth/provider";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "~/components/Navigation/PageNavMenu";
import { Shell } from "~/components/Wrappers/ShellVariants";

export const metadata: Metadata = {
  description: "Manage the purchases",
  title: "Purchases",
};

export default async function PurchasesPage() {
  const t = await getTranslations();

  const session = authProvider === "clerk" ? await clerk() : await authjs();

  if (!session) {
    redirect("/auth");
  }

  return (
    <Shell variant="sidebar">
      <PageHeader
        aria-labelledby="dashboard-purchases-header-heading"
        id="dashboard-purchases-header"
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
