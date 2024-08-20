import type { ReactNode } from "react";

import { redirect } from "next/navigation";

import { authjs } from "~/auth/authjs";
import { clerk } from "~/auth/clerk";
import { authProvider } from "~/auth/provider";

type CheckoutLayoutProps = {
  children: ReactNode;
};

export default async function CheckoutLayout({
  children,
}: CheckoutLayoutProps) {
  const user = authProvider === "clerk" ? await clerk() : await authjs();

  if (!user) {
    redirect("/auth");
  }

  return <main>{children}</main>;
}
