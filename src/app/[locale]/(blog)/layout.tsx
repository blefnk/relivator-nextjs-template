import { SiteFooter } from "~/islands/navigation/site-footer";
import { SiteHeader } from "~/islands/navigation/site-header";

interface BlogLayoutProperties {
  children: React.ReactNode;
}

export default async function BlogLayout({ children }: BlogLayoutProperties) {
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
