"use client";

import Link from "next/link";

import type { Session } from "next-auth";

import { signOut } from "next-auth/react";
import { useLocale, useTranslations } from "next-intl";

import PageLayout from "~/components/Wrappers/PageLayout";

type Props = {
  session: null | Session;
};

export default function AccountPageContent({ session }: Props) {
  const t = useTranslations("account-page");
  const locale = useLocale();

  function onLogoutClick() {
    signOut();
  }

  return (
    <PageLayout title={t("title")}>
      {session ? (
        <>
          <p>
            {t("loggedIn", {
              username: session.user?.name,
            })}
          </p>
          <p>
            <Link href={`${locale}/dashboard/settings`}>{t("Settings")}</Link>
          </p>
          <button onClick={onLogoutClick} type="button">
            {t("logout")}
          </button>
        </>
      ) : (
        <>
          <p>{t("loggedOut")}</p>
          <Link href="/auth/sign-in">{t("login")}</Link>
        </>
      )}
    </PageLayout>
  );
}
