import { SiteFooter } from "~/islands/navigation/site-footer";
import { SiteHeader } from "~/islands/navigation/site-header";

interface SignUpLayoutProps {
  children: React.ReactNode;
}

export default async function SignUpLayout({ children }: SignUpLayoutProps) {
  return (
    <>
      <SiteHeader />
      {children}
      <SiteFooter />
    </>
  );
}
