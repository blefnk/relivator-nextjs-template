import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import { authOptions } from "~/server/auth";

interface CheckoutLayoutProps {
  children: React.ReactNode;
}

export default async function CheckoutLayout({
  children,
}: CheckoutLayoutProps) {
  const session = await getServerSession(authOptions());

  if (!session?.user) {
    redirect("/sign-in");
  }

  return <main>{children}</main>;
}
