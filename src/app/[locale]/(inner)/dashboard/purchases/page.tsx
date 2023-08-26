import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs";

import { env } from "~/data/env";
import { fullURL } from "~/data/meta/builder";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading
} from "~/islands/page-header";
import { Shell } from "~/islands/shells/shell";

export const metadata: Metadata = {
  metadataBase: fullURL(),
  title: "Purchases",
  description: "Manage your purchases"
};

export default async function PurchasesPage() {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  return (
    <Shell variant="sidebar">
      <PageHeader
        id="dashboard-purchases-header"
        aria-labelledby="dashboard-purchases-header-heading"
      >
        <PageHeaderHeading size="sm">Purchases</PageHeaderHeading>
        <PageHeaderDescription size="sm">
          Manage your purchases
        </PageHeaderDescription>
      </PageHeader>
      <div>Purchases Table</div>
    </Shell>
  );
}
