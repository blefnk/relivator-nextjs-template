// Reliverse CMS v0.4.0 — /admin
// ========================================
// @see https://github.com/blefnk/reliverse
//
import type { ReactNode } from "react";

import { redirect } from "next/navigation";

import { authProvider } from "~/../reliverse.config";

import { authjs } from "~/auth/authjs";
import { clerk } from "~/auth/clerk";

type AdminLayoutProps = {
  children: ReactNode;
};

export default async function AdminLayout({ children }: AdminLayoutProps) {
  const session = authProvider === "clerk" ? await clerk() : await authjs();

  if (!session) {
    redirect("/auth");
  }

  return <>{children}</>;
}
