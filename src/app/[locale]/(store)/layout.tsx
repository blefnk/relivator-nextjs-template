import { SiteFooter } from "~/islands/navigation/site-footer";
import { SiteHeader } from "~/islands/navigation/site-header";

interface LobbyLayoutProps {
  children: React.ReactNode;
}

export default async function LobbyLayout({ children }: LobbyLayoutProps) {
  return (
    <>
      <SiteHeader />
      <div className="relative flex min-h-screen flex-col">
        <main className="flex-1">{children}</main>
      </div>
      <SiteFooter />
    </>
  );
}
