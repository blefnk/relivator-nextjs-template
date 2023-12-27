import type { PropsWithChildren } from "react";
import type { GeneralShellParams, WithChildren } from "~/types";

type GeneralShellProps = PropsWithChildren<GeneralShellParams>;

export function GeneralShell({ children }: WithChildren<GeneralShellProps>) {
  return (
    <main className="container flex min-h-screen flex-1 flex-col gap-6">
      {children}
    </main>
  );
}
