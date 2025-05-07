import type * as React from "react";

import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "~/lib/cn";

const shellVariants = cva("", {
  defaultVariants: {
    variant: "centered",
  },
  variants: {
    variant: {
      centered: `
        mx-auto flex w-full max-w-2xl flex-col items-center justify-center gap-6
        px-4 py-12
      `,
      markdown: `
        prose prose-neutral mx-auto w-full max-w-3xl px-4 py-12
        dark:prose-invert
      `,
      sidebar: "mx-auto flex w-full max-w-6xl flex-row gap-8 px-4 py-12",
    },
  },
});

type ShellProps = React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof shellVariants> & {
    as?: React.ElementType;
  };

function Shell({
  as: Comp = "section",
  className,
  variant,
  ...props
}: ShellProps) {
  return (
    <Comp className={cn(shellVariants({ variant }), className)} {...props} />
  );
}

export { Shell, shellVariants };
