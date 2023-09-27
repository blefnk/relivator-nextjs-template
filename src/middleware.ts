/** @see https://nextjs.org/docs/app/building-your-application/routing/middleware */

import { NextResponse, type NextRequest } from "next/server";
import { withAuth } from "next-auth/middleware";
import createIntlMiddleware from "next-intl/middleware";

import { defaultLocale, locales } from "./i18n/locales";

function doesPathMatchPages(req: NextRequest, pages: string[]) {
  return RegExp(`^(/(${locales.join("|")}))?(${pages.join("|")})/?$`, "i").test(
    req.nextUrl.pathname,
  );
}

function redirect(req: NextRequest, redirectURL: string) {
  return NextResponse.redirect(
    new URL(redirectURL, req.nextUrl.origin).toString(),
  );
}

const intlMiddleware = createIntlMiddleware({
  locales,
  defaultLocale,
  localePrefix: "always",
});

const defaultPublicPage = "";
const authPages = ["/sign-in", "/sign-up"];
const blockedPages = ["/blocked"];
const defaultBlockedPage = "/blocked";
const adminPages = ["/admin"];

/**
 * `/{locale}/` -> `/{locale}`
 */
const publicPages = [""];

export default withAuth(
  function onSuccess(req) {
    const token = req.nextauth.token;

    if (req.nextUrl.pathname.startsWith("/api")) {
      if (true) return NextResponse.next();
    }

    if (!token) {
      if (
        !doesPathMatchPages(req, authPages) &&
        !doesPathMatchPages(req, publicPages)
      ) {
        return null;
      }
      return intlMiddleware(req);
    }

    // todo: make it more stable
    // if (
    //   doesPathMatchPages(req, authPages) ||
    //   (doesPathMatchPages(req, blockedPages) && !token.isBlocked) ||
    //   (doesPathMatchPages(req, adminPages) && !token.isAdmin)
    // ) {
    //   return redirect(req, defaultPublicPage);
    // }

    if (!doesPathMatchPages(req, blockedPages) && token.isBlocked) {
      return redirect(req, defaultBlockedPage);
    }

    return intlMiddleware(req);
  },
  {
    callbacks: {
      authorized: () => true,
    },
  },
);

export const config = {
  // Skip all paths that should not be touched by this middleware
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};

/*
 * ================================================================
 * === [ DEPRECATED, AND WILL BE CHANGED IN THE NEXT VERSIONS ] ===
 * ================================================================
 */

//! import { authI18nMiddleware } from "./server/auth-i18n-middleware";
//! import { i18nMiddleware } from "./server/i18n-middleware";
//! export const middleware = (request: NextRequest) => {
//!   const authI18nResponse = authI18nMiddleware(request);
//!   if (authI18nResponse) return authI18nResponse;
//!   const response = i18nMiddleware(request);
//!   return response;
//! };

//! import { type NextRequest } from "next/server";
//! import { createI18nMiddleware } from "next-international/middleware";
//! import { defaultLocale, localeList } from "~/data/i18n";
//! const i18nMiddleware = createI18nMiddleware(localeList, defaultLocale, {
//!   urlMappingStrategy: "redirect",
//! });
//! export function middleware(request: NextRequest) {
//!   // const response = i18nMiddleware(request);
//!   // return response;
//!   return i18nMiddleware(request);
//! }
//! export const config = {
//!   matcher: [
//!     "/((?!api|_next/static|_next/image|favicon.ico|logo.png|logo.svg|og-image.//! png).*)",
//!   ],
//! };

//! export function middleware(request: NextRequest) {
//!   const newUrl = new URL(request.url);
//!   if (
//!     ["/browserconfig.xml", "/manifest.json", "/robots.txt"].includes(
//!       request.nextUrl.pathname
//!     )
//!   ) {
//!     return NextResponse.next();
//!   }
//!   if (
//!     i18n.locales.some((locale) => newUrl.pathname.startsWith(`/${locale}/`))
//!   ) {
//!     newUrl.pathname.slice(3);
//!     return NextResponse.redirect(newUrl);
//!   }
//!   const locale =
//!     localeByHost[geRequestHost(request) ?? ""] ?? i18n.defaultLocale;
//!   const existingPathnamePatterns = [
//!     /^\/$/,
//!     /^\/photos$/,
//!     /^\/update-profiles\//
//!   ];
//!   if (!existingPathnamePatterns.some((pathnamePattern) =>
//!       pathnamePattern.test(newUrl.pathname)
//!     )
//!   ) {
//!     newUrl.pathname = `/${locale}/404`;
//!     return NextResponse.rewrite(newUrl, { status: 404 });
//!   }
//!   newUrl.pathname = `/${locale}${newUrl.pathname}`;
//!   return NextResponse.rewrite(newUrl);
//! }

