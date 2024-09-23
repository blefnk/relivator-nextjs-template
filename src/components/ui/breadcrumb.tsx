import { forwardRef } from "react";
import type {
  ComponentProps,
  ComponentPropsWithoutRef,
  ReactNode,
} from "react";

import { Slot } from "@radix-ui/react-slot";
import { ChevronRight, MoreHorizontal } from "lucide-react";

import { cn } from "~/utils/cn";

const Breadcrumb = forwardRef<
  HTMLElement,
  {
    separator?: ReactNode;
  } & ComponentPropsWithoutRef<"nav">
>(({ ...props }, ref) => <nav aria-label="breadcrumb" ref={ref} {...props} />);

Breadcrumb.displayName = "Breadcrumb";

const BreadcrumbList = forwardRef<
  HTMLOListElement,
  ComponentPropsWithoutRef<"ol">
>(({ className, ...props }, ref) => (
  <ol
    className={cn(
      `
        flex flex-wrap items-center gap-1.5 break-words text-sm
        text-muted-foreground

        sm:gap-2.5
      `,
      className,
    )}
    ref={ref}
    {...props}
  />
));

BreadcrumbList.displayName = "BreadcrumbList";

const BreadcrumbItem = forwardRef<
  HTMLLIElement,
  ComponentPropsWithoutRef<"li">
>(({ className, ...props }, ref) => (
  <li
    className={cn("inline-flex items-center gap-1.5", className)}
    ref={ref}
    {...props}
  />
));

BreadcrumbItem.displayName = "BreadcrumbItem";

const BreadcrumbLink = forwardRef<
  HTMLAnchorElement,
  {
    asChild?: boolean;
  } & ComponentPropsWithoutRef<"a">
>(({ asChild, className, ...props }, ref) => {
  const Comp = asChild ? Slot : "a";

  return (
    <Comp
      className={cn(
        `
          transition-colors

          hover:text-foreground
        `,
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});

BreadcrumbLink.displayName = "BreadcrumbLink";

const BreadcrumbPage = forwardRef<
  HTMLSpanElement,
  ComponentPropsWithoutRef<"span">
>(({ className, ...props }, ref) => (
  <span
    className={cn("font-normal text-foreground", className)}
    aria-current="page"
    aria-disabled="true"
    ref={ref}
    role="link"
    {...props}
  />
));

BreadcrumbPage.displayName = "BreadcrumbPage";

const BreadcrumbSeparator = ({
  children,
  className,
  ...props
}: ComponentProps<"li">) => (
  <li
    className={cn("[&>svg]:size-3.5", className)}
    aria-hidden="true"
    role="presentation"
    {...props}
  >
    {children ?? <ChevronRight />}
  </li>
);

BreadcrumbSeparator.displayName = "BreadcrumbSeparator";

const BreadcrumbEllipsis = ({
  className,
  ...props
}: ComponentProps<"span">) => (
  <span
    className={cn("flex size-9 items-center justify-center", className)}
    aria-hidden="true"
    role="presentation"
    {...props}
  >
    <MoreHorizontal className="size-4" />
    <span className="sr-only">More</span>
  </span>
);

BreadcrumbEllipsis.displayName = "BreadcrumbElipssis";

export {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
};
