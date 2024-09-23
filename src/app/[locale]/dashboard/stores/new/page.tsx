import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { getTranslations } from "next-intl/server";

import { authjs } from "~/auth/authjs";
import { clerk } from "~/auth/clerk";
import { authProvider } from "~/auth/provider";
import { UserNotFound } from "~/components/Account/Guest/UserNotFound";
import { StoreAddForm } from "~/components/Forms/StoreAddForm";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "~/components/Navigation/PageNavMenu";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Shell } from "~/components/Wrappers/ShellVariants";
import { auth } from "~/server/queries/user";

export const metadata: Metadata = {
  description: "Add a new store",
  title: "New Store",
};

export default async function NewStorePage() {
  const t = await getTranslations();

  // const user = await revalidateUser();
  const user = await auth();

  if (!user) {
    return <UserNotFound />;
  }

  // consola.info(user);
  return (
    <Shell variant="sidebar">
      <PageHeader
        id="new-store-page-header"
        aria-labelledby="new-store-page-header-heading"
      >
        <PageHeaderHeading size="sm">{t("page.newStore")}</PageHeaderHeading>
        <PageHeaderDescription size="sm">
          Add a new store to the account
        </PageHeaderDescription>
      </PageHeader>
      <Card
        id="new-store-page-form-container"
        aria-labelledby="new-store-page-form-heading"
      >
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">{t("page.addStore")}</CardTitle>
          <CardDescription>
            {t("page.addANewStoreToTheAccount")}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <StoreAddForm userId={user.id} />
        </CardContent>
      </Card>
    </Shell>
  );
}
