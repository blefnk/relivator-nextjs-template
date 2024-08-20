"use client";

import type { InputHTMLAttributes } from "react";
import { forwardRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/utils/reliverse/cn";
import { Eye, EyeOff } from "lucide-react";

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
          onClick={() => {
            setShowPassword((previous) => !previous);
          }}
          size="sm"
          type="button"
          variant="ghost"
        >
          {showPassword ? (
            <EyeOff aria-hidden="true" className="size-4" />
          ) : (
            <Eye aria-hidden="true" className="size-4" />
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
