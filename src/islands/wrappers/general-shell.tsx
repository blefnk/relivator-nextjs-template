import { PropsWithChildren } from "react";
import { WithChildren, type GeneralShellParams } from "~/types";

import { Shell } from "./shell-variants";

type GeneralShellProps = PropsWithChildren<GeneralShellParams>;

export default function GeneralShell({
  children,
}: WithChildren<GeneralShellProps>) {
  return (
    <main className="flex min-h-screen flex-col flex-1">
      <Shell className="container gap-12 max-w-4xl">{children}</Shell>
    </main>
  );
}
