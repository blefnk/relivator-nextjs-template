import { redirect } from "next/navigation";

import { getServerAuthSession } from "~/utils/auth/users";

interface CheckoutLayoutProperties {
  children: React.ReactNode;
}

export default async function CheckoutLayout({
  children,
}: CheckoutLayoutProperties) {
  const user = await getServerAuthSession();
  if (!user) redirect("/auth");

  return <main>{children}</main>;
}
