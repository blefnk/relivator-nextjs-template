import type { ReactNode } from "react";

import { redirect } from "next/navigation";

import { config } from "@reliverse/core";
import consola from "consola";

import { authProvider } from "~/auth/provider";
import { GeneralShell } from "~/components/Wrappers/GeneralShell";
import { env } from "~/env";

export default function AuthLayout({
  children,
}: {
  children: ReactNode;
}) {
  if (
    authProvider === "clerk" &&
    env.CLERK_SECRET_KEY &&
    env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
  ) {
    return <GeneralShell>{children}</GeneralShell>;
  }

  if (authProvider === "authjs" && env.AUTH_SECRET) {
    return <GeneralShell>{children}</GeneralShell>;
  }

  consola.error(
    `Fill auth config, use .env.example file provided by ${config.framework.name} v${config.framework.version}`,
  );

  return redirect("/");
}
