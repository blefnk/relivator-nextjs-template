/**
 * @see https://nextjs.org/docs/app/building-your-application/routing/middleware
 * @see https://next-intl-docs.vercel.app/docs/routing/middleware#example-auth-js
 * @see https://github.com/enalmada/nextjs-boilerplate/blob/develop/src/middleware.ts
 * @see https://github.com/amannn/next-intl/blob/main/packages/next-intl/src/middleware/middleware.tsx
 * @see https://github.com/amannn/next-intl/blob/main/examples/example-next-13-next-auth/src/middleware.tsx
 */

import { NextRequest, NextResponse } from "next/server";
import { authMiddleware as authMiddlewareClerk } from "@clerk/nextjs";
import { env } from "~/env.mjs";
import { defaultLocale, locales } from "~/navigation";
import { withAuth } from "next-auth/middleware";
import { createI18nMiddleware } from "next-international/middleware";
import nextIntlMiddleware from "next-intl/middleware";

/**
 * List of public pages that don't require authentication
 * Currently we rely on `if(!user)` so it set to "/(.*)"
 */
const publicPages = ["/(.*)"];

type availableAuthProviders = "authjs" | "clerk";
const authProviderEnv = env.NEXT_PUBLIC_AUTH_PROVIDER ?? "authjs";
const authProvider = authProviderEnv as availableAuthProviders;

type intlProviders = "next-intl" | "next-international";
const intlServiceEnv = env.NEXT_PUBLIC_INTL_PROVIDER ?? "authjs";
const intlService = intlServiceEnv as intlProviders;

/**
 * This middleware intercepts requests to `/` redirects into one of the configured
 * locales (e.g. `/en-us`). And, in the background, a cookies are set, that will remember
 * locale of last page that the user has visited. Then sent resolved locale to components
 */
let intlMiddleware;
if (intlService === "next-intl") {
  intlMiddleware = nextIntlMiddleware({
    /**
     * A list of all locales that are supported
     */
    locales,
    /**
     * If this locale is matched, pathnames
     * work without a prefix (e.g. `/about`)
     */
    // defaultLocale: "en-us",
    defaultLocale,
    /**
     * `always` means that the default locale
     * prefix will always be added to the url
     *
     * todo: temporarily "as-needed" used
     * todo: to fix wrong stripe redirect
     */
    // localePrefix: "always",
    localePrefix: "as-needed",
  });
} else if (intlService === "next-international") {
  intlMiddleware = createI18nMiddleware({
    locales: locales,
    defaultLocale,
    // todo: temporarily "rewrite" used
    // todo: to fix wrong stripe redirect
    urlMappingStrategy: "rewrite",
  });
}

/**
 * This middleware responsible for authentication and access.
 * Note that this callback is only invoked if the `authorized`
 * callback has returned `true` and not for pages listed here.
 * todo: jwt token is not set in auth.ts, so it's not working.
 * @see https://authjs.dev/guides/basics/securing-pages-and-api-routes
 */
const authjsMiddleware = withAuth((req) => intlMiddleware(req), {
  callbacks: {
    authorized: ({ token }) => token != null,
  },
  pages: {
    signIn: "/api/auth/signin",
    newUser: "/auth",
  },
});

export default function middleware(req: NextRequest) {
  const publicPathnameRegex = RegExp(
    `^(/(${locales.join("|")}))?(${publicPages.join("|")})?/?$`,
    "i",
  );
  const isPublicPage = publicPathnameRegex.test(req.nextUrl.pathname);
  if (authProvider === "authjs") {
    /**
     * @see https://next-intl-docs.vercel.app/docs/routing/middleware
     */
    if (isPublicPage) {
      /**
       * If user tries to access a PUBLIC route without being
       * authenticated, just do nothing and close middleware.
       */
      return intlMiddleware(req);
    } else {
      /**
       * If user tries to access a PRIVATE route without being
       * authenticated, redirect them to the app sign-in page.
       */
      return (authjsMiddleware as any)(req);
    }
  } else if (authProvider === "clerk") {
    /**
     * @see https://clerk.com/docs/references/nextjs/auth-middleware
     */
    return (
      authMiddlewareClerk({
        // Public routes are routes that don't require authentication
        publicRoutes: ["/(.*)"],
        async beforeAuth(req: NextRequest) {
          /**
           * Store current request pathname in the request header,
           * this can be used e.g to set the active menu/tab item.
           * @see: https://github.com/vercel/next.js/issues/43704
           */
          req.headers.set("x-pathname", req.nextUrl.pathname);
          const response = intlMiddleware(req);
          return response;
        },
        async afterAuth(auth, req) {
          if (auth.isPublicRoute) {
            /**
             * If user tries to access a public route without being
             * authenticated, just do nothing and close middleware.
             */
            return NextResponse.next();
          }
          const url = new URL(req.nextUrl.origin);
          if (!auth.userId) {
            /**
             * If user tries to access a private route without being
             * authenticated, redirect them to the app sign-in page.
             */
            url.pathname = "/sign-in";
            return NextResponse.redirect(url);
          }
          // todo: Set the user's role to user if it doesn't exist
          // import { clerkClient } from "@clerk/nextjs";
          // const user = await clerkClient.users.getUser(auth.userId);
          // if (!user) {
          //   throw new Error("User not found.");
          // }
          // todo: If the user doesn't have a role, set it to user
          // import { type UserRole } from "~/types";
          // if (!user.privateMetadata.role) {
          //   await clerkClient.users.updateUserMetadata(auth.userId, {
          //     privateMetadata: {
          //       role: "user" satisfies UserRole,
          //     },
          //   });
          // }
        },
      }) as any
    )(req);
  } else {
    throw new Error("❌ [middleware.ts] Invalid authProvider");
  }
}

export const config = {
  /**
   * Matcher entries are linked with logical "or", therefore
   * if one of them matches, the middleware will be invoked.
   *
   * Skips all paths where the middleware configuration will be ignored.
   * To improve i18n, every dot files was specified (e.g. favicon.ico).
   *
   * @see https://next-intl-docs.vercel.app/docs/routing/middleware#unable-to-find-locale
   */
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
