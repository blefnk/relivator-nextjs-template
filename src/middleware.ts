/**
 * Next.js Middleware Configuration
 * ================================
 *
 * This middleware file handles core app logic, conditionally applying the
 * authentication and internationalization, based on environment variables.
 *
 * Please scroll down to the bottom of this file to read
 * detailed description about each section of this file.
 */

import {
  NextResponse,
  type NextFetchEvent,
  type NextRequest,
} from "next/server";
import { authMiddleware as withClerk } from "@clerk/nextjs";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { setCookie } from "cookies-next";
import {
  withAuth as withNextAuth,
  type NextRequestWithAuth,
} from "next-auth/middleware";
import { createI18nMiddleware } from "next-international/middleware";
import nextIntlMiddleware from "next-intl/middleware";

import { env } from "~/env.mjs";
import { defaultLocale, locales } from "~/navigation";
import { checkIfPageRequestComesFromBot, getLocale } from "~/utils/auth/mw";

const publicRoutes = ["/(.*)"];

type AuthProviderType = "clerk" | "authjs" | undefined;
type IntlProviderType = "next-intl" | "next-international" | undefined;
const authProvider = env.NEXT_PUBLIC_AUTH_PROVIDER as AuthProviderType;
const intlProvider = env.NEXT_PUBLIC_INTL_PROVIDER as IntlProviderType;

let intlMiddleware: (request: NextRequest) => Promise<Response | undefined>;
if (intlProvider === "next-intl" || intlProvider === undefined) {
  intlMiddleware = (request: NextRequest) =>
    Promise.resolve(
      nextIntlMiddleware({
        localePrefix: "as-needed",
        defaultLocale,
        locales,
      })(request),
    );
} else if (intlProvider === "next-international") {
  intlMiddleware = (request: NextRequest) =>
    Promise.resolve(
      createI18nMiddleware({
        urlMappingStrategy: "rewrite",
        defaultLocale,
        locales,
      })(request),
    );
}

let redis: Redis;
let ratelimit: Ratelimit;
if (env.UPSTASH_REDIS_REST_URL) {
  redis = new Redis({
    url: env.UPSTASH_REDIS_REST_URL ?? "",
    token: env.UPSTASH_REDIS_REST_TOKEN ?? "",
  });
  ratelimit = new Ratelimit({
    redis: redis,
    limiter: Ratelimit.slidingWindow(20, "3 s"),
  });
}
async function rateMiddleware(
  request: NextRequest,
): Promise<Response | undefined> {
  if (env.UPSTASH_REDIS_REST_URL) {
    const ip = request.ip ?? "127.0.0.1";
    const { success } = await ratelimit.limit(ip);
    return success ?
        NextResponse.next()
      : NextResponse.redirect(new URL("/block", request.url));
  } else {
    return NextResponse.next();
  }
}

export default async function middleware(
  request: NextRequest,
  event_: NextFetchEvent,
) {
  if (env.CHECK_BOT_ACTIVITY === "true") {
    const userAgent = request.headers.get("user-agent") || "";
    const { isGeneralBot, isLighthouseBot, isSearchBot } =
      checkIfPageRequestComesFromBot(userAgent);
    if (isSearchBot || isGeneralBot || isLighthouseBot) {
      console.log(`🤖 Bot detected: ${userAgent}`);
    }
  }
  const locale = getLocale(request);
  const { nextUrl: geo } = request;
  // @ts-expect-error strange error
  const country = geo?.country || "US";
  if (country === "RU") return new Response("", { status: 403 });
  if (locale) setCookie("NEXT_LOCALE", locale);
  if (authProvider === "clerk") {
    return withClerk({
      publicRoutes,
      async beforeAuth(request: NextRequest) {
        let intlResponse: Response | undefined;
        const rateResponse = await rateMiddleware(request);
        const { headers, nextUrl } = request;
        headers.set("x-pathname", nextUrl.pathname);
        if (rateResponse) intlResponse = await intlMiddleware(request);
        return intlResponse && rateResponse ? intlResponse : (
            NextResponse.next()
          );
      },
      async afterAuth(auth, request) {
        if (auth.isPublicRoute) return NextResponse.next();
        const { origin } = request.nextUrl;
        const url = new URL(origin);
        if (!auth.userId) {
          url.pathname = "/sign-in";
          return NextResponse.redirect(url);
        }
      },
    })(request, event_);
  } else {
    const publicPathnameRegex = new RegExp(
      `^(/(${locales.join("|")}))?(${publicRoutes.join("|")})?/?$`,
      "i",
    );
    const isPublicRoute = publicPathnameRegex.test(request.nextUrl.pathname);
    if (isPublicRoute) {
      let intlResponse: Response | undefined;
      const rateResponse = await rateMiddleware(request);
      request.headers.set("x-pathname", request.nextUrl.pathname);
      if (rateResponse) intlResponse = await intlMiddleware(request);
      return intlResponse && rateResponse ? intlResponse : NextResponse.next();
    } else {
      return withNextAuth((request) => intlMiddleware(request), {
        callbacks: { authorized: ({ token }) => token !== undefined },
        pages: {
          newUser: `/${locale}/auth`,
          signIn: `/${locale}/sign-in`,
          signOut: `/${locale}/sign-out`,
        },
      })(request as NextRequestWithAuth, event_);
    }
  }
}

