//
import type { ComponentProps, ElementType, HTMLAttributes } from "react";
import { Balancer } from "react-wrap-balancer";

import type { VariantProps } from "class-variance-authority";

import { Separator } from "@/components/ui/separator";
import { cn } from "@/utils/reliverse/cn";
import { cva } from "class-variance-authority";

type PageHeaderProps = {
  as?: ElementType;
  separated?: boolean;
} & HTMLAttributes<HTMLDivElement>;

function PageHeader({
  as: Comp = "section",
  children,
  className,
  separated = false,
  ...props
}: PageHeaderProps) {
  return (
    <Comp className={cn("grid gap-1", className)} {...props}>
      {children}
      {separated ? <Separator className="mt-2.5" /> : null}
    </Comp>
  );
}

const headingVariants = cva(
  `
    font-bold leading-tight tracking-tighter

    lg:leading-[1.1]
  `,
  {
    defaultVariants: {
      size: "default",
    },
    variants: {
      size: {
        default: `
          text-3xl

          md:text-4xl
        `,
        lg: `
          text-4xl

          md:text-5xl
        `,
        sm: `
          text-2xl

          md:text-3xl
        `,
      },
    },
  },
);

type PageHeaderHeadingProps = {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
} & HTMLAttributes<HTMLHeadingElement> &
  VariantProps<typeof headingVariants>;

function PageHeaderHeading({
  as: Comp = "h1",
  className,
  size,
  ...props
}: PageHeaderHeadingProps) {
  return (
    <Comp
      className={cn(
        headingVariants({
          className,
          size,
        }),
      )}
      {...props}
    />
  );
}

const descriptionVariants = cva("max-w-[750px] text-muted-foreground", {
  defaultVariants: {
    size: "default",
  },
  variants: {
    size: {
      default: `
        text-base

        sm:text-lg
      `,
      lg: `
        text-lg

        sm:text-xl
      `,
      sm: `
        text-sm

        sm:text-base
      `,
    },
  },
});

type PageHeaderDescriptionProps = {} & ComponentProps<typeof Balancer> &
  VariantProps<typeof descriptionVariants>;

function PageHeaderDescription({
  className,
  size,
  ...props
}: PageHeaderDescriptionProps) {
  return (
    <Balancer
      as="p"
      className={cn(
        descriptionVariants({
          className,
          size,
        }),
      )}
      {...props}
    />
  );
}

export { PageHeader, PageHeaderDescription, PageHeaderHeading };
