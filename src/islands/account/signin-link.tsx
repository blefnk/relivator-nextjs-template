"use client";

import { HTMLAttributes, type FC } from "react";
import clsx from "clsx";
import { signIn } from "next-auth/react";

export const SigninLink: FC<
  Omit<HTMLAttributes<HTMLButtonElement>, "type" | "onClick">
> = ({ className, children, ...props }) => {
  return (
    <button
      type="button"
      className={clsx("text-blue-600 hover:underline", className)}
      onClick={() => signIn()}
      {...props}
    >
      {children}
    </button>
  );
};
