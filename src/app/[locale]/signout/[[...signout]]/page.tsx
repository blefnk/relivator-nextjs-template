import type { Metadata } from "next";

import { redirect } from "next/navigation";

import { LogOutButtons } from "~/components/logout-buttons";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "~/components/page-header";
import { Shell } from "~/components/shell";
import { env } from "~/env.js";
import { getCachedUser } from "~/server/queries/user";

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
  title: "Sign out",
  description: "Sign out of your account",
};

export default async function SignOutPage() {
  const user = await getCachedUser();

  if (!user) {
    redirect("/");
  }

  return (
    <Shell className="max-w-md">
      <PageHeader className="text-center">
        <PageHeaderHeading size="sm">Sign out</PageHeaderHeading>
        <PageHeaderDescription size="sm">
          Are you sure you want to sign out?
        </PageHeaderDescription>
      </PageHeader>
      <LogOutButtons />
    </Shell>
  );
}
