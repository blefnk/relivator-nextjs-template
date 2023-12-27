import { SiteFooter } from "~/islands/navigation/site-footer";
import { SiteHeader } from "~/islands/navigation/site-header";

interface SignOutLayoutProperties {
  children: React.ReactNode;
}

export default async function SignOutLayout({
  children,
}: SignOutLayoutProperties) {
  return (
    <>
      <SiteHeader />
      {children}
      <SiteFooter />
    </>
  );
}
