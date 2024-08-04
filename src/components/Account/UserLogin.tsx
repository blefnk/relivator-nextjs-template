"use client";

import type { ButtonHTMLAttributes, FC } from "react";

import { signIn, signOut, useSession } from "next-auth/react";

import { ActionButton } from "~/components/Account/ActionButton";

export const UserLogin: FC<
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children" | "onClick" | "type">
> = (props) => {
  const { data: session } = useSession();

  const handleClick = async () => {
    if (session) {
      await signOut({
        callbackUrl: "/",
      });
    } else {
      await signIn();
    }
  };

  return (
    <ActionButton
      onClick={handleClick}
      type="button"
      variant="small"
      {...props}
    >
      {session ? session.user?.name : "signInText"}
    </ActionButton>
  );
};
