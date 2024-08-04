import { useTranslations } from "next-intl";

export default function ProductsCatalogue() {
  const t = useTranslations();

  return <h2>{t("store.products.productsCatalogue")}</h2>;
}
