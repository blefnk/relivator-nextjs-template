"use client";

import * as SliderPrimitive from "@radix-ui/react-slider";
import * as React from "react";

import { cn } from "~/lib/cn";

function Slider({
  className,
  defaultValue,
  max = 100,
  min = 0,
  value,
  ...props
}: React.ComponentProps<typeof SliderPrimitive.Root>) {
  const _values = React.useMemo(
    () =>
      Array.isArray(value)
        ? value
        : Array.isArray(defaultValue)
          ? defaultValue
          : [min, max],
    [value, defaultValue, min, max],
  );

  return (
    <SliderPrimitive.Root
      className={cn(
        `
          relative flex w-full touch-none items-center select-none
          data-[disabled]:opacity-50
          data-[orientation=vertical]:h-full
          data-[orientation=vertical]:min-h-44
          data-[orientation=vertical]:w-auto
          data-[orientation=vertical]:flex-col
        `,
        className,
      )}
      data-slot="slider"
      defaultValue={defaultValue}
      max={max}
      min={min}
      value={value}
      {...props}
    >
      <SliderPrimitive.Track
        className={cn(
          `
            relative grow overflow-hidden rounded-full bg-muted
            data-[orientation=horizontal]:h-1.5
            data-[orientation=horizontal]:w-full
            data-[orientation=vertical]:h-full data-[orientation=vertical]:w-1.5
          `,
        )}
        data-slot="slider-track"
      >
        <SliderPrimitive.Range
          className={cn(
            `
              absolute bg-primary
              data-[orientation=horizontal]:h-full
              data-[orientation=vertical]:w-full
            `,
          )}
          data-slot="slider-range"
        />
      </SliderPrimitive.Track>
      {Array.from({ length: _values.length }, (_, index) => (
        <SliderPrimitive.Thumb
          className={`
            block size-4 shrink-0 rounded-full border border-primary
            bg-background shadow-sm ring-ring/50 transition-[color,box-shadow]
            hover:ring-4
            focus-visible:ring-4 focus-visible:outline-hidden
            disabled:pointer-events-none disabled:opacity-50
          `}
          data-slot="slider-thumb"
          key={index}
        />
      ))}
    </SliderPrimitive.Root>
  );
}

export { Slider };
