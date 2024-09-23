import type { ReactElement } from "react";

import { redirect } from "next/navigation";

import { Edit, Mail, View } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { authjs } from "~/auth/authjs";
import { clerk } from "~/auth/clerk";
import { authProvider } from "~/auth/provider";
import { UserNotFound } from "~/components/Account/Guest/UserNotFound";
import { buttonVariants } from "~/components/ui/button";
import { GeneralShell } from "~/components/Wrappers/GeneralShell";
import { auth } from "~/server/queries/user";
import { cn } from "~/utils/cn";

// import Link from "next/link";
// import AdminProductsManagement from "~/core/trpc-old/tanstack/products-admin";

export default async function AdminMainPage(): Promise<ReactElement> {
  const t = await getTranslations();

  const session = await auth();

  if (!session) {
    return <UserNotFound />;
  }

  // TODO: Implement email system
  // const email = "blefnk@gmail.com";
  // const firstName = "Nazarii";
  // enum Templates {
  // Onboard = "ONBOARD",
  // }
  // await sendEmails([email], { firstName }, Templates.Onboard); */

  return (
    <GeneralShell>
      <h1 className="mt-12 text-lg font-semibold">{t("page.adminPage")}</h1>
      <p className="-mt-3 text-muted-foreground">
        The page is still in development. Currently you can create the new pages
        and components here, likewise play with tRPC and TanStack Query below
        (use also TanStack DevTools on localhost).
      </p>
      <hr className="my-2" />
      <section className="flex space-x-8">
        <section className="mb-12 space-y-4">
          <h2>{t("page.createNewPage")}</h2>
          <p className="text-muted-foreground">
            /src/app/[locale]/admin/* will be used
          </p>
          {/* <Creating type="page" /> */}
          Soon...
        </section>
        <section className="mb-12 space-y-4">
          <h2>{t("page.createNewComponent")}</h2>
          <p className="text-muted-foreground">
            /src/components/(cms)/* will be used
          </p>
          {/* <Creating type="component" /> */}
          Soon...
        </section>
        <section className="mb-12 space-y-4">
          <h2>{t("page.createNewPost")}</h2>
          <span
            className={cn(
              buttonVariants({
                size: "default",
                variant: "secondary",
              }),
              "",
            )}

            // href="/blog/new"
          >
            <Edit className="mr-2 size-4" aria-hidden="true" />
            Create post
          </span>
          <br />
          <span
            className={cn(
              buttonVariants({
                size: "default",
                variant: "secondary",
              }),
              "",
            )}

            // href="/blog"
          >
            <View className="mr-2 size-4" aria-hidden="true" />
            See all posts
          </span>
        </section>
        <section className="mb-12 space-y-4">
          <h2>{t("page.editUserPrivileges")}</h2>
          <p>{t("page.notImplementedYet")}</p>
          {/* <ButtonSetPrivileges newRole="user" userId={session.id} /> */}
        </section>
        {/* TODO: Implement email system */}
        <section className="mb-12 space-y-4">
          <h2>{t("page.testEmailDelivery")}</h2>
          <span
            className={cn(
              buttonVariants({
                size: "default",
                variant: "secondary",
              }),
              "",
            )}
          >
            <Mail className="mr-2 size-4" aria-hidden="true" />
            {/* @ts-expect-error TODO: Fix ts */}
            Send test email to {session.email}
          </span>
        </section>
      </section>
      <hr />

      {/* TODO: temp - disabled */}
      {/* <AdminProductsManagement /> */}
    </GeneralShell>
  );
}
