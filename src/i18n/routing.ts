import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: [
    "de-DE",
    "en-US",
    "es-ES",
    "fr-FR",
    "hi-IN",
    "it-IT",
    "ms-MY",
    "pl-PL",
    "tr-TR",
    "uk-UA",
    "zh-CN",
  ],

  // Used when no locale matches
  defaultLocale: "en-US",
});

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
// ..., redirect, useRouter
export const { Link, usePathname, getPathname } = createNavigation(routing);
