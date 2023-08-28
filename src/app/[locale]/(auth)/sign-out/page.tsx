import type { Metadata } from "next";

import { env } from "~/data/env";
import { fullURL } from "~/data/meta/builder";
import { LogOutButtons } from "~/islands/account/logout-buttons";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading
} from "~/islands/navigation/page-header";
import { Shell } from "~/islands/wrappers/shell";

export const metadata: Metadata = {
  metadataBase: fullURL(),
  title: "Sign out",
  description: "Sign out of your account"
};

export default function SignOutPage() {
  return (
    <Shell className="max-w-xs">
      <PageHeader
        id="sign-out-page-header"
        aria-labelledby="sign-out-page-header-heading"
        className="text-center"
      >
        <PageHeaderHeading size="sm">Sign out</PageHeaderHeading>
        <PageHeaderDescription size="sm">
          Are you sure you want to sign out?
        </PageHeaderDescription>
      </PageHeader>
      <LogOutButtons />
    </Shell>
  );
}
