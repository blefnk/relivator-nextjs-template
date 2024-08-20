"use client";

import { useTranslations } from "next-intl";

export default function ProductsContext() {
  const t = useTranslations();

  return (
    <div>
      <h1>{t("product-context.productsctx")}</h1>
    </div>
  );
}
