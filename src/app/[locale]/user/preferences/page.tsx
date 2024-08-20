import { useTranslations } from "next-intl";

export default function PreferencesPage() {
  const t = useTranslations();

  return (
    <div>
      <h1>{t("page.preferences")}</h1>
      <p>{t("page.underConstruction")}</p>
    </div>
  );
}
