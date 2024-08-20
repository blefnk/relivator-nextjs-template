import { useTranslations } from "next-intl";

export function NavWithCompactPageHeader() {
  const t = useTranslations();

  return (
    <section>
      <h2>
        Application - App Shells - Stacked Layouts - Nav with compact page
        header
      </h2>
      <p>{t("NavWithCompactPageHeader.navwithcompactpageheader")}</p>
    </section>
  );
}
