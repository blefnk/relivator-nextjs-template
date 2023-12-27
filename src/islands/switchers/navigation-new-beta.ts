/**
 * !! new beta version of navigation.ts - currently not used !!
 *
 * This module provides utilities for managing navigation and
 * locale information in Next.js application using next-intl.
 *
 * @module src/localization-main.tsx
 *
 * @see https://next-intl-docs.vercel.app/docs/routing/navigation
 * @see https://github.com/meienberger/runtipi/blob/develop/src/shared/internationalization/locales.ts
 */

import {
  createLocalizedPathnamesNavigation,
  createSharedPathnamesNavigation,
  type Pathnames,
} from "next-intl/navigation";

export type Locale = {
  code: string;
  flag: string;
  label: string;
};

// App locales with flags and human-readable labels
// @see https://flagicons.lipis.dev (to find flags)
export const locales: Locale[] = [
  { code: "en-us", flag: "fi-gb", label: "English" },
  { code: "de-de", flag: "fi-de", label: "German" },
  { code: "es-es", flag: "fi-es", label: "Spanish" },
  { code: "fa-ir", flag: "fi-ir", label: "Persian" },
  { code: "fr-fr", flag: "fi-fr", label: "French" },
  { code: "hi-in", flag: "fi-in", label: "Hindi" },
  { code: "it-it", flag: "fi-it", label: "Italian" },
  { code: "pl-pl", flag: "fi-pl", label: "Polish" },
  { code: "tr-tr", flag: "fi-tr", label: "Turkish" },
  { code: "uk-ua", flag: "fi-ua", label: "Ukrainian" },
];

// First line of "locales" acts as default application locale code
export const defaultLocale = locales[0]?.code ?? ("en-us" as const);

// Navigation utilities configured for the defined locales
export const { Link, redirect, usePathname, useRouter } =
  createSharedPathnamesNavigation({
    locales: locales.map((locale) => locale.code),
  });

// === NEXT-INTERNATIONAL ===

/* export const localesNI = {
  "en-us": () => import("~/data/i18n/en-us.json"),
  "uk-ua": () => import("~/data/i18n/uk-ua.json"),
} as const;

type LocalesKeys = keyof typeof locales;

export const localeListNI = Object.keys(locales) as LocalesKeys[];

const allLocales = {
  "en-us": "en-us",
  "uk-ua": "uk-ua",
} as const;

export const LOCALES_NI: typeof allLocales = allLocales;

export const defaultLocaleNI = "en-us" as const satisfies keyof typeof localesNI; */

// === DEPRECATED SNIPPET ===

// Default locale for the application.
// export const defaultLocale = "en-us" as const;

// Supported locales.
/* export const locales = [
  "de-de",
  "en-us",
  "es-es",
  "fa-ir",
  "fr-fr",
  "hi-in",
  "it-it",
  "pl-pl",
  "tr-tr",
  "uk-ua",
] as const; */

// Labels for each supported locale, used for displaying human-readable names.
/* export const labels = {
  "de-de": "German",
  "en-us": "English",
  "es-es": "Spanish",
  "fa-ir": "Persian",
  "fr-fr": "French",
  "hi-in": "Hindi",
  "it-it": "Italian",
  "pl-pl": "Polish",
  "tr-tr": "Turkish",
  "uk-ua": "Ukrainian",
} as const; */

// Type representing valid locale strings.
// export type Locale = (typeof locales)[number];

// Ensure every locale has a label.
/* if (process.env.NODE_ENV === "development") {
  locales.forEach((locale) => {
    if (!labels[locale]) {
      console.warn(`No label found for locale: ${locale}`);
    }
  });
} */
