import type { ComponentPropsWithoutRef, ReactNode } from "react";
import Balancer from "react-wrap-balancer";

import { cn } from "@/utils/reliverse/cn";
import { cva } from "class-variance-authority";

const paragraphVariants = cva("", {
  variants: {
    variant: {
      p: `
        text-4xl leading-7

        [&:not(:first-child)]:mt-6
      `,
    },
    size: {
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg",
    },
  },
  defaultVariants: {
    variant: "p",
    size: "md",
  },
});

type ParagraphProps = {
  children: ReactNode;
  className?: string;
  size?: "lg" | "md" | "sm";
} & ComponentPropsWithoutRef<"p">;

export function Paragraph({
  className = "",
  children,
  size = "lg",
  ...props
}: ParagraphProps) {
  return (
    <Balancer
      as="p"
      className={cn(
        paragraphVariants({
          variant: "p",
          size,
        }),
        "mb-4",
        className,
      )}
      {...props}
    >
      {children}
    </Balancer>
  );
}
