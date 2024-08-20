import type { ReactNode } from "react";
import Balancer from "react-wrap-balancer";

import { cn } from "@/utils/reliverse/cn";
import { cva } from "class-variance-authority";

const headingVariants = cva("font-bold transition-colors", {
  variants: {
    variant: {
      h1: "scroll-m-20 border-b pb-2 text-3xl font-extrabold tracking-tight",
      h2: `
        scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight
        transition-colors

        first:mt-0
      `,
      h3: "scroll-m-20 text-2xl font-semibold tracking-tight",
      h4: "scroll-m-20 text-xl font-semibold tracking-tight",
    },
    size: {
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg",
    },
  },
  defaultVariants: {
    variant: "h2",
    size: "md",
  },
});

// TODO: do we need something like this? 🤔
// import type { VariantProps } from "class-variance-authority";
// export type HeadingVariantsProps = VariantProps<typeof headingVariants>;
// export { headingVariants };

type HeadingProps = {
  as?: "h1" | "h2" | "h3" | "h4";
  children: ReactNode;
  className?: string;
};

export function Heading({ className = "", children, as = "h2" }: HeadingProps) {
  return (
    <Balancer
      as={as}
      className={cn(
        headingVariants({
          variant: as,
          size: "lg",
        }),
        className,
      )}
    >
      {children}
    </Balancer>
  );
}
