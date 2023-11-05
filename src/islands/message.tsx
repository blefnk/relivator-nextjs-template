"use client";

import { ReactElement } from "react";
import { useTranslations } from "next-intl";

type IntlMessageProps = {
  id: any;
  variables?: Record<string, string | number>;
};

/**
 * IntlMessage component to render translated strings on the Server Components,
 * until the native solution get us errors; uses the provided id and variables.
 *
 * The implementation is probably not completely good at the moment,
 * at least we're losing the functionality of 'i18n Ally' extension.
 *
 * @param id - The translation key.
 * @param variables - Optional dynamic values for the translation string.
 * @returns The translated string or a fallback if the key is not found.
 */
export function IntlMessage({
  id,
  variables,
}: IntlMessageProps): ReactElement | null {
  const t = useTranslations();

  // Trying to translate using the provided id.
  let translation;
  try {
    translation = t(id);
  } catch (error) {
    // We can provide here a general fallback or return null.
    return null;
  }

  // Returning the translated string.
  return <>{translation}</>;
}
