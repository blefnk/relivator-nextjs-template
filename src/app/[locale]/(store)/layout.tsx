import { currentUser } from "@clerk/nextjs";

import { SiteFooter } from "~/islands/navigation/site-footer";
import { SiteHeader } from "~/islands/navigation/site-header";

interface LobbyLayoutProps {
  children: React.ReactNode;
}

export default async function LobbyLayout({ children }: LobbyLayoutProps) {
  const user = await currentUser();

  return (
    <div className="relative flex min-h-screen flex-col">
      <SiteHeader user={user} border sticky />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}
