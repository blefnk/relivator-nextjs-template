// import { authMiddleware, clerkClient } from "@clerk/nextjs";
// import { type UserRole } from "~/utils/types/store-main";

import { NextRequest, NextResponse } from "next/server";
import { authMiddleware } from "@clerk/nextjs/server";
import { createI18nMiddleware } from "next-international/middleware";

import { defaultLocale, localeList } from "~/data/i18n";

// Set the available locales here. These values should match a .json file in /messages.
// The const `locales` cannot be set dynamically based on files in /messages,
// because native Node.js APIs are not supported in Next.js middleware.
// So you can't read the filesystem.
export const locales = ["en", "uk"];

export const config = {
  // Skip all internal paths
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"]
};
//export const config = {
//  matcher: [
//    "/((?!api|_next/static|_next/image|favicon.ico|logo.png|logo.svg|og-image.//png).*)"
//  ]
//};
// export const config = {
//   matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api)(.*)"]
// };

export default authMiddleware({
  // !! If a user is not authenticated,
  // !! execute the following function:
  beforeAuth(request: NextRequest) {
    // This middleware intercepts requests to `/` and will redirect
    // to one of the configured locales instead (e.g. `/en`).
    // In the background a cookie is set that will remember the
    // locale of the last page that the user has visited.
    // The middleware furthermore passes the resolved locale
    // to components.
    const handleI18nRouting = createI18nMiddleware(localeList, defaultLocale, {
      urlMappingStrategy: "redirect"
    });

    // Store current request pathname in the request header,
    // this can be used to set the active menu/tab item.
    // See issue: https://github.com/vercel/next.js/issues/43704
    request.headers.set("x-pathname", request.nextUrl.pathname);

    // ...
    const response = handleI18nRouting(request);

    // ...
    return response;
  },

  // !! If a user is authenticated,
  // !! execute this one function:
  async afterAuth(auth, req) {
    if (auth.isPublicRoute) {
      //  For public routes, we don't need to do anything
      return NextResponse.next();
    }

    // ...
    const url = new URL(req.nextUrl.origin);

    // ...
    if (!auth.userId) {
      //  If user tries to access a private route without being authenticated,
      //  redirect them to the sign in page
      url.pathname = "/sign-in";
      return NextResponse.redirect(url);
    }

    // !! FIX: CLERK BUILD ERRORS
    // !! if you want to uncomment:
    // !! remove .next folder first
    // Set the user's role to user if it doesn't exist
    // It costs too many middleware size for app bundling
    // const user = await clerkClient.users.getUser(auth.userId);
    /* if (!user) {
      throw new Error("User not found.");
    } */
    // If the user doesn't have a role, set it to user
    /* if (!user.privateMetadata.role) {
      await clerkClient.users.updateUserMetadata(auth.userId, {
        privateMetadata: {
          role: "user" satisfies UserRole
        }
      });
    } */
  },

  // !! Public routes are routes that
  // !! don't require authentication:
  publicRoutes: ["/", "/(.*)"]
  // TODO: Find the correct way to handle locales.
  /* publicRoutes: [
    "/",
    "/sign-in(.*)",
    "/sign-up(.*)",
    "/sign-sso(.*)",
    "/categories(.*)",
    "/product(.*)",
    "/products(.*)",
    "/product(.*)",
    "/stores(.*)",
    "/store(.*)",
    "/build-a-board(.*)",
    "/email-preferences(.*)",
    "/blog(.*)",
    "/about(.*)",
    "/contact(.*)",
    "/terms(.*)",
    "/privacy(.*)",
    "/api(.*)"
  ] */
});

//export function middleware(request: NextRequest) {
//  return I18nMiddleware(request);
//}
