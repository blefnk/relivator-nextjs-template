"use client";

import type { ComponentPropsWithoutRef, ElementRef } from "react";
import { forwardRef } from "react";

import { cn } from "@/utils/reliverse/cn";
import * as HoverCardPrimitive from "@radix-ui/react-hover-card";

const HoverCard = HoverCardPrimitive.Root;

const HoverCardTrigger = HoverCardPrimitive.Trigger;

const HoverCardContent = forwardRef<
  ElementRef<typeof HoverCardPrimitive.Content>,
  ComponentPropsWithoutRef<typeof HoverCardPrimitive.Content>
>(({ className, align = "center", sideOffset = 4, ...props }, ref) => (
  <HoverCardPrimitive.Content
    ref={ref}
    align={align}
    sideOffset={sideOffset}
    className={cn(
      `
        z-50 w-64 rounded-md border bg-popover p-4 text-popover-foreground
        shadow-md outline-none

        data-[side=bottom]:slide-in-from-top-2

        data-[side=left]:slide-in-from-right-2

        data-[side=right]:slide-in-from-left-2

        data-[side=top]:slide-in-from-bottom-2

        data-[state=closed]:animate-out data-[state=closed]:fade-out-0
        data-[state=closed]:zoom-out-95

        data-[state=open]:animate-in data-[state=open]:fade-in-0
        data-[state=open]:zoom-in-95
      `,
      className,
    )}
    {...props}
  />
));

HoverCardContent.displayName = HoverCardPrimitive.Content.displayName;

export { HoverCard, HoverCardContent, HoverCardTrigger };
