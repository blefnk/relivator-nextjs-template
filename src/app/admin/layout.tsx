import { headers } from "next/headers";
import { redirect } from "next/navigation";
import type React from "react";
import { auth } from "~/lib/auth";

export default async function AdminLayout({
  children,
}: { children: React.ReactNode }) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/");
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      {children}
    </div>
  );
}
