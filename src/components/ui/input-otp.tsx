"use client";

import type { ComponentPropsWithoutRef, ElementRef } from "react";
import { forwardRef, useContext } from "react";

import { DashIcon } from "@radix-ui/react-icons";
import { OTPInput, OTPInputContext } from "input-otp";

import { cn } from "~/utils/cn";

const InputOTP = forwardRef<
  ElementRef<typeof OTPInput>,
  ComponentPropsWithoutRef<typeof OTPInput>
>(({ className, containerClassName, ...props }, ref) => (
  <OTPInput
    className={cn("disabled:cursor-not-allowed", className)}
    ref={ref}
    containerClassName={cn(
      `
        flex items-center gap-2

        has-[:disabled]:opacity-50
      `,
      containerClassName,
    )}
    {...props}
  />
));

InputOTP.displayName = "InputOTP";

const InputOTPGroup = forwardRef<
  ElementRef<"div">,
  ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => (
  <div className={cn("flex items-center", className)} ref={ref} {...props} />
));

InputOTPGroup.displayName = "InputOTPGroup";

const InputOTPSlot = forwardRef<
  ElementRef<"div">,
  { index: number } & ComponentPropsWithoutRef<"div">
>(({ className, index, ...props }, ref) => {
  const inputOTPContext = useContext(OTPInputContext);
  const { char, hasFakeCaret, isActive } = inputOTPContext.slots[index] || {};

  return (
    <div
      className={cn(
        `
          relative flex size-9 items-center justify-center border-y border-r
          border-input text-sm shadow-sm transition-all

          first:rounded-l-md first:border-l

          last:rounded-r-md
        `,
        isActive && "z-10 ring-1 ring-ring",
        className,
      )}
      ref={ref}
      {...props}
    >
      {char}
      {hasFakeCaret && (
        <div
          className={`
            pointer-events-none absolute inset-0 flex items-center
            justify-center
          `}
        >
          <div
            className={`
            h-4 w-px animate-caret-blink bg-foreground duration-1000
          `}
          />
        </div>
      )}
    </div>
  );
});

InputOTPSlot.displayName = "InputOTPSlot";

const InputOTPSeparator = forwardRef<
  ElementRef<"div">,
  ComponentPropsWithoutRef<"div">
>(({ ...props }, ref) => (
  <div ref={ref} role="separator" {...props}>
    <DashIcon />
  </div>
));

InputOTPSeparator.displayName = "InputOTPSeparator";

export { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot };
