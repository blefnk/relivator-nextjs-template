import type { ReactNode } from "react";

export function GeneralShell({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <main className="container flex min-h-screen flex-1 flex-col gap-6">
      {children}
    </main>
  );
}
