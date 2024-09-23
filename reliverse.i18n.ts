import type { LocalePrefix, Pathnames } from "next-intl/routing";

// @see matcher in middleware.ts
export const locales = [
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
] as const;

export const localePrefix: LocalePrefix<typeof locales> = "as-needed";

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en-US";

export const pathnames: Pathnames<typeof locales> = {
  "/": "/",
  "/donate": {
    "de-DE": "/spenden",
    "en-US": "/donate",
    "es-ES": "/donar",
    "fr-FR": "/don",
    "hi-IN": "/दान",
    "it-IT": "/donare",
    "ms-MY": "/derma",
    "pl-PL": "/donate",
    "tr-TR": "/bağış",
    "uk-UA": "/донат",
    "zh-CN": "/donate",
  },
  "/pathnames": {
    "de-DE": "/pfadnamen",
    "en-US": "/pathnames",
    "es-ES": "/nombres-de-ruta",
    "fr-FR": "/noms-de-chemin",
    "hi-IN": "/पथनाम",
    "it-IT": "/nomi-percorso",
    "ms-MY": "/nama-laluan",
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
  "fr-FR": "French",
  "hi-IN": "Hindi",
  "it-IT": "Italian",
  "ms-MY": "Malay",
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
  "fr-FR": "🇫🇷",
  "hi-IN": "🇮🇳",
  "it-IT": "🇮🇹",
  "ms-MY": "🇲🇾",
  "pl-PL": "🇵🇱",
  "tr-TR": "🇹🇷",
  "uk-UA": "🇺🇦",
  "zh-CN": "🇨🇳",
};
