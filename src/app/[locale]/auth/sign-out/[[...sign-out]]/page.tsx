import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { authjs } from "~/auth/authjs";
import { LogOutButtons } from "~/components/Account/LogoutButtons";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "~/components/Navigation/PageNavMenu";
import { Shell } from "~/components/Wrappers/ShellVariants";

export const metadata: Metadata = {
  description: "Sign out of the account",
  title: "Sign out",
};

export default async function SignOutPage() {
  const session = await authjs();

  if (!session) {
    return redirect("/");
  }

  return (
    <Shell className="max-w-xs">
      <PageHeader
        aria-labelledby="sign-out-page-header-heading"
        className="text-center"
        id="sign-out-page-header"
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
