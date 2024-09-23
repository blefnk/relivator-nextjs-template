import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

import { debugEnabled } from "~/../reliverse.config";
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
import { UserProfileClerk } from "~/core/auth/clerkjs/components/user-profile-clerk";
import { auth } from "~/server/queries/user";

// export const metadata = seo({
export const metadata: Metadata = {
  description: "Link the accounts",
  title: "Link Accounts",
};

export default async function ProfilesPage() {
  const t = await getTranslations();
  const user = await auth();

  if (!user) {
    return <UserNotFound />;
  }

  return (
    <Shell variant="sidebar">
      <PageHeader
        id="account-header"
        aria-labelledby="account-header-heading"
        separated
      >
        <PageHeaderHeading size="sm">{t("page.account")}</PageHeaderHeading>
        <PageHeaderDescription size="sm">
          Manage the account settings
        </PageHeaderDescription>
      </PageHeader>
      {authProvider === "clerk" && (
        <section
          id="user-account-info"
          className="w-full overflow-hidden"
          aria-labelledby="user-account-info-heading"
        >
          <UserProfileClerk />
        </section>
      )}
      {authProvider === "authjs" && (
        <h2 className="rounded-lg border p-4">
          This page is under construction.
          <br />
          Please{" "}
          <Link className="underline" href="/dashboard/stores">
            visit Stores Page
          </Link>{" "}
          for now.
        </h2>
      )}
      {debugEnabled && (
        <>
          <h2 className="-mb-6 font-bold">
            [localhost-debug-mode-user-object]
          </h2>
          <pre>
            <code>{JSON.stringify(user, null, 2)}</code>
          </pre>
        </>
      )}
    </Shell>
  );
}
