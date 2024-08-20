import type { ComponentPropsWithoutRef, ComponentType } from "react";
import { Fragment } from "react";

import Link from "next/link";

import { cn } from "@/utils/reliverse/cn";
import { truncate } from "@/utils/reliverse/string";
import { ChevronRightIcon } from "@radix-ui/react-icons";

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
      aria-label="breadcrumbs"
      className={cn(
        `
          flex w-full items-center overflow-auto text-sm font-medium
          text-muted-foreground
        `,
        className,
      )}
      {...props}
    >
      {segments.map((segment, index) => {
        const isLastSegment = index === segments.length - 1;

        return (
          <Fragment key={segment.href}>
            <Link
              aria-current={isLastSegment ? "page" : undefined}
              className={cn(
                `
                  truncate transition-colors

                  hover:text-foreground
                `,
                isLastSegment ? "text-foreground" : "text-muted-foreground",
              )}
              href={segment.href}
            >
              {truncationLength > 0 && segment.title
                ? truncate(segment.title, truncationLength)
                : segment.title}
            </Link>
            {!isLastSegment && (
              <SeparatorIcon aria-hidden="true" className="mx-2 size-4" />
            )}
          </Fragment>
        );
      })}
    </nav>
  );
}
