"use client";

import { forwardRef, type ButtonHTMLAttributes } from "react";
import clsx from "clsx";

type ActionButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "small";
};

export const ActionButton = forwardRef<HTMLButtonElement, ActionButtonProps>(
  function ActionButton({ className, variant, children, ...props }, ref) {
    return (
      <button
        ref={ref}
        className={clsx(
          "rounded border disabled:text-gray-400",
          { "px-4 py-2": !variant || variant === "default" },
          { "px-2 py-1 text-sm": variant === "small" },
          { "border-gray-500": !props.disabled },
          { "border-gray-400": props.disabled },
          className,
        )}
        {...props}
      >
        {children}
      </button>
    );
  },
);
