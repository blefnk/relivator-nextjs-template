import type { ComponentPropsWithoutRef, ReactNode } from "react";
import Balancer from "react-wrap-balancer";

import { cn } from "@/utils/reliverse/cn";
import { cva } from "class-variance-authority";

const spanVariants = cva("", {
  variants: {
    variant: {
      span: "text-3xl",
    },
    size: {
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg",
    },
  },
  defaultVariants: {
    variant: "span",
    size: "md",
  },
});

type SpanProps = {
  as?: "span";
  children: ReactNode;
  className?: string;
  size?: "lg" | "md" | "sm";
} & ComponentPropsWithoutRef<"span">;

export function Span({
  className = "",
  children,
  size = "lg",
  ...props
}: SpanProps) {
  return (
    <Balancer
      as="span"
      className={cn(
        spanVariants({
          variant: "span",
          size,
        }),
        className,
      )}
      {...props}
    >
      {children}
    </Balancer>
  );
}
