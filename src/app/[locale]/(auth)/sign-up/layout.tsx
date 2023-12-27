import { SiteFooter } from "~/islands/navigation/site-footer";
import { SiteHeader } from "~/islands/navigation/site-header";

interface SignUpLayoutProperties {
  children: React.ReactNode;
}

export default async function SignUpLayout({
  children,
}: SignUpLayoutProperties) {
  return (
    <>
      <SiteHeader />
      {children}
      <SiteFooter />
    </>
  );
}
