"use client";

import type { ComponentPropsWithoutRef, ComponentRef } from "react";
import { forwardRef } from "react";

import type { VariantProps } from "class-variance-authority";

import { cn } from "@/utils/reliverse/cn";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cva } from "class-variance-authority";

const labelVariants = cva(`
  text-sm font-medium leading-none

  peer-disabled:cursor-not-allowed peer-disabled:opacity-70
`);

const Label = forwardRef<
  ComponentRef<typeof LabelPrimitive.Root>,
  ComponentPropsWithoutRef<typeof LabelPrimitive.Root> &
    VariantProps<typeof labelVariants>
>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root
    className={cn(labelVariants(), className)}
    ref={ref}
    {...props}
  />
));

Label.displayName = LabelPrimitive.Root.displayName;

export { Label };