//! import { i18n } from "./i18n-config";
//! import { baseUrlByLocale } from "./i18n-server";
//! function geRequestHost(request: NextRequest) {
//!   return request.headers.get("x-forwarded-host") || request.headers.get("host");
//! }
//! const localeByHost = Object.fromEntries(
//!   Object.entries(baseUrlByLocale).map(([locale, baseUrl]) => [
//!     new URL(baseUrl).host,
//!     locale
//!   ])
//! );
//! export const config = {
//!   matcher: [
//!     "/((?!api|_next|_next/static|_next/image|icon|robots.txt|sitemap.xml|public|favicon.ico|favicon/|images/|public/.*|.*\\..*).*)",
//!   ],
//! };

//! // eslint-disable-next-line no-useless-escape
//! const localePathPattern = /^\/(?<locale>[^\/\s]+)/;
//! export const getLocale = (pathname: string) => localePathPattern.exec(pathname)?.groups?.locale;
//! import { NextResponse, type NextRequest } from "next/server";
//! import { signInPagePath } from "~/auth";
//! import { defaultLocale, getLocale } from "~/i18n";
//! // eslint-disable-next-line no-useless-escape
//! const signInPagePathPattern = /^\/[^\/\s]+\/auth\/signin/;
//! export const authI18nMiddleware = (request: NextRequest) => {
//!   if (!signInPagePathPattern.test(request.nextUrl.pathname)) return;
//!   const callbackUrl = request.nextUrl.searchParams.get("callbackUrl");
//!   if (!callbackUrl) return;
//!   const currentLocale = getLocale(request.nextUrl.pathname) ?? defaultLocale;
//!   const callbackLocale = getLocale(new URL(callbackUrl).pathname);
//!   if (callbackLocale && callbackLocale !== currentLocale) {
//!     const redirectUrl = new URL(request.nextUrl);
//!     redirectUrl.pathname = signInPagePath(callbackLocale);
//!     return NextResponse.redirect(redirectUrl);
//!   }
//! };

//! import { createI18nMiddleware } from "next-international/middleware";
//! import { defaultLocale, localeList } from "~/data/i18n";
//! import { authI18nMiddleware as authNextIntlMiddleware } from "./server/auth-i18n-middleware";
//! import { authI18nMiddleware } from "./server/auth-i18n-middleware";
//! import { i18nMiddleware as nextIntlMiddleware } from "./server/i18n-middleware";
//! const ignoredPaths = ["/(api|trpc)(.*)"];
//! const publicPaths = [
//!   "/:locale",
//!   "/:locale/about(.*)",
//!   "/:locale/blog(.*)",
//!   "/:locale/custom/clothing(.*)",
//!   "/:locale/categories(.*)",
//!   "/:locale/contact(.*)",
//!   "/:locale/email-preferences(.*)",
//!   "/:locale/privacy(.*)",
//!   "/:locale/product(.*)",
//!   "/:locale/products(.*)",
//!   "/:locale/sign-in(.*)",
//!   "/:locale/sign-sso(.*)",
//!   "/:locale/sign-up",
//!   "/:locale/store(.*)",
//!   "/:locale/stores(.*)",
//!   "/:locale/terms(.*)"
//! ];
//! export const config = {
//!   // Specify for what paths inside of app the middleware should run:
//!   matcher: ["/((?!.*\\..*|_next).*)", "/:locale", "/(api|trpc)(.*)"]
//! };
//! /**
//!  * This middleware intercepts requests to `/` and redirects into one of the configured
//!  * locales instead (e.g. `/en`). In the background, a cookies are set, that will remember
//!  * locale of last page that the user has visited. Then sent resolved locale to components.
//!  */
//! const i18nMiddleware = createI18nMiddleware(localeList, defaultLocale, {
//!   urlMappingStrategy: "redirect"
//! });
//! /**
//!  * This middleware is responsible for authentication and access.
//!  */
//! export default authMiddleware({
//!   async beforeAuth(request: NextRequest) {
//!     /**
//!      * Store current request pathname in the request header,
//!      * this can be used e.g to set the active menu/tab item.
//!      * @see: https://github.com/vercel/next.js/issues/43704
//!      */
//!     request.headers.set("x-pathname", request.nextUrl.pathname);
//!     const response = authI18nMiddleware(request);
//!     // const response = i18nMiddleware(request);
//!     return response;
//!   },
//!   async afterAuth(auth, req) {
//!     const url = new URL(req.nextUrl.origin);
//!     if (auth.isPublicRoute) {
//!       /**
//!        * If user tries to access a public route without being
//!        * authenticated, just do nothing and close middleware.
//!        */
//!       return NextResponse.next();
//!     }
//!     if (!auth.userId) {
//!       /**
//!        * If user tries to access a private route without being
//!        * authenticated, redirect them to the app sign-in page.
//!        */
//!       url.pathname = "/sign-in";
//!       return NextResponse.redirect(url);
//!     }
//!   },
//!   publicRoutes: publicPaths,
//!   ignoredRoutes: ignoredPaths
//! });
