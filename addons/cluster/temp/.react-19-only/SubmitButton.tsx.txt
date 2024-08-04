"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";
import { useFormStatus } from "react-dom";

import { Spinner } from "@radix-ui/themes";
import { twMerge } from "tailwind-merge";

// import { createRoot } from "react-dom/client";
const isString = (a: unknown): a is string => typeof a === "string";

type SubmitButtonProps = {
  children: ReactNode;
  icon?: ReactNode;
  type?: never;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export function SubmitButton(props: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <button
      {...props}
      className={twMerge(
        `
          flex w-full cursor-pointer items-center justify-center gap-2
          rounded-full border border-slate-700 bg-slate-900/80 px-4 py-2 text-sm
          text-slate-200 transition-colors

          disabled:pointer-events-none disabled:opacity-50

          hover:border-slate-500
        `,
        props.className,
      )}
      disabled={props.disabled || pending}
      type="submit"
    >
      {props.icon ? (
        <>
          <Spinner loading={pending} size="2">
            {props.icon}
          </Spinner>
          {isString(props.children) ? (
            <span>{props.children}</span>
          ) : (
            props.children
          )}
        </>
      ) : (
        <Spinner loading={pending} size="2">
          {props.children}
        </Spinner>
      )}
    </button>
  );
}
