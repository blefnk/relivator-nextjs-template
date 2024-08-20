import { useTranslations } from "next-intl";

export default function PreferencesPage() {
  const t = useTranslations();

  return (
    <div>
      <h1>{t("page.emailPreferences")}</h1>
      <p>{t("page.underConstruction")}</p>
    </div>
  );
}
