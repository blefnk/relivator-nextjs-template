import { type PropsWithChildren } from "react";
import { type WithChildren } from "~/types";

import { GeneralShell } from "~/islands/wrappers/general-shell";

type AuthLayoutProperties = PropsWithChildren;

export default function AuthLayout({
  children,
}: WithChildren<AuthLayoutProperties>) {
  return <GeneralShell>{children}</GeneralShell>;
}
