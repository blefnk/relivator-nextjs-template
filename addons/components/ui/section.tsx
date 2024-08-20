import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { cn } from "@/utils/reliverse/cn";
import { cva } from "class-variance-authority";

const sectionVariants = cva(
  "container my-12 flex max-w-screen-xl flex-col items-center space-y-8 p-4",
  {
    variants: {
      variant: {
        default: "text-base leading-7",
        centered: "text-center",
        justified: "text-justify",
      },
      size: {
        sm: "text-sm",
        md: "text-base",
        lg: "text-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  },
);

type SectionProps = {
  children: ReactNode;
  className?: string;
  mb?: string;
  mt?: string;
  my?: string;
  size?: "lg" | "md" | "sm";
  variant?: "centered" | "default" | "justified";
} & ComponentPropsWithoutRef<"section">;

// TODO: fix mt, mb, my
export function Section({
  className = "",
  children,
  size = "md",
  variant = "default",
  mt,
  mb,
  my,
  ...props
}: SectionProps) {
  return (
    <section
      className={cn(
        sectionVariants({
          variant,
          size,
        }),
        className,
        mt &&
          `
            mt-${mt}
          `,
        mb &&
          `
            mb-${mb}
          `,
        my &&
          `
            my-${my}
          `,
        "space-y-4",
      )}
      {...props}
    >
      {children}
    </section>
  );
}
