import type { Metadata } from "next";

import { UserNotFound } from "~/components/Account/Guest/UserNotFound";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "~/components/Navigation/PageNavMenu";
import { Separator } from "~/components/ui/separator";
import { Shell } from "~/components/Wrappers/ShellVariants";
import { getPlan } from "~/server/actions/deprecated/stripe/getPlan";
import { auth } from "~/server/queries/user";

export const metadata: Metadata = {
  description: "Manage your billings and subscription",
  title: "Billing",
};

export default async function BillingPage() {
  const user = await auth();

  if (!user) {
    return <UserNotFound />;
  }

  console.log("user", user);

  const userPlanInfo = await getPlan({ userId: user.id });

  return (
    <Shell variant="sidebar">
      <PageHeader
        id="billing-header"
        aria-labelledby="billing-header-heading"
        separated
      >
        <PageHeaderHeading size="sm">Billing</PageHeaderHeading>
        <PageHeaderDescription size="sm">
          Manage your billings and subscription
        </PageHeaderDescription>
      </PageHeader>

      <footer className="mt-40">
        <Separator />
        <pre className="text-sm opacity-30">
          <h3 className="">userPlanInfo:</h3>
          <code>{JSON.stringify(userPlanInfo, null, 2)}</code>
          <code className="mt-2">{JSON.stringify(user, null, 2)}</code>
        </pre>
      </footer>
    </Shell>
  );
}
