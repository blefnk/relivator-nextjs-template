import type { Locale } from "./i18n-config";

// import { i18n } from "./i18n-config";

// @todo Bring back the import when middleware.ts stops crashing because of that
// import "server-only";

// const dictionaryLookup = {
//   en: () => import("./data/lang/i18n/en.json").then((module) => module.default),
//   de: () => import("./data/lang/i18n/de.json").then((module) => module.default),
//   es: () => import("./data/lang/i18n/es.json").then((module) => module.default),
//   uk: () => import("./data/lang/i18n/uk.json").then((module) => module.default),
// };

// export const getDictionary = async (locale: string) => {
//   // Locale may be equal to any value if matcher in middleware.ts returns false

//   if (locale in dictionaryLookup) {
//     return dictionaryLookup[locale as Locale]();
//   }

//   return dictionaryLookup[i18n.defaultLocale]();
// };

export const baseUrlByLocale: Record<Locale, string> = {
  en: "http://bleverse.com" || "http://localhost:3000",
  de: "http://bleverse.com/de" || "http://localhost:3000/de",
  es: "http://bleverse.com/es" || "http://localhost:3000/es",
  uk: "http://bleverse.com/uk" || "http://localhost:3000/uk",

  // en: process.env["BASE_URL_EN"] || "http://localhost:3000",
  // de: process.env["BASE_URL_DE"] || "http://localhost:3000/de",
  // es: process.env["BASE_URL_ES"] || "http://localhost:3000/es",
  // uk: process.env["BASE_URL_UK"] || "http://localhost:3000/uk"
};
