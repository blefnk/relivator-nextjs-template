"use client";

import { forwardRef } from "react";

import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";
import { tv } from "tailwind-variants";

export const CheckboxStyles = {
  Root: tv({
    base: "h-5 w-5 rounded-sm border border-primary ring-offset-background transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
  }),
  Indicator: tv({
    base: "grid place-content-center text-current",
  }),
};

export interface CheckboxProps
  extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> {
  onCheckedChange?: (checked: boolean) => void;
}

const Checkbox = forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps
>(({ className, onCheckedChange, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={CheckboxStyles.Root({ className })}
    onCheckedChange={(checked) => {
      onCheckedChange?.(checked === "indeterminate" || checked);
    }}
    {...props}
  >
    <CheckboxPrimitive.Indicator className={CheckboxStyles.Indicator()}>
      <Check className="h-4 w-4 animate-check" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
