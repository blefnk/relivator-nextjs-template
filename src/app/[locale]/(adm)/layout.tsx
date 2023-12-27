import { SiteFooter } from "~/islands/navigation/site-footer";
import { SiteHeader } from "~/islands/navigation/site-header";

interface MainLayoutProperties {
  children: React.ReactNode;
}

export default async function AdminMainLayout({
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
