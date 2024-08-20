import { useTranslations } from "next-intl";

export function SidebarWithHeader() {
  const t = useTranslations();

  return (
    <section>
      <h2>
        {t(
          "SidebarWithHeader.applicationAppShellsSidebarLayoutsSidebarWithHeader",
        )}
      </h2>
      <p>{t("SidebarWithHeader.sidebarwithheader")}</p>
    </section>
  );
}
