export const locales = {
  en: () => import("~/data/i18n/dicts/en"),
  uk: () => import("~/data/i18n/dicts/uk"),
} as const;

type LocalesKeys = keyof typeof locales;

export const localeList = Object.keys(locales) as LocalesKeys[];

const allLocales = {
  en: "en",
  uk: "uk",
} as const;

export const LOCALES: typeof allLocales = allLocales;

export const defaultLocale = "en" as const satisfies keyof typeof locales;
