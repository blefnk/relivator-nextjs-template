import { redirect } from "next/navigation";
import * as React from "react";

import { getCachedUser } from "~/server/queries/user";

export default async function CartLayout({
  children,
}: React.PropsWithChildren) {
  const user = await getCachedUser();

  if (!user) {
    redirect("/signin");
  }

  return (
    <div className="relative flex min-h-screen flex-col">
      <main className="flex-1">{children}</main>
    </div>
  );
}
