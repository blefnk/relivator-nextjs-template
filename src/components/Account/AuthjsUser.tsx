import type { Session } from "next-auth";

import type { ReactNode } from "react";

import { authjs } from "~/auth/authjs";
import { clerk } from "~/auth/clerk";
import { authProvider } from "~/auth/provider";

export async function SignedIn(props: {
  children: (props_: {
    user: Session["user"];
  }) => ReactNode;
}) {
  const session = await authjs();

  return session ? (
    <>
      {props.children({
        user: session,
      })}
    </>
  ) : null;
}

export async function SignedOut(props: {
  children: ReactNode;
}) {
  const session = await authjs();

  return session ? null : <>{props.children}</>;
}
