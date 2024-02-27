import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

import { UserProfileClerk } from "~/core/auth/clerkjs/islands/user-profile-clerk";
// import { seo } from "~/data/meta";
import { fullURL } from "~/data/meta/builder";
import { env } from "~/env.mjs";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "~/islands/navigation/page-header";
import { Shell } from "~/islands/wrappers/shell-variants";
import { getServerAuthSession } from "~/utils/auth/users";

// export const metadata = seo({
export const metadata: Metadata = {
  metadataBase: fullURL(),
  title: "Link Accounts",
  description: "Link your accounts",
};

export default async function ProfilesPage() {
  const debug = process.env.NODE_ENV === "development";
  const user = await getServerAuthSession();
  if (!user) redirect("/auth");

  return (
    <Shell variant="sidebar">
      <PageHeader
        id="account-header"
        aria-labelledby="account-header-heading"
        separated
      >
        <PageHeaderHeading size="sm">Account</PageHeaderHeading>
        <PageHeaderDescription size="sm">
          Manage your account settings
        </PageHeaderDescription>
      </PageHeader>

      {env.NEXT_PUBLIC_AUTH_PROVIDER === "clerk" && (
        <>
          <section
            id="user-account-info"
            aria-labelledby="user-account-info-heading"
            className="w-full overflow-hidden"
          >
            <UserProfileClerk />
          </section>
        </>
      )}

      {env.NEXT_PUBLIC_AUTH_PROVIDER === "authjs" && (
        <>
          <h2 className="rounded-lg border p-4">
            This page is under construction.
            <br />
            Please{" "}
            <Link href="/dashboard/stores" className="underline">
              visit Stores Page
            </Link>{" "}
            for now.
          </h2>
        </>
      )}

      {debug && (
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
