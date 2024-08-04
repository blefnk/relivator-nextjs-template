import { notFound } from "next/navigation";

import type { AbstractIntlMessages } from "next-intl";

import de_de from "~/../messages/de.json";
import en_us from "~/../messages/en.json";
import es_es from "~/../messages/es.json";
import fa_ir from "~/../messages/fa.json";
import fr_fr from "~/../messages/fr.json";
import hi_in from "~/../messages/hi.json";
import it_it from "~/../messages/it.json";
import pl_pl from "~/../messages/pl.json";
import tr_tr from "~/../messages/tr.json";
import uk_ua from "~/../messages/uk.json";
import zh_cn from "~/../messages/zh.json";
import deepmerge from "deepmerge";
import { getRequestConfig } from "next-intl/server";

import { locales } from "~/navigation";

// Create a mapping from locale identifiers
// to the specific imported JSON modules
const localesList = {
  de: de_de,
  en: en_us,
  es: es_es,
  fa: fa_ir,
  fr: fr_fr,
  hi: hi_in,
  it: it_it,
  pl: pl_pl,
  tr: tr_tr,
  uk: uk_ua,
  zh: zh_cn,
} as const;

// Exporting default function that asynchronously receives
// the locale object and returns the configuration object
export default getRequestConfig(async ({ locale }) => {
  if (!locales.includes(locale)) {
    notFound();
  }

  // Load messages for the current locale
  const primaryMessages: AbstractIntlMessages =
    // @ts-expect-error TODO: fix
    (await localesList[locale]) || localesList.en;

  // Load messages for the fallback locale
  const fallbackMessages: AbstractIntlMessages = localesList.en;

  // Merge primary locale messages with fallback locale messages
  const messages = deepmerge(fallbackMessages, primaryMessages);

  return {
    messages,
  };
});
