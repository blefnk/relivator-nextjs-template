import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { DashboardLayoutClient } from "~/app/dashboard/layout.client";
import { auth } from "~/lib/auth";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/auth/sign-in");
  }

  return <DashboardLayoutClient>{children}</DashboardLayoutClient>;
}
