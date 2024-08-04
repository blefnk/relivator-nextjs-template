export const locales = [
  "de",
  "en",
  "es",
  "fa",
  "fr",
  "hi",
  "it",
  "pl",
  "tr",
  "uk",
  "zh",
] as const;

// Labels for each supported locale, used
// for displaying human-readable names
const labels = {
  de: "German",
  en: "English",
  es: "Spanish",
  fa: "Persian",
  fr: "French",
  hi: "Hindi",
  it: "Italian",
  pl: "Polish",
  tr: "Turkish",
  uk: "Ukrainian",
  zh: "Chinese",
} as const;

export const getLocaleLabels = (translateLanguages: boolean) => {
  if (translateLanguages) {
    return {
      de: "Deutsch",
      en: "English",
      es: "Español",
      fa: "فارسی",
      fr: "Français",
      hi: "हिन्दी",
      it: "Italiano",
      pl: "Polski",
      tr: "Türkçe",
      uk: "Українська",
      zh: "中文",
    } as const;
  }

  return labels;
};

// Type representing valid locale strings
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en" as const;

export const localeFlags: {
  [key in Locale]: string;
} = {
  de: "🇩🇪",
  en: "🇬🇧",
  es: "🇪🇸",
  fa: "🇮🇷",
  fr: "🇫🇷",
  hi: "🇮🇳",
  it: "🇮🇹",
  pl: "🇵🇱",
  tr: "🇹🇷",
  uk: "🇺🇦",
  zh: "🇨🇳",
};
