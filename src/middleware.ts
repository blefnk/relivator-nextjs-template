import { NextResponse, type NextRequest } from "next/server";
import { authMiddleware } from "@clerk/nextjs/server";
import { createI18nMiddleware } from "next-international/middleware";

import { defaultLocale, localeList } from "~/data/i18n";

export default authMiddleware({
  beforeAuth(request: NextRequest) {
    /**
     * This middleware intercepts requests to `/` and redirects
     * into one of the configured locales instead (e.g. `/en`).
     * In the background, a cookies are set, that will remember
     * the locale of the last page that the user has visited. The
     * middleware furthermore passes the resolved locale to components.
     */
    const handleI18nRouting = createI18nMiddleware(localeList, defaultLocale, {
      urlMappingStrategy: "redirect"
    });

    /**
     * Store current request pathname in the request header,
     * this can be used e.g to set the active menu/tab item.
     * Issue: https://github.com/vercel/next.js/issues/43704
     */
    request.headers.set("x-pathname", request.nextUrl.pathname);

    // Write the `handleI18nRouting` to the `response`.
    const response = handleI18nRouting(request);
    // Execute beforeAuth function.
    return response;
  },

  async afterAuth(auth, req) {
    const url = new URL(req.nextUrl.origin);

    // For public routes, we don't need to do anything.
    if (auth.isPublicRoute) return NextResponse.next();

    /**
     * If user tries to access a private route without being
     * authenticated, redirect them to the app sign in page.
     */
    if (!auth.userId) {
      url.pathname = "/sign-in";
      return NextResponse.redirect(url);
    }
  },

  publicRoutes: [
    // Protected routes are
    // handled with Layouts
    "/(.*)"
  ]
});

export const config = {
  /** Config currently matches all request paths except for the ones starting with matcher. */
  /** @see https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher */
  matcher: [
    "/((?!.*\\..*|_next).*)", // specific files
    "/", // the next.js application routes root
    "/(api|trpc)(.*)" // routes: /api and /trpc
  ]
};
