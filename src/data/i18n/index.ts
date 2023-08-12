export const locales = {
  en: () => import("~/data/i18n/en"),
  uk: () => import("~/data/i18n/uk"),
} as const;

type LocalesKeys = keyof typeof locales;

export const localeList = Object.keys(locales) as LocalesKeys[];

export const defaultLocale = "en" as const satisfies keyof typeof locales;
