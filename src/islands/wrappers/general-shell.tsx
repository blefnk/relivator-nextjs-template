import { PropsWithChildren } from "react";
import { WithChildren, type GeneralShellParams } from "~/types";

type GeneralShellProps = PropsWithChildren<GeneralShellParams>;

export function GeneralShell({ children }: WithChildren<GeneralShellProps>) {
  return (
    <main className="container gap-6 flex min-h-screen flex-col flex-1">
      {children}
    </main>
  );
}
