import { redirect } from "next/navigation";

import { useLocale } from "next-intl";

// import consola from "consola";
// import { notFound } from "next/navigation";
export default function CatchAllPage() {
  // TODO: fix locale switcher url issue
  // notFound();
  // "✋ 404 (src/app/not-found.tsx ➞ [...rest]/page.tsx ➞ CatchAllPage())",
  // consola.info("✋ 404");
  const locale = useLocale();

  redirect(`/${locale}`);
}
