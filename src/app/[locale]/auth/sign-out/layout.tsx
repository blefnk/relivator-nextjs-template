import type { ReactNode } from "react";

import { SiteFooter } from "~/components/Navigation/SiteFooter";
import { SiteHeader } from "~/components/Navigation/SiteHeader";

type SignOutLayoutProps = {
  children: ReactNode;
};

export default function SignOutLayout({ children }: SignOutLayoutProps) {
  return (
    <>
      <SiteHeader />
      {children}
      <SiteFooter />
    </>
  );
}
