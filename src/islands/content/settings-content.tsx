"use client";

import { useTranslations } from "next-intl";

import PageLayout from "~/islands/wrappers/page-layout";

export default function SettingsPageContent() {
  const t = useTranslations("settings-page");

  return (
    <PageLayout title={t("title")}>
      <p>{t("description")}</p>
    </PageLayout>
  );
}
