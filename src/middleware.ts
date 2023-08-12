import { createI18nMiddleware } from "next-international/middleware";
import { NextRequest } from "next/server";

import { defaultLocale, localeList } from "~/data/i18n";

const I18nMiddleware = createI18nMiddleware(localeList, defaultLocale, {
  urlMappingStrategy: "redirect",
});

export function middleware(request: NextRequest) {
  return I18nMiddleware(request);
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|logo.png|logo.svg|og-image.png).*)",
  ],
};
