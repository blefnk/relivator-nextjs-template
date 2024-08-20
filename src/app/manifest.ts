import type { MetadataRoute } from "next";

import { getTranslations } from "next-intl/server";

export default async function manifest(): Promise<MetadataRoute.Manifest> {
  const locale = "en-US";
  const t = await getTranslations({ locale, namespace: "Manifest" });

  return {
    name: t("name"),
    start_url: "/",
    theme_color: "#fff",
  };
}
