import type React from "react";

import { getCurrentUserOrRedirect } from "~/lib/auth";

export default async function AdminLayout({
  children,
}: { children: React.ReactNode }) {
  await getCurrentUserOrRedirect();

  // TODO: implement admin check
  // const user = await getCurrentUserOrRedirect();
  // if (!user?.isAdmin) {
  //   redirect("/");
  // }

  return (
    <div className="container mx-auto py-10">
      <h1 className="mb-6 text-3xl font-bold">Admin Dashboard</h1>
      {children}
    </div>
  );
}
