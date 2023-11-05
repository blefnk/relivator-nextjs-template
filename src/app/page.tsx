import { redirect } from "next/navigation";
import { defaultLocale } from "~/navigation";

/**
 * This page component acts as a root-level page for locale redirection.
 * If the locale cookie isn't set, it redirects the user to the default one.
 * For the actual content, please visit the "app/[locale]/page.tsx" page component.
 */
export default function RootPage() {
  // return <>debug_mode_enabled</>;
  redirect(defaultLocale);
}
