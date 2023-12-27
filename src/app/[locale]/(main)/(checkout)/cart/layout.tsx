import Link from "next/link";
import { redirect } from "next/navigation";

import { getServerAuthSession } from "~/utils/auth/users";

interface CartLayoutProperties {
  children: React.ReactNode;
}

export default async function CartLayout({ children }: CartLayoutProperties) {
  const user = await getServerAuthSession();
  if (!user) redirect("/auth");

  return (
    <div className="relative flex min-h-screen flex-col">
      <main className="flex-1">{children}</main>
    </div>
  );
}
