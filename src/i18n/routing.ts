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

export type Locale = (typeof routing.locales)[number];

export const labels = {
  "de-DE": "German",
  "en-US": "English",
  "es-ES": "Spanish",
  "fr-FR": "French",
  "hi-IN": "Hindi",
  "it-IT": "Italian",
  "ms-MY": "Malay",
  "pl-PL": "Polish",
  "tr-TR": "Turkish",
  "uk-UA": "Ukrainian",
  "zh-CN": "Chinese",
};

export const localeFlags: Record<Locale, string> = {
  "de-DE": "🇩🇪",
  "en-US": "🇬🇧",
  "es-ES": "🇪🇸",
  "fr-FR": "🇫🇷",
  "hi-IN": "🇮🇳",
  "it-IT": "🇮🇹",
  "ms-MY": "🇲🇾",
  "pl-PL": "🇵🇱",
  "tr-TR": "🇹🇷",
  "uk-UA": "🇺🇦",
  "zh-CN": "🇨🇳",
};

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
// ..., redirect, useRouter
export const { Link, usePathname, getPathname } = createNavigation(routing);
