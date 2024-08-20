import { useTranslations } from "next-intl";

export function WithIcons() {
  const t = useTranslations();

  return (
    <section>
      <h2>{t("WithIcons.applicationNavigationVerticalNavigationWithIcons")}</h2>
      <p>{t("WithIcons.withicons")}</p>
    </section>
  );
}
