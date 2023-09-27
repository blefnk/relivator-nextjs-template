import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import { authOptions } from "~/server/auth";

interface CartLayoutProps {
  children: React.ReactNode;
}

export default async function CartLayout({ children }: CartLayoutProps) {
  const session = await getServerSession(authOptions());

  if (!session) {
    redirect("/sign-in");
  }

  return (
    <div className="relative flex min-h-screen flex-col">
      <main className="flex-1">{children}</main>
    </div>
  );
}
