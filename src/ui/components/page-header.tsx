import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "~/lib/cn";

type PageHeaderProps = React.HTMLAttributes<HTMLDivElement> & {
  as?: React.ElementType;
  withPadding?: boolean;
};

function PageHeader({
  as: Comp = "section",
  children,
  className,
  withPadding = true,
  ...props
}: PageHeaderProps) {
  return (
    <Comp
      className={cn(
        "flex w-full flex-col items-center gap-2 text-center",
        withPadding &&
          `
            py-4
            md:py-8
          `,
        className,
      )}
      {...props}
    >
      {children}
    </Comp>
  );
}

const headingVariants = cva(
  `
    font-bold tracking-tight text-neutral-900
    dark:text-neutral-100
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
          lg:text-5xl
        `,
        lg: `
          text-4xl
          md:text-5xl
          lg:text-6xl
        `,
        sm: `
          text-2xl
          md:text-3xl
          lg:text-4xl
        `,
      },
    },
  },
);

type PageHeaderHeadingProps = React.HTMLAttributes<HTMLHeadingElement> &
  VariantProps<typeof headingVariants> & {
    as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  };

function PageHeaderHeading({
  as: Comp = "h1",
  className,
  size,
  ...props
}: PageHeaderHeadingProps) {
  return (
    <Comp className={cn(headingVariants({ size }), className)} {...props} />
  );
}

const descriptionVariants = cva(
  `
    mx-auto max-w-2xl text-neutral-600
    dark:text-neutral-400
  `,
  {
    defaultVariants: {
      size: "default",
    },
    variants: {
      size: {
        default: `
          text-lg
          md:text-xl
        `,
        lg: `
          text-xl
          md:text-2xl
        `,
        sm: `
          text-base
          md:text-lg
        `,
      },
    },
  },
);

type PageHeaderDescriptionProps = React.HTMLAttributes<HTMLParagraphElement> &
  VariantProps<typeof descriptionVariants> & {};

function PageActions({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("mt-4 flex flex-row justify-center gap-2", className)}
      {...props}
    />
  );
}

function PageHeaderDescription({
  className,
  size,
  ...props
}: PageHeaderDescriptionProps) {
  return (
    <p className={cn(descriptionVariants({ size }), className)} {...props} />
  );
}

export { PageActions, PageHeader, PageHeaderDescription, PageHeaderHeading };
