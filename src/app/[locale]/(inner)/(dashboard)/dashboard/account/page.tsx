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
import { Shell } from "~/islands/wrappers/shell-variants";

export const metadata = seo({
  metadataBase: fullURL(),
  title: "Link Accounts",
  description: "Link your accounts",
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
          <PageHeaderHeading size="sm">Account</PageHeaderHeading>
          <PageHeaderDescription size="sm">
            Manage your account settings
          </PageHeaderDescription>
        </PageHeader>
        <section
          id="user-account-info"
          aria-labelledby="user-account-info-heading"
          className="w-full overflow-hidden"
        >
          <AuthPageContent
            accounts={accounts}
            isRegPage={false}
            providers={providers}
            user={user}
          />
        </section>
      </Shell>
    );
  }
  // redirect if not logged in
  return redirect("/sign-in");
}
