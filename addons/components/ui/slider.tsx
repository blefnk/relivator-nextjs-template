"use client";

import type { ComponentPropsWithoutRef, ComponentRef } from "react";
import { forwardRef } from "react";

import { cn } from "@/utils/reliverse/cn";
import * as SliderPrimitive from "@radix-ui/react-slider";

const Slider = forwardRef<
  ComponentRef<typeof SliderPrimitive.Root>,
  {
    thickness?: "default" | "thin";
    variant?: "default" | "range";
  } & ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(
  (
    { className, thickness = "default", variant = "default", ...props },
    ref,
  ) => (
    <SliderPrimitive.Root
      className={cn(
        "relative flex w-full touch-none select-none items-center",
        className,
      )}
      ref={ref}
      {...props}
    >
      <SliderPrimitive.Track
        className={cn(
          `
            relative h-1.5 w-full grow overflow-hidden rounded-full
            bg-primary/20
          `,
          thickness === "thin" && "h-0.5",
        )}
      >
        <SliderPrimitive.Range className="absolute h-full bg-primary" />
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb
        className={cn(
          `
            block size-4 rounded-full border border-primary/50 bg-background
            shadow transition-colors

            disabled:pointer-events-none disabled:opacity-50

            focus-visible:outline-none focus-visible:ring-1
            focus-visible:ring-ring
          `,
          thickness === "thin" && "size-3.5",
        )}
      />
      {variant === "range" && (
        <SliderPrimitive.Thumb
          className={cn(
            `
              block size-5 rounded-full border-2 border-primary bg-background
              ring-offset-background transition-colors

              disabled:pointer-events-none disabled:opacity-50

              focus-visible:outline-none focus-visible:ring-2
              focus-visible:ring-ring focus-visible:ring-offset-2
            `,
            thickness === "thin" && "size-3.5",
          )}
        />
      )}
    </SliderPrimitive.Root>
  ),
);

Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
