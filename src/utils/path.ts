import { defaultLocale, locales } from "~/../reliverse.i18n";

export const getI18nPath = (url: string, locale: string) => {
  if (locale === defaultLocale) {
    return url;
  }

  return `/${locale}${url}`;
};

export function getNormalizedPathname(normalizedPathname: string) {
  // A variable to hold the modified value
  if (!normalizedPathname.endsWith("/")) {
    normalizedPathname += "/";
  }

  const match = normalizedPathname.match(`^/(${locales.join("|")})/(.*)`);
  let res = match ? `/${match[2]}` : normalizedPathname;

  if (res !== "/") {
    res = normalizeTrailingSlash(res);
  }

  return res;
}

function normalizeTrailingSlash(pathname: string) {
  if (pathname.endsWith("/")) {
    return pathname.slice(0, -1);
  }

  return pathname;
}
