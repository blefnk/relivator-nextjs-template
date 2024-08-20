import type { ReactNode } from "react";

import { redirect } from "next/navigation";

import { authjs } from "~/auth/authjs";
import { clerk } from "~/auth/clerk";
import { authProvider } from "~/auth/provider";

type CartLayoutProps = {
  children: ReactNode;
};

export default async function CartLayout({ children }: CartLayoutProps) {
  const user = authProvider === "clerk" ? await clerk() : await authjs();

  if (!user) {
    redirect("/auth");
  }

  return (
    <div className="relative flex min-h-screen flex-col">
      <main className="flex-1">{children}</main>
    </div>
  );
}
