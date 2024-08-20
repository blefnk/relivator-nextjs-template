import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { authProvider } from "~/../reliverse.config";
import { getTranslations } from "next-intl/server";

import { authjs } from "~/auth/authjs";
import { clerk } from "~/auth/clerk";
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

  const session = authProvider === "clerk" ? await clerk() : await authjs();

  if (!session || session.email === "guest@email.com") {
    return redirect("/");
  }

  return (
    <Shell className="max-w-xs">
      <PageHeader
        aria-labelledby="sign-out-page-header-heading"
        className="text-center"
        id="sign-out-page-header"
      >
        <PageHeaderHeading size="sm">
          {t("signOutPage.heading.signout")}
        </PageHeaderHeading>
        <PageHeaderDescription size="sm">
          {t("signOutPage.description.areyousueyouwanttosignout")}
        </PageHeaderDescription>
      </PageHeader>
      <LogOutButtons
        tLogOut={t("signOutPage.logOut")}
        tHome={t("signOutPage.home")}
        tDashboard={t("signOutPage.dashboard")}
      />
    </Shell>
  );
}
