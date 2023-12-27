"use client";

import type { ButtonHTMLAttributes, FC } from "react";
import { signIn, signOut, useSession } from "next-auth/react";

import { ActionButton } from "~/islands/account/action-button";

export const UserLogin: FC<
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children" | "type" | "onClick">
> = (props) => {
  const { data: session } = useSession();

  const handleClick = async () => {
    if (session) await signOut({ callbackUrl: "/" });
    else await signIn();
  };

  return (
    <ActionButton
      type="button"
      variant="small"
      onClick={handleClick}
      {...props}
    >
      {session ? session.user?.name : "signInText"}
    </ActionButton>
  );
};
