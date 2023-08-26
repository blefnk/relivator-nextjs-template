import type { Metadata } from "next";

import { env } from "~/data/env";
import { fullURL } from "~/data/meta/builder";
import { UserProfile } from "~/islands/auth/user-profile";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading
} from "~/islands/page-header";
import { Shell } from "~/islands/shells/shell";

export const metadata: Metadata = {
  metadataBase: fullURL(),
  title: "Account",
  description: "Manage your account settings"
};

export default function AccountPage() {
  return (
    <Shell variant="sidebar">
      <PageHeader id="account-header" aria-labelledby="account-header-heading">
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
        <UserProfile />
      </section>
    </Shell>
  );
}
