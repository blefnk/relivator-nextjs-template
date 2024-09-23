// Reliverse CMS v0.4.0 — /admin
// ========================================
// @see https://github.com/blefnk/reliverse
//
import type { ReactNode } from "react";

import { redirect } from "next/navigation";

import { auth } from "~/server/queries/user";

type AdminLayoutProps = {
  children: ReactNode;
};

export default async function AdminLayout({ children }: AdminLayoutProps) {
  const session = await auth();

  if (!session) {
    redirect("/auth");
  }

  return <>{children}</>;
}
