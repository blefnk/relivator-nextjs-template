import type { HTMLAttributes } from "react";

import type { VariantProps } from "class-variance-authority";

import { cn } from "@/utils/reliverse/cn";
import { cva } from "class-variance-authority";

const badgeVariants = cva(
  `
    inline-flex items-center rounded-lg border px-2.5 py-0.5 text-xs
    font-semibold transition-colors

    focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2
  `,
  {
    defaultVariants: {
      variant: "default",
    },
    variants: {
      variant: {
        default: `
          border-transparent bg-primary text-primary-foreground shadow

          hover:bg-primary/80
        `,
        destructive: `
          border-transparent bg-destructive text-destructive-foreground shadow

          hover:bg-destructive/80
        `,
        outline: "text-foreground",
        secondary: `
          border-transparent bg-secondary text-secondary-foreground

          hover:bg-secondary/80
        `,
      },
    },
  },
);

type BadgeProps = {} & HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof badgeVariants>;

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        badgeVariants({
          variant,
        }),
        className,
      )}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
