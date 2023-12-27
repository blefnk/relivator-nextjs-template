import React from "react";
import type { Session } from "next-auth";

interface RootLayoutProperties {
  user: Session["user"];
  children: React.ReactNode;
}

export default function DashboardLayout({
  user,
  children,
}: RootLayoutProperties) {
  return (
    <main className="container mx-auto flex min-h-screen flex-col gap-8 bg-gray-900 p-4">
      <div className="flex h-fit flex-col items-center md:flex-row md:justify-between">
        <h1 className="text-4xl font-bold">Dashboard</h1>

        <div className="hidden h-fit items-center gap-2 sm:flex">
          <div className="flex flex-col text-right">
            <p className="text-sm">{user.name}</p>
            <p className="text-xs">{user.email}</p>
          </div>
        </div>
      </div>

      <div>{children}</div>
    </main>
  );
}
