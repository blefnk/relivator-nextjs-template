/** @see https://nextjs.org/docs/app/building-your-application/routing/middleware */

import { NextResponse, type NextRequest } from "next/server";
import { authMiddleware } from "@clerk/nextjs/server";
import { createI18nMiddleware } from "next-international/middleware";

import { defaultLocale, localeList } from "~/data/i18n";

const ignoredPaths = ["/(api|trpc)(.*)"];

const publicPaths = [
  "/:locale",
  "/:locale/about(.*)",
  "/:locale/blog(.*)",
  "/:locale/custom/clothing(.*)",
  "/:locale/categories(.*)",
  "/:locale/contact(.*)",
  "/:locale/email-preferences(.*)",
  "/:locale/privacy(.*)",
  "/:locale/product(.*)",
  "/:locale/products(.*)",
  "/:locale/sign-in(.*)",
  "/:locale/sign-sso(.*)",
  "/:locale/sign-up",
  "/:locale/store(.*)",
  "/:locale/stores(.*)",
  "/:locale/terms(.*)"
];

export const config = {
  // Specify for what paths inside of app the middleware should run:
  matcher: ["/((?!.*\\..*|_next).*)", "/:locale", "/(api|trpc)(.*)"]
};

/**
 * This middleware intercepts requests to `/` and redirects into one of the configured
 * locales instead (e.g. `/en`). In the background, a cookies are set, that will remember
 * locale of last page that the user has visited. Then sent resolved locale to components.
 */
const i18nMiddleware = createI18nMiddleware(localeList, defaultLocale, {
  urlMappingStrategy: "redirect"
});

/**
 * This middleware is responsible for authentication and access.
 * @see https://clerk.com/docs/references/nextjs/auth-middleware
 */
export default authMiddleware({
  async beforeAuth(request: NextRequest) {
    /**
     * Store current request pathname in the request header,
     * this can be used e.g to set the active menu/tab item.
     * @see: https://github.com/vercel/next.js/issues/43704
     */
    request.headers.set("x-pathname", request.nextUrl.pathname);

    const response = i18nMiddleware(request);

    return response;
  },

  async afterAuth(auth, req) {
    const url = new URL(req.nextUrl.origin);

    if (auth.isPublicRoute) {
      /**
       * If user tries to access a public route without being
       * authenticated, just do nothing and close middleware.
       */
      return NextResponse.next();
    }

    if (!auth.userId) {
      /**
       * If user tries to access a private route without being
       * authenticated, redirect them to the app sign-in page.
       */
      url.pathname = "/sign-in";
      return NextResponse.redirect(url);
    }
  },

  publicRoutes: publicPaths,
  ignoredRoutes: ignoredPaths
});
