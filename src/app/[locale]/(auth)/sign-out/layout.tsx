import { SiteFooter } from "~/islands/navigation/site-footer";
import { SiteHeader } from "~/islands/navigation/site-header";

interface SignOutLayoutProps {
  children: React.ReactNode;
}

export default async function SignOutLayout({ children }: SignOutLayoutProps) {
  return (
    <>
      <SiteHeader />
      {children}
      <SiteFooter />
    </>
  );
}
