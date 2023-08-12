import { createI18nServer } from "next-international/server";

import { locales } from "~/data/i18n";

export const { getI18n, getScopedI18n, getStaticParams } =
  createI18nServer(locales);
