import type { Metadata } from "next";

import { LogOutButtons } from "~/islands/auth/logout-buttons";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading
} from "~/islands/page-header";
import { Shell } from "~/islands/shells/shell";
import { env } from "~/env.mjs";

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
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
