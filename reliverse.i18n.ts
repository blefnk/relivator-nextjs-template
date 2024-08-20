import type { LocalePrefix, Pathnames } from "next-intl/routing";

// @see i18n-ally.localesPaths in settings.json
export const i18nTheme = "default" as "default" | "ecommerce";

// @see matcher in middleware.ts
export const locales = [
  "de-DE",
  "en-US",
  "es-ES",
  "fa-IR",
  "fr-FR",
  "hi-IN",
  "it-IT",
  "pl-PL",
  "tr-TR",
  "uk-UA",
  "zh-CN",
] as const;

export const localePrefix: LocalePrefix<typeof locales> = "always";

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en-US";

export const pathnames: Pathnames<typeof locales> = {
  "/": "/",
  "/donate": {
    "en-US": "/donate",
    "de-DE": "/spenden",
    "es-ES": "/donar",
    "fa-IR": "/کمک",
    "fr-FR": "/don",
    "hi-IN": "/दान",
    "it-IT": "/donare",
    "pl-PL": "/donate",
    "tr-TR": "/bağış",
    "uk-UA": "/донат",
    "zh-CN": "/donate",
  },
  "/pathnames": {
    "en-US": "/pathnames",
    "de-DE": "/pfadnamen",
    "es-ES": "/nombres-de-ruta",
    "fa-IR": "/نام‌های-مسیر",
    "fr-FR": "/noms-de-chemin",
    "hi-IN": "/पथनाम",
    "it-IT": "/nomi-percorso",
    "pl-PL": "/nazwy-ścieżek",
    "tr-TR": "/yollar",
    "uk-UA": "/шляхи",
    "zh-CN": "/pathnames",
  },
};

export const labels = {
  "de-DE": "German",
  "en-US": "English",
  "es-ES": "Spanish",
  "fa-IR": "Persian",
  "fr-FR": "French",
  "hi-IN": "Hindi",
  "it-IT": "Italian",
  "pl-PL": "Polish",
  "tr-TR": "Turkish",
  "uk-UA": "Ukrainian",
  "zh-CN": "Chinese",
};

export const localeFlags: {
  [key in Locale]: string;
} = {
  "de-DE": "🇩🇪",
  "en-US": "🇬🇧",
  "es-ES": "🇪🇸",
  "fa-IR": "🇮🇷",
  "fr-FR": "🇫🇷",
  "hi-IN": "🇮🇳",
  "it-IT": "🇮🇹",
  "pl-PL": "🇵🇱",
  "tr-TR": "🇹🇷",
  "uk-UA": "🇺🇦",
  "zh-CN": "🇨🇳",
};
