import { clerkMiddleware } from "@clerk/nextjs/server";
import {
  defaultLocale,
  localePrefix,
  locales,
  pathnames,
} from "~/../reliverse.i18n";
import createMiddleware from "next-intl/middleware";

const intlMiddleware = createMiddleware({
  defaultLocale,
  locales,
  localePrefix,
  pathnames,
});

export default clerkMiddleware((_auth, req) => {
  return intlMiddleware(req);
});

export const config = {
  matcher: [
    // Enable a redirect to a matching locale at the root
    "/",

    // Set a cookie to remember the previous locale
    // for all requests that have a locale prefix
    // Should be in sync with reliverse.i18n.ts file
    "/(de-DE|en-US|es-ES|fa-IR|fr-FR|hi-IN|it-IT|pl-PL|tr-TR|uk-UA|zh-CN)/:path*",

    // Enable redirects that add missing locales
    // (e.g. `/pathnames` -> `/en/pathnames`)
    "/((?!_next|_vercel|.*\\..*).*)",
  ],
};

// export const config = {
//   // Skip all paths that should not be internationalized
//   matcher: [
//     "/((?!api|_next|.*\\..*).*)",

//     // Exclude files with an extension (.jpg, .js, .css), as these are usually static files.
//     // Also exclude files in the _next directory, which are Next.js internal files.
//     // "/((?!.+\\.[\\w]+$|_next).*)",

//     // Re-include any files in the api or trpc folders, even if they have an extension.
//     // "/(api|trpc)(.*)",
//   ],
// };
