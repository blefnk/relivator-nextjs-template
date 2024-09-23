import type { ComponentPropsWithoutRef, ReactNode } from "react";
import Balancer from "react-wrap-balancer";

import { cva } from "class-variance-authority";

import { cn } from "~/utils/cn";

const spanVariants = cva("", {
  defaultVariants: {
    size: "md",
    variant: "span",
  },
  variants: {
    size: {
      lg: "text-lg",
      md: "text-base",
      sm: "text-sm",
    },
    variant: {
      span: "text-3xl",
    },
  },
});

type SpanProps = {
  as?: "span";
  children: ReactNode;
  className?: string;
  size?: "lg" | "md" | "sm";
} & ComponentPropsWithoutRef<"span">;

export function Span({
  children,
  className = "",
  size = "lg",
  ...props
}: SpanProps) {
  return (
    <Balancer
      className={cn(
        spanVariants({
          size,
          variant: "span",
        }),
        className,
      )}
      as="span"
      {...props}
    >
      {children}
    </Balancer>
  );
}
