import { redirect } from "next/navigation";

import { getServerAuthSession } from "~/utils/users";

interface CheckoutLayoutProps {
  children: React.ReactNode;
}

export default async function CheckoutLayout({
  children,
}: CheckoutLayoutProps) {
  const user = await getServerAuthSession();
  if (!user) redirect("/auth");

  return <main>{children}</main>;
}
