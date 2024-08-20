import type { ElementType, HTMLAttributes } from "react";

import type { VariantProps } from "class-variance-authority";

import { cn } from "@/utils/reliverse/cn";
import { cva } from "class-variance-authority";

const shellVariants = cva(
  `
    grid items-center gap-8 pb-8 pt-6

    md:py-8
  `,
  {
    defaultVariants: {
      variant: "default",
    },
    variants: {
      variant: {
        centered: "container flex h-dvh max-w-2xl flex-col justify-center",
        default: "container",
        markdown: `
          container max-w-3xl gap-0 py-8

          lg:py-10

          md:py-10
        `,
        sidebar: "",
      },
    },
  },
);

type ShellProps = {
  as?: ElementType;
} & HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof shellVariants>;

function Shell({
  as: Comp = "main",
  className,
  variant,
  ...props
}: ShellProps) {
  return (
    <Comp
      className={cn(
        shellVariants({
          variant,
        }),
        className,
      )}
      {...props}
    />
  );
}

export { Shell };
