"use client";

import type { ComponentPropsWithoutRef, ElementRef } from "react";
import { forwardRef } from "react";

import { cn } from "@/utils/reliverse/cn";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";

const TooltipProvider = TooltipPrimitive.Provider;

const Tooltip = TooltipPrimitive.Root;

const TooltipTrigger = TooltipPrimitive.Trigger;

const TooltipContent = forwardRef<
  ElementRef<typeof TooltipPrimitive.Content>,
  ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Content
    className={cn(
      `
        z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm
        text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95

        data-[side=bottom]:slide-in-from-top-2

        data-[side=left]:slide-in-from-right-2

        data-[side=right]:slide-in-from-left-2

        data-[side=top]:slide-in-from-bottom-2

        data-[state=closed]:animate-out data-[state=closed]:fade-out-0
        data-[state=closed]:zoom-out-95
      `,
      className,
    )}
    ref={ref}
    sideOffset={sideOffset}
    {...props}
  />
));

TooltipContent.displayName = TooltipPrimitive.Content.displayName;

export { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger };
