import type { ButtonProps } from "~/components/ui/button";

import type { ComponentProps } from "react";
import { forwardRef } from "react";

import Link from "next/link";

import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DotsHorizontalIcon,
} from "@radix-ui/react-icons";

import { buttonVariants } from "~/components/ui/button";
import { cn } from "~/utils/cn";

const Pagination = ({ className, ...props }: ComponentProps<"nav">) => (
  <nav
    className={cn("mx-auto flex w-full justify-center", className)}
    aria-label="pagination"
    role="navigation"
    {...props}
  />
);

Pagination.displayName = "Pagination";

const PaginationContent = forwardRef<HTMLUListElement, ComponentProps<"ul">>(
  ({ className, ...props }, ref) => (
    <ul
      className={cn("flex flex-row items-center gap-1", className)}
      ref={ref}
      {...props}
    />
  ),
);

PaginationContent.displayName = "PaginationContent";

const PaginationItem = forwardRef<HTMLLIElement, ComponentProps<"li">>(
  ({ className, ...props }, ref) => (
    <li className={cn("", className)} ref={ref} {...props} />
  ),
);

PaginationItem.displayName = "PaginationItem";

type PaginationLinkProps = {
  isActive?: boolean;
} & ComponentProps<typeof Link> &
  Pick<ButtonProps, "size">;

const PaginationLink = ({
  className,
  href,
  isActive = false,
  size = "icon",
  ...props
}: PaginationLinkProps) => {
  return (
    <Link
      className={cn(
        buttonVariants({
          size,
          variant: isActive ? "outline" : "ghost",
        }),
        className,
      )}
      aria-current={isActive ? "page" : undefined}
      href={href}
      {...props}
    />
  );
};

PaginationLink.displayName = "PaginationLink";

const PaginationPrevious = ({
  className,
  ...props
}: ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    className={cn("gap-1 pl-2.5", className)}
    aria-label="Go to previous page"
    size="default"
    {...props}
  >
    <ChevronLeftIcon className="size-4" />
    <span>Previous</span>
  </PaginationLink>
);

PaginationPrevious.displayName = "PaginationPrevious";

const PaginationNext = ({
  className,
  ...props
}: ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    className={cn("gap-1 pr-2.5", className)}
    aria-label="Go to next page"
    size="default"
    {...props}
  >
    <span>Next</span>
    <ChevronRightIcon className="size-4" />
  </PaginationLink>
);

PaginationNext.displayName = "PaginationNext";

const PaginationEllipsis = ({
  className,
  ...props
}: ComponentProps<"span">) => (
  <span
    className={cn("flex size-9 items-center justify-center", className)}
    aria-hidden
    {...props}
  >
    <DotsHorizontalIcon className="size-4" />
    <span className="sr-only">More pages</span>
  </span>
);

PaginationEllipsis.displayName = "PaginationEllipsis";

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
};
