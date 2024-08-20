import type { MetadataRoute } from "next";

import { defaultLocale, locales, pathnames } from "~/../reliverse.i18n";

import { env } from "~/env";
import { getPathname } from "~/navigation";

const host = (() => {
  if (env.NEXT_PUBLIC_APP_URL) {
    return env.NEXT_PUBLIC_APP_URL;
  }

  if (env.VERCEL_URL) {
    return `https://${env.VERCEL_URL}`;
  }

  const port = env.PORT || 3000;

  return `http://localhost:${port}`;
})();

export default function sitemap(): MetadataRoute.Sitemap {
  const keys = Object.keys(pathnames) as Array<keyof typeof pathnames>;

  function getUrl(
    key: keyof typeof pathnames,
    locale: (typeof locales)[number],
  ) {
    const pathname = getPathname({ locale, href: key });

    return `${host}/${locale}${pathname === "/" ? "" : pathname}`;
  }

  return keys.map((key) => ({
    url: getUrl(key, defaultLocale),
    alternates: {
      languages: Object.fromEntries(
        locales.map((locale) => [locale, getUrl(key, locale)]),
      ),
    },
  }));
}
