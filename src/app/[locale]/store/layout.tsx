import type { ReactNode } from "react";

import { SiteFooter } from "~/components/Navigation/SiteFooter";
import { SiteHeader } from "~/components/Navigation/SiteHeader";

type CatalogueLayoutProps = {
  children: ReactNode;
};

export default function CatalogueLayout({ children }: CatalogueLayoutProps) {
  return (
    <>
      <SiteHeader />
      <div className="relative flex min-h-screen flex-col">
        <main className="flex-1">{children}</main>
      </div>
      <SiteFooter />
    </>
  );
}
