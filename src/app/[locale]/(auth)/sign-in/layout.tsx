import { SiteFooter } from "~/islands/navigation/site-footer";
import { SiteHeader } from "~/islands/navigation/site-header";

interface SignInLayoutProperties {
  children: React.ReactNode;
}

export default async function SignInLayout({
  children,
}: SignInLayoutProperties) {
  return (
    <>
      <SiteHeader />
      {children}
      <SiteFooter />
    </>
  );
}
