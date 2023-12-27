import { type Metadata } from "next";
import { redirect } from "next/navigation";

import { fullURL } from "~/data/meta/builder";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "~/islands/navigation/page-header";
import { Shell } from "~/islands/wrappers/shell-variants";
import { getServerAuthSession } from "~/utils/auth/users";

export const metadata: Metadata = {
  metadataBase: fullURL(),
  title: "Subscription",
  description: "Manage your subscription",
};

// /dashboard/account/manage
// todo: add a link to the Stripe portal
export default async function ManageSubscriptionPage() {
  const session = await getServerAuthSession();
  if (!session) redirect("/auth");

  return (
    <Shell variant="sidebar">
      <PageHeader
        id="dashboard-manage-subscription-header"
        aria-labelledby="dashboard-manage-subscription-header-heading"
      >
        <PageHeaderHeading size="sm">
          Manage Your Subscription
        </PageHeaderHeading>
        <PageHeaderDescription size="sm">
          Manage your subscription
        </PageHeaderDescription>
      </PageHeader>
      <div>The page is still in production. Please check back here later.</div>
    </Shell>
  );
}
