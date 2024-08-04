import type { ReactNode } from "react";

import { SiteFooter } from "~/components/Navigation/SiteFooter";
import { SiteHeader } from "~/components/Navigation/SiteHeader";

export default function ProductsLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <SiteHeader />
      <main className="relative flex min-h-screen flex-col">{children}</main>
      <SiteFooter />
    </>
  );
}
