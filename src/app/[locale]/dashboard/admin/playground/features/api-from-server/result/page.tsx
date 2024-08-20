import { useTranslations } from "next-intl";

export default function ResPage() {
  const t = useTranslations();

  return (
    <div>
      <h1>{t("page.res")}</h1>
    </div>
  );
}
