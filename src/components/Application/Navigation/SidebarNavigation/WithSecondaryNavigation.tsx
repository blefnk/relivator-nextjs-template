import { useTranslations } from "next-intl";

export function WithSecondaryNavigation() {
  const t = useTranslations();

  return (
    <section>
      <h2>
        Application - Navigation - Sidebar Navigation - With secondary
        navigation
      </h2>
      <p>{t("WithSecondaryNavigation.withsecondarynavigation")}</p>
    </section>
  );
}
