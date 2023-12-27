/**
 * Reliverse CMS v0.3.0 — /dashboard/admin
 * ========================================
 * @see https://github.com/blefnk/reliverse
 */

import { SiteFooter } from "~/islands/navigation/site-footer";
import { SiteHeader } from "~/islands/navigation/site-header";

type MainLayoutProperties = {
  children: React.ReactNode;
};

export default async function CmsMainLayout({
  children,
}: MainLayoutProperties) {
  return (
    <>
      <SiteHeader />
      {children}
      <SiteFooter />
    </>
  );
}
