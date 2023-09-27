/**
 * This is an optional `page.tsx`.
 * Just used to ensure if locale cookie is not set
 * then we redirect manually to the default locale.
 * Please go to the "app/[locale]/page.tsx" file.
 */

import { redirect } from "next/navigation";
import { defaultLocale } from "~/i18n/locales";

export default function RootPage() {
  redirect(`/${defaultLocale}`);
}
