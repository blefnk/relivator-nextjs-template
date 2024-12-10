export const locales = [
  "en",
  "de",
  "es",
  "fr",
  "hi",
  "it",
  "ms",
  "pl",
  "tr",
  "uk",
  "zh",
] as const;

export type Locale = (typeof locales)[number];

export const labels = {
  de: "German",
  en: "English",
  es: "Spanish",
  fr: "French",
  hi: "Hindi",
  it: "Italian",
  ms: "Malay",
  pl: "Polish",
  tr: "Turkish",
  uk: "Ukrainian",
  zh: "Chinese",
};

export const localeFlags: Record<Locale, string> = {
  de: "🇩🇪",
  en: "🇬🇧",
  es: "🇪🇸",
  fr: "🇫🇷",
  hi: "🇮🇳",
  it: "🇮🇹",
  ms: "🇲🇾",
  pl: "🇵🇱",
  tr: "🇹🇷",
  uk: "🇺🇦",
  zh: "🇨🇳",
};
