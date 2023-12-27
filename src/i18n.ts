import type { AbstractIntlMessages } from "next-intl";
import { getRequestConfig } from "next-intl/server";

// Import all the locale JSON files
import de_de from "~/data/i18n/de-de.json";
import en_us from "~/data/i18n/en-us.json";
import es_es from "~/data/i18n/es-es.json";
import fa_ir from "~/data/i18n/fa-ir.json";
import fr_fr from "~/data/i18n/fr-fr.json";
import hi_in from "~/data/i18n/hi-in.json";
import it_it from "~/data/i18n/it-it.json";
import pl_pl from "~/data/i18n/pl-pl.json";
import tr_tr from "~/data/i18n/tr-tr.json";
import uk_ua from "~/data/i18n/uk-ua.json";

// Create a mapping from locale identifiers
// to the specific imported JSON modules
const localeMessages = {
  "de-de": de_de,
  "en-us": en_us,
  "es-es": es_es,
  "fa-ir": fa_ir,
  "fr-fr": fr_fr,
  "hi-in": hi_in,
  "it-it": it_it,
  "pl-pl": pl_pl,
  "tr-tr": tr_tr,
  "uk-ua": uk_ua,
};

// Exporting default function that asynchronously receives
// the locale object and returns the configuration object
export default getRequestConfig(({ locale }) => {
  // When using Turbopack we enable HMR for locale
  // This approach also works fine without --turbo
  const messages: AbstractIntlMessages =
    localeMessages[locale] || localeMessages["en-us"];
  return { messages };
});

// When not using next dev --turbo, we can simplify imports:
// export default getRequestConfig(async ({ locale }) => ({
//   messages: (await import(`./data/i18n/${locale}.json`)).default,
// }));

/**
 * Learn more and resources
 * ========================
 * @see https://next-intl-docs.vercel.app/docs/environments/server-client-components
 * @see https://github.com/reactjs/rfcs/blob/main/text/0188-server-components.md
 * @see https://next-intl-docs.vercel.app/docs/getting-started/app-router
 * @see https://github.com/amannn/next-intl/issues?q=turbo
 * @see https://github.com/amannn/next-intl/issues/718
 * @see https://github.com/amannn/next-intl/pull/641
 * @see https://github.com/vercel/turbo/issues/2372
 */
