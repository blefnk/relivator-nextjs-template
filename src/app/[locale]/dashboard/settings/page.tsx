import { Suspense } from "react";

import type { Metadata } from "next";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/browser/reliverse/ui/CardUI";
import { getNotification } from "@/server/reliverse/queries/notification";
import {
  getCachedUserAuthJs,
  getCachedUserClerk,
} from "@/server/reliverse/queries/user";
import { z } from "zod";

import type { SearchParams } from "~/types";

import { authProvider } from "~/auth";
import { UpdateNotificationForm } from "~/components/Forms";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "~/components/Navigation/PageNavMenu";
import UpdateNotificationFormSkeleton from "~/components/Skeletons/Forms/UpdateNotificationFormSkeleton";
import { Shell } from "~/components/Wrappers/ShellVariants";

export const metadata: Metadata = {
  description: "Manage the website and account preferences.",
  title: "Settings",
};

type SettingsPageProps = {
  searchParams: SearchParams;
};

const schema = z.object({
  token: z.string().optional(),
});

export default async function SettingsPage({
  searchParams,
}: SettingsPageProps) {
  const { token } = schema.parse(searchParams);

  const user =
    authProvider === "clerk"
      ? await getCachedUserClerk()
      : await getCachedUserAuthJs();

  const notificationPromise = getNotification({
    email: user.email,
    token,
  });

  return (
    <Shell variant="sidebar">
      <PageHeader>
        <PageHeaderHeading size="sm">Settings</PageHeaderHeading>
        <PageHeaderDescription size="sm">
          Manage the website and account preferences.
        </PageHeaderDescription>
      </PageHeader>
      <Card>
        <CardHeader>
          <CardTitle>Email Preferences</CardTitle>
          <CardDescription>Manage your email preferences</CardDescription>
        </CardHeader>
        <CardContent>
          <Suspense fallback={<UpdateNotificationFormSkeleton />}>
            <UpdateNotificationForm notificationPromise={notificationPromise} />
          </Suspense>
        </CardContent>
      </Card>
    </Shell>
  );
}
