import { type Metadata } from "next";
import { redirect } from "next/navigation";

import { fullURL } from "~/data/meta/builder";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "~/islands/navigation/page-header";
import { Shell } from "~/islands/wrappers/shell-variants";
import { getServerAuthSession } from "~/utils/users";

export const metadata: Metadata = {
  metadataBase: fullURL(),
  title: "Purchases",
  description: "Manage your purchases",
};

export default async function PurchasesPage() {
  const session = await getServerAuthSession();
  if (!session) redirect("/auth");

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
