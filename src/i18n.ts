import { notFound } from "next/navigation";

import type { Locale } from "~/../reliverse.i18n";

import { i18nTheme, locales } from "~/../reliverse.i18n";
import { getRequestConfig } from "next-intl/server";

export default getRequestConfig(async ({ locale }) => {
  if (!locales.includes(locale as any)) {
    notFound();
  }

  return {
    messages: (
      await (locale === ("en" as Locale)
        ? import(`../messages/${i18nTheme}/en-US.json`)
        : import(`../messages/${i18nTheme}/${locale}.json`))
    ).default,
  };
});
