"use client";

import type { ButtonHTMLAttributes } from "react";
import { forwardRef } from "react";

import clsx from "clsx";

type ActionButtonProps = {
  variant?: "default" | "small";
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const ActionButton = forwardRef<HTMLButtonElement, ActionButtonProps>(
  ({ children, className, variant = "default", ...props }, ref) => (
    <button
      className={clsx(
        `
          rounded border

          disabled:text-gray-400
        `,
        {
          "border-gray-400": props.disabled,
          "border-gray-500": !props.disabled,
          "px-2 py-1 text-sm": variant === "small",
          "px-4 py-2": variant === "default",
        },
        className,
      )}
      ref={ref}
      type="button"
      {...props}
    >
      {children}
    </button>
  ),
);

ActionButton.displayName = "ActionButton";
