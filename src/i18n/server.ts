import { getRequestConfig } from "next-intl/server";

export default getRequestConfig(async ({ locale }) => ({
  messages: (await import(`~/i18n/messages/${locale}.json`)).default,
}));
