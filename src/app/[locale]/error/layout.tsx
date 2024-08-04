import type { ReactNode } from "react";

import { SiteFooter } from "~/components/Navigation/SiteFooter";
import { SiteHeader } from "~/components/Navigation/SiteHeader";

type MainLayoutProps = {
  children: ReactNode;
};

export default function MiscLayout({ children }: MainLayoutProps) {
  return (
    <>
      <SiteHeader />
      {children}
      <SiteFooter />
    </>
  );
}
