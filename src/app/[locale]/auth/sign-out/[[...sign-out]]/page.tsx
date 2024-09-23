import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { getTranslations } from "next-intl/server";

import { authjs } from "~/auth/authjs";
import { clerk } from "~/auth/clerk";
import { authProvider } from "~/auth/provider";
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

export default async function signOutPage() {
  const t = await getTranslations();

  const session = await authjs();

  if (!session || session.email === "guest@email.com") {
    return redirect("/");
  }

  return (
    <Shell className="max-w-xs">
      <PageHeader
        id="sign-out-page-header"
        className="text-center"
        aria-labelledby="sign-out-page-header-heading"
      >
        <PageHeaderHeading size="sm">
          {t("signOutPage.heading.signout")}
        </PageHeaderHeading>
        <PageHeaderDescription size="sm">
          {t("signOutPage.description.areyousueyouwanttosignout")}
        </PageHeaderDescription>
      </PageHeader>
      <LogOutButtons
        tDashboard={t("signOutPage.dashboard")}
        tHome={t("signOutPage.home")}
        tLogOut={t("signOutPage.logOut")}
      />
    </Shell>
  );
}
