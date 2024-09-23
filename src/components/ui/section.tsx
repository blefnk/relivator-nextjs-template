import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { cva } from "class-variance-authority";

import { cn } from "~/utils/cn";

const sectionVariants = cva(
  "container my-12 flex max-w-screen-xl flex-col items-center space-y-8 p-4",
  {
    defaultVariants: {
      size: "md",
      variant: "default",
    },
    variants: {
      size: {
        lg: "text-lg",
        md: "text-base",
        sm: "text-sm",
      },
      variant: {
        centered: "text-center",
        default: "text-base leading-7",
        justified: "text-justify",
      },
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
  children,
  className = "",
  mb,
  mt,
  my,
  size = "md",
  variant = "default",
  ...props
}: SectionProps) {
  return (
    <section
      className={cn(
        sectionVariants({
          size,
          variant,
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
