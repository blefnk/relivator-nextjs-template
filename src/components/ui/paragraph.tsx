import type { ComponentPropsWithoutRef, ReactNode } from "react";
import Balancer from "react-wrap-balancer";

import { cva } from "class-variance-authority";

import { cn } from "~/utils/cn";

const paragraphVariants = cva("", {
  defaultVariants: {
    size: "md",
    variant: "p",
  },
  variants: {
    size: {
      lg: "text-lg",
      md: "text-base",
      sm: "text-sm",
    },
    variant: {
      p: `
        text-4xl leading-7

        [&:not(:first-child)]:mt-6
      `,
    },
  },
});

type ParagraphProps = {
  children: ReactNode;
  className?: string;
  size?: "lg" | "md" | "sm";
} & ComponentPropsWithoutRef<"p">;

export function Paragraph({
  children,
  className = "",
  size = "lg",
  ...props
}: ParagraphProps) {
  return (
    <Balancer
      className={cn(
        paragraphVariants({
          size,
          variant: "p",
        }),
        "mb-4",
        className,
      )}
      as="p"
      {...props}
    >
      {children}
    </Balancer>
  );
}