export const config = {
  matcher: [
    /**
     * It matches all paths except:
     * 1. /api/ (includes trpc there)
     * 2. /_next/ (Next.js internals)
     * 3. /_proxy/ (OG tags proxying)
     * 4. /_vercel (Vercel internals)
     * 5. /_static (inside of /public)
     * 6. /favicon.ico, /sitemap.xml, /robots.txt (static files)
     * 7. The paths containing a file extension (e.g., .jpg, .png, etc.)
     */
    "/((?!api/|_next/|_proxy/|_vercel|_static|favicon.ico|sitemap.xml|robots.txt|.*\\..*).*)",
  ],
};

/**
 * Next.js Middleware Configuration
 * ================================
 *
 * This middleware file handles app's core logic, conditionally applying the authentication and internationalization, based on the environment variables.
 * - The middleware function first checks if the Clerk auth is enabled and configured correctly, where `else` for this means NextAuth.js.
 *   If Clerk is enabled (determined by `authProvider`), the `withClerk` is applied.
 * - This approach allows for a flexible and dynamic handling of routes based on authentication status and
 * internationalization needs, adhering to the principles and capabilities of Next.js.
 *
 * Global Variables
 * ================
 *
 * - `publicRoutes`: List of public pages that don't require authentication. Currently we rely on `if(!user)` so it set just to "/(.*)", but it can be extended in the future.
 * - `intlMiddleware`: The middleware for internationalization. It is configured based on the `NEXT_PUBLIC_INTL_PROVIDER` env variable.
 *
 * Ratelimit Configuration
 * =======================
 *
 * - `rateMiddleware`: The middleware checks if the `UPSTASH_REDIS_REST_URL` env variable is set. If so, it applies the rate limit to the requests.
 *
 * Bot Detection Implementation
 * ============================
 *
 * - `checkForBots`: The middleware checks if the `CHECK_BOT_ACTIVITY` env variable is set to `true`. If so, it checks the user agent for the presence of the specified words e.g. "bot" or "crawl".
 *  The middleware logs the bot activity and, if specified, takes actions, like blocking or redirecting.
 * Current setup checks for general bots, Lighthouse, Google PageSpeed Insight or similar tools, and logs them as well.
 *
 * Clerk Authentication Configuration
 * ==================================
 *
 * - In the Clerk middleware:
 *   - `publicRoutes`: Defines routes that don't require authentication.
 *   - `beforeAuth`: Executes before the authentication check. It uses `intlMiddleware` to set up internationalization
 *     and also stores the current pathname in the request header. This can be useful for UI-related context, like setting the active menu or tab items.
 *   - `afterAuth`: Executes after the authentication check. It handles redirection for users based on their
 *     authentication status. Unauthenticated users trying to access private routes are redirected to the sign-in page.
 *      If user tries to access a public route without being authenticated, we just do nothing and close middleware.
 * - Please remember that Clerk fully works with third-party services like "Google PageSpeed Insight" only when domain and live keys are used.
 *
 * NextAuth.js Authentication Configuration
 * ========================================
 *
 * - If Clerk authentication is not enabled, the NextAuth.js middleware then is applied, where it conditionally checks if the requested path is a public or private route
 *   using a regular expression that incorporates the locales and publicly accessible pages.
 *   - For public routes, `intlMiddleware` is applied for internationalization.
 *   - For private routes, `withAuth`(withNextAuth) is configured firstly, where it is responsible for authentication and access (user is redirected to auth page if is not authenticated), and then `intlMiddleware` is applied as well.
 *     Note that withAuth's callback is only invoked if the `authorized`. Where jwt token is not configured in auth.ts, private routes will not work.
 *
 * Internationalization Configuration
 * ==================================
 *
 * The intlMiddleware intercepts requests to `/` redirects into one of the configured
 * locales (e.g. `/en-us`). And, in the background, a cookies are set, that will remember
 * locale of last page that the user has visited. Then sent resolved locale to components
 * - locales: A list of all locales that are supported. In the future `locales: locales.map((locale) => locale.code)` possibly can be used instead of just `locales`.
 * - defaultLocale: The default locale that will be used if no locale is specified in the URL
 * - localePrefix / urlMappingStrategy: The strategy for adding the locale prefix to the URL. Currently, it is set to `as-needed`/`rewrite` to fix wrong Stripe redirect, but it can be set to `always` in the future.
 *
 * Middleware's Config()
 * =====================
 *
 * - Matcher entries are linked with logical "or", therefore if one of them matches, the middleware will be invoked.
 * - Skips all paths where the middleware configuration will be ignored.
 * To improve i18n, every dot files was specified (e.g. favicon.ico).
 * Possible addition from next-intl docs: ["/", "/(de|en)/:path*"]
 *
 * For the Consideration
 * =====================
 *
 * import countries from "~/data/other/countries.json";
 *
 * const pathname = request.nextUrl.pathname;
 *
 * const PUBLIC_FILE = /\.(.*)$/;
 * if (
 *   request.nextUrl.pathname.startsWith("/_next") ||
 *   request.nextUrl.pathname.includes("/api/") ||
 *   PUBLIC_FILE.test(request.nextUrl.pathname)
 * ) {
 *   return;
 * }
 *
 * Learning Resources
 * ==================
 *
 * @see https://authjs.dev/guides/basics/securing-pages-and-api-routes
 * @see https://clerk.com/docs/references/nextjs/auth-middleware
 * @see https://console.upstash.com
 * @see https://github.com/amannn/next-intl/blob/main/examples/example-next-13-next-auth/src/middleware.tsx
 * @see https://github.com/amannn/next-intl/blob/main/packages/next-intl/src/middleware/middleware.tsx
 * @see https://github.com/enalmada/nextjs-boilerplate/blob/develop/src/middleware.ts
 * @see https://github.com/GodHermit/survival-manual/blob/main/src/_store/middlewares/settingsMiddleware.ts
 * @see https://github.com/noodle-run/noodle/blob/main/src/middleware.ts
 * @see https://github.com/sanity-io/demo-course-platform/blob/main/web/middleware.ts
 * @see https://github.com/search?q=bot%7Ccrawl%7Cslurp%7Cspider&type=code
 * @see https://github.com/sinamics/ztnet/blob/main/src/middleware.ts
 * @see https://github.com/steven-tey/dub/blob/main/apps/web/middleware.ts
 * @see https://github.com/svobik7/next-roots/blob/master/examples/with-preferred-language-middleware/middleware.ts
 * @see https://github.com/vercel/examples/tree/main/edge-middleware/geolocation
 * @see https://github.com/vercel/next.js/issues/43704
 * @see https://next-intl-docs.vercel.app/docs/getting-started/app-router
 * @see https://next-intl-docs.vercel.app/docs/routing/middleware
 * @see https://next-intl-docs.vercel.app/docs/routing/middleware#example-auth-js
 * @see https://next-intl-docs.vercel.app/docs/routing/middleware#unable-to-find-locale
 * @see https://nextjs.org/docs/app/building-your-application/routing/middleware
 */
