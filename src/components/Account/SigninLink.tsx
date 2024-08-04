"use client";

import type { FC, HTMLAttributes } from "react";

import clsx from "clsx";
import { signIn } from "next-auth/react";

export const SigninLink: FC<
  Omit<HTMLAttributes<HTMLButtonElement>, "onClick" | "type">
> = ({ children, className, ...props }) => (
  <button
    className={clsx(
      `
        text-blue-600

        hover:underline
      `,
      className,
    )}
    onClick={() => signIn()}
    type="button"
    {...props}
  >
    {children}
  </button>
);
