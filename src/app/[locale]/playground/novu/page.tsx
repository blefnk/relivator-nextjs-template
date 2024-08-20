import { useTranslations } from "next-intl";

export default function NovuTestPage() {
  const t = useTranslations();

  return <div>{t("page.novuDeveloperPlaygroundPageComingSoon")}</div>;
}
