import {
  deDE,
  enUS,
  esES,
  frFR,
  itIT,
  plPL,
  trTR,
  ukUA,
  zhCN,
} from "@clerk/localizations";

export function getClerkLocale(locale: string) {
  switch (locale) {
    case "de":
      return deDE;
    case "en":
      return enUS;
    case "es":
      return esES;
    case "fr":
      return frFR;
    case "it":
      return itIT;
    case "pl":
      return plPL;
    case "tr":
      return trTR;
    case "uk":
      return ukUA;
    case "zh":
      return zhCN;
    default:
      return enUS;
  }
}
