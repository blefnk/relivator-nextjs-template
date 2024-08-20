import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { cn } from "@/utils/reliverse/cn";
import { cva } from "class-variance-authority";

const mainVariants = cva(
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

type MainProps = {
  children: ReactNode;
  className?: string;
  size?: "lg" | "md" | "sm";
  variant?: "centered" | "default" | "justified";
} & ComponentPropsWithoutRef<"main">;

export function Main({
  className = "",
  children,
  size = "md",
  variant = "default",
  ...props
}: MainProps) {
  return (
    <main
      className={cn(
        mainVariants({
          variant,
          size,
        }),
        className,
        "space-y-4",
      )}
      {...props}
    >
      {children}
    </main>
  );
}
