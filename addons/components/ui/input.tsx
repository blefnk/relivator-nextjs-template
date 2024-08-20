"use client";

import type { InputHTMLAttributes } from "react";
import { forwardRef } from "react";

import { cn } from "@/utils/reliverse/cn";

type InputProps = InputHTMLAttributes<HTMLInputElement>;

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => (
    <input
      className={cn(
        `
          flex h-10 w-full rounded-lg border border-input bg-background px-3
          py-2 text-sm ring-offset-background

          disabled:cursor-not-allowed disabled:opacity-50

          file:border-0 file:bg-transparent file:text-sm file:font-medium

          focus-visible:outline-none focus-visible:ring-2
          focus-visible:ring-ring focus-visible:ring-offset-2

          placeholder:text-muted-foreground
        `,
        className,
      )}
      ref={ref}
      type={type}
      {...props}
    />
  ),
);

Input.displayName = "Input";

export { Input };
