import { clerkMiddleware } from "@clerk/nextjs/server";
import createMiddleware from "next-intl/middleware";

const intlMiddleware = createMiddleware({
  defaultLocale: "en",
  localePrefix: "always",
  locales: ["de", "en", "es", "fa", "fr", "hi", "it", "pl", "tr", "uk", "zh"],
});

export default clerkMiddleware((_auth, req) => {
  return intlMiddleware(req);
});

export const config = {
  // Skip all paths that should not be internationalized
  matcher: [
    "/((?!api|_next|.*\\..*).*)",

    // Exclude files with an extension (.jpg, .js, .css), as these are usually static files.
    // Also exclude files in the _next directory, which are Next.js internal files.
    // "/((?!.+\\.[\\w]+$|_next).*)",

    // Re-include any files in the api or trpc folders, even if they have an extension.
    // "/(api|trpc)(.*)",
  ],
};
