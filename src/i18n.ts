/**
 * @see https://next-intl-docs.vercel.app/docs/configuration
 * @see https://next-intl-docs.vercel.app/docs/configuration#messages
 * @see https://next-intl-docs.vercel.app/docs/getting-started/app-router-server-components#i18nts
 */

import { getRequestConfig } from "next-intl/server";

// Exporting default function that asynchronously receives
// the `locale` object and returns a configuration object
export default getRequestConfig(async ({ locale }) => ({
  messages: (await import(`./data/i18n/${locale}.json`)).default,
}));
