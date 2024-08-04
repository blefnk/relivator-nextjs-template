"use client";

import type { ReactElement } from "react";

import { useTranslations } from "next-intl";

type IntlMessageProps = {
  id: unknown;
  variables?: Record<string, number | string>;
};

// @deprecated # Stable next-intl 3.1.0 was released. Just use useTranslations() everywhere.
// IntlMessage component to render translated strings on the Server Components,
// until the native solution [before 3.1.0] get us errors; uses the provided id and variables.
// The implementation is probably not completely good at the moment,
// at least we're losing the functionality of 'i18n Ally' extension.
// @param id.id - The translation key.
// @param variables.id - Optional dynamic values for the translation string.
// @param variables.variables - Optional dynamic values for the translation string.
// @returns The translated string or a fallback if the key is not found.
export function IntlMessage({
  id,
  variables,
}: IntlMessageProps): null | ReactElement {
  const t = useTranslations();
  let translation: string;

  // Trying to translate by
  // using the provided id.
  try {
    translation = t(id, variables);

    // Return the translated string.
    return <>{translation}</>;
  } catch {
    // We can return a general
    // fallback here or null.
    return null;
  }
}
