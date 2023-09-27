import Link from "next/link";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { getProviders } from "next-auth/react";

import { authOptions } from "~/server/auth";
import { seo } from "~/data/meta";
import { fullURL } from "~/data/meta/builder";
import { findUserById, getUserAccounts } from "~/data/routers/handlers/users";
import AuthPageContent from "~/islands/content/auth-pages-content";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "~/islands/navigation/page-header";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/islands/primitives/card";
import { Shell } from "~/islands/wrappers/shell-variants";

export const metadata = seo({
  metadataBase: fullURL(),
  title: "Settings",
  description: "Manage your website and account preferences.",
});

export default async function ProfilesPage() {
  const session = await getServerSession(authOptions());
  const providers = await getProviders();
  if (!providers) return null;
  if (session?.userId) {
    const user = await findUserById(session.userId);
    const accounts = await getUserAccounts(session.userId);
    return (
      <Shell variant="sidebar">
        <PageHeader
          id="account-header"
          aria-labelledby="account-header-heading"
        >
          <PageHeaderHeading size="sm">Settings</PageHeaderHeading>
          <PageHeaderDescription size="sm">
            Manage your website and account preferences.
          </PageHeaderDescription>
        </PageHeader>

        <Card
          id="email-settings-info"
          aria-labelledby="email-settings-info-heading"
          className="w-full overflow-hidden"
        >
          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl">Email Settings</CardTitle>
              <CardDescription>
                Change your preferred email address.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/dashboard/settings/email">Open Email Settings</Link>
            </CardContent>
          </Card>
        </Card>

        <Card
          id="link-accounts-info"
          aria-labelledby="link-accounts-info-heading"
          className="w-full overflow-hidden"
        >
          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl">Your Accounts</CardTitle>
              <CardDescription>
                Link your other social media accounts.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/dashboard/account">Open Accounts Linking</Link>
            </CardContent>
          </Card>
        </Card>
      </Shell>
    );
  }
  // redirect if not logged in
  return redirect("/sign-in");
}
