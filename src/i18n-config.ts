export const i18n = {
  defaultLocale: "en",
  locales: ["en", "de", "es", "uk"],
} as const;

export type Locale = (typeof i18n)["locales"][number];
// export type Dictionary = typeof import("./data/lang/i18n/en.json");
