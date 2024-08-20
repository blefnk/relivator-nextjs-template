// import { Suspense } from "react";

import type { Metadata } from "next";

// import type { SearchParams } from "@/types/reliverse/meta";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
// import { getNotification } from "@/server/reliverse/notification";
// import {
//   getCachedUserAuthJs,
//   getCachedUserClerk,
// } from "@/server/reliverse/user";
import { getTranslations } from "next-intl/server";
// import { z } from "zod";

// import { authProvider } from "~/auth/provider";
// import { UpdateNotificationForm } from "~/components/Forms/UpdateNotificationForm";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "~/components/Navigation/PageNavMenu";
// import UpdateNotificationFormSkeleton from "~/components/Skeletons/Forms/UpdateNotificationFormSkeleton";
import { Shell } from "~/components/Wrappers/ShellVariants";

export const metadata: Metadata = {
  description: "Manage the website and account preferences.",
  title: "Settings",
};

// type SettingsPageProps = {
//   searchParams: SearchParams;
// };

// const schema = z.object({
//   token: z.string().optional(),
// });

// searchParams,
// }: SettingsPageProps) {
export default async function SettingsPage() {
  const t = await getTranslations();

  // const { token } = schema.parse(searchParams);

  // const user =
  //   authProvider === "clerk"
  //     ? await getCachedUserClerk()
  //     : await getCachedUserAuthJs();

  // const notificationPromise = getNotification({
  //   email: user.email,
  //   token,
  // });

  return (
    <Shell variant="sidebar">
      <PageHeader>
        <PageHeaderHeading size="sm">{t("page.settings")}</PageHeaderHeading>
        <PageHeaderDescription size="sm">
          Manage the website and account preferences.
        </PageHeaderDescription>
      </PageHeader>
      <Card>
        <CardHeader>
          <CardTitle>{t("page.emailPreferences")}</CardTitle>
          <CardDescription>
            {t("page.manageYourEmailPreferences")}
          </CardDescription>
        </CardHeader>
        <CardContent>
          We have temporarily disabled this website element while we work on it.
          Please check back later to use it.
          {/* <Suspense fallback={<UpdateNotificationFormSkeleton />}>
            <UpdateNotificationForm notificationPromise={notificationPromise} />
          </Suspense> */}
        </CardContent>
      </Card>
    </Shell>
  );
}
