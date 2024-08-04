import { redirect } from "next/navigation";

import { defaultLocale } from "~/navigation";

// Redirects to ./[locale]/page.tsx
export default function RootPage() {
  if (defaultLocale) {
    return redirect(defaultLocale);
  }

  return <>root</>;
}
