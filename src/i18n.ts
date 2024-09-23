import type { Locale } from "~/../reliverse.i18n";

import { notFound } from "next/navigation";

import { locales } from "~/../reliverse.i18n";
import { getRequestConfig } from "next-intl/server";

export default getRequestConfig(async ({ locale }) => {
  if (!locales.includes(locale as any)) {
    notFound();
  }

  return {
    messages: (
      await (locale === ("en" as Locale)
        ? import("../messages/default/en-US.json")
        : import(`../messages/default/${locale}.json`))
    ).default,
  };
});
