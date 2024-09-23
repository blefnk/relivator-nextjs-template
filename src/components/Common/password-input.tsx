"use client";

import type { InputHTMLAttributes } from "react";
import { forwardRef, useState } from "react";

import { Eye, EyeOff } from "lucide-react";

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { cn } from "~/utils/cn";

type PasswordInputProps = {
  className?: string;
} & InputHTMLAttributes<HTMLInputElement>;

const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
      <div className="relative">
        <Input
          className={cn("pr-10", className)}
          ref={ref}
          type={showPassword ? "text" : "password"}
          {...props}
        />
        <Button
          className={`
            absolute right-0 top-0 h-full px-3 py-1

            hover:bg-transparent
          `}
          disabled={props.value === "" || props.disabled}
          size="sm"
          type="button"
          variant="ghost"
          onClick={() => {
            setShowPassword((previous) => !previous);
          }}
        >
          {showPassword ? (
            <EyeOff className="size-4" aria-hidden="true" />
          ) : (
            <Eye className="size-4" aria-hidden="true" />
          )}
          <span className="sr-only">
            {showPassword ? "Hide password" : "Show password"}
          </span>
        </Button>
      </div>
    );
  },
);

PasswordInput.displayName = "PasswordInput";

export { PasswordInput };
