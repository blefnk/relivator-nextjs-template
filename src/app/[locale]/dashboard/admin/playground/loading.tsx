import { useTranslations } from "next-intl";

export default function PlaygroundLoading() {
  const t = useTranslations();

  return <div>{t("loading.loading")}</div>;
}
