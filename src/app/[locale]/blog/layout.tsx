import type { ReactNode } from "react";

import { SiteFooter } from "~/components/Navigation/SiteFooter";
import { SiteHeader } from "~/components/Navigation/SiteHeader";

type BlogLayoutProps = {
  children: ReactNode;
};

export default function BlogLayout({ children }: BlogLayoutProps) {
  return (
    <>
      <SiteHeader />
      <main className="relative flex min-h-screen flex-1 flex-col">
        {children}
      </main>
      <SiteFooter />
    </>
  );
}
