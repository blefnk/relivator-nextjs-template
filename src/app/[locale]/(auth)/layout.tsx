import { type PropsWithChildren } from "react";
import { type WithChildren } from "~/types";

import GeneralShell from "~/islands/wrappers/general-shell";

type AuthLayoutProps = PropsWithChildren;

export default function AuthLayout({
  children,
}: WithChildren<AuthLayoutProps>) {
  return <GeneralShell>{children}</GeneralShell>;
}
