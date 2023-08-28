import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs";

import { SiteHeader } from "~/islands/navigation/site-header";

interface CartLayoutProps {
  children: React.ReactNode;
}

export default async function CartLayout({ children }: CartLayoutProps) {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  return (
    <div className="relative flex min-h-screen flex-col">
      <SiteHeader user={user} />
      <main className="flex-1">{children}</main>
    </div>
  );
}
