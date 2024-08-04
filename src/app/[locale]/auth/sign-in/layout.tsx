import type { ReactNode } from "react";

import { SiteFooter } from "~/components/Navigation/SiteFooter";
import { SiteHeader } from "~/components/Navigation/SiteHeader";

type SignInLayoutProps = {
  children: ReactNode;
};

export default function SignInLayout({ children }: SignInLayoutProps) {
  return (
    <>
      <SiteHeader />
      {children}
      <SiteFooter />
    </>
  );
}
