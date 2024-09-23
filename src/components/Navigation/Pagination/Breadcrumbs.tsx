import type { ComponentPropsWithoutRef, ComponentType } from "react";
import { Fragment } from "react";

import Link from "next/link";

import { ChevronRightIcon } from "@radix-ui/react-icons";

import { cn } from "~/utils/cn";
import { truncate } from "~/utils/string";

type BreadcrumbsProps = {
  segments: {
    href: string;
    title: string;
  }[];
  separator?: ComponentType<{
    className?: string;
  }>;
  truncationLength?: number;
} & ComponentPropsWithoutRef<"nav">;

export function Breadcrumbs({
  className,
  segments,
  separator,
  truncationLength = 0,
  ...props
}: BreadcrumbsProps) {
  const SeparatorIcon = separator || ChevronRightIcon;

  return (
    <nav
      className={cn(
        `
          flex w-full items-center overflow-auto text-sm font-medium
          text-muted-foreground
        `,
        className,
      )}
      aria-label="breadcrumbs"
      {...props}
    >
      {segments.map((segment, index) => {
        const isLastSegment = index === segments.length - 1;

        return (
          <Fragment key={segment.href}>
            <Link
              className={cn(
                `
                  truncate transition-colors

                  hover:text-foreground
                `,
                isLastSegment ? "text-foreground" : "text-muted-foreground",
              )}
              aria-current={isLastSegment ? "page" : undefined}
              href={segment.href}
            >
              {truncationLength > 0 && segment.title
                ? truncate(segment.title, truncationLength)
                : segment.title}
            </Link>
            {!isLastSegment && (
              <SeparatorIcon className="mx-2 size-4" aria-hidden="true" />
            )}
          </Fragment>
        );
      })}
    </nav>
  );
}
