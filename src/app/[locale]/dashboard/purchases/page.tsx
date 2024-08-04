import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { authProvider } from "~/auth";
import { authjs } from "~/auth/authjs";
import { clerk } from "~/auth/clerk";
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
        <PageHeaderHeading size="sm">Purchases</PageHeaderHeading>
        <PageHeaderDescription size="sm">
          Manage the purchases
        </PageHeaderDescription>
      </PageHeader>
      <div>Purchases Table</div>
    </Shell>
  );
}
