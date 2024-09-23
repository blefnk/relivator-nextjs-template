import type { HTMLAttributes } from "react";

import Link from "next/link";

import { ChevronLeft, ChevronRight } from "lucide-react";

import { buttonVariants } from "~/components/ui/button";
import { cn } from "~/utils/cn";
import { truncate } from "~/utils/string";

type MdxPagerItem = {
  slug: string;
  title: string;
};

type MdxPagerProps = {
  allItems: MdxPagerItem[];
  currentItem: MdxPagerItem;
} & HTMLAttributes<HTMLDivElement>;

export function MdxPager({
  allItems,
  className,
  currentItem,
  ...props
}: MdxPagerProps) {
  const pager = getPager(currentItem, allItems);

  if (!pager) {
    return null;
  }

  return (
    <div
      className={cn("flex items-center justify-between", className)}
      {...props}
    >
      {pager?.prev ? (
        <Link
          className={cn(
            buttonVariants({
              variant: "ghost",
            }),
          )}
          aria-label="Previous post"
          href={pager.prev.slug}
        >
          <ChevronLeft className="mr-2 size-4" aria-hidden="true" />
          {truncate(pager.prev.title, 20)}
        </Link>
      ) : null}
      {pager?.next ? (
        <Link
          className={cn(
            buttonVariants({
              variant: "ghost",
            }),
            "ml-auto",
          )}
          aria-label="Next post"
          href={pager.next.slug}
        >
          {truncate(pager.next.title, 20)}
          <ChevronRight className="ml-2 size-4" aria-hidden="true" />
        </Link>
      ) : null}
    </div>
  );
}

export function getPager(currentItem: MdxPagerItem, allItems: MdxPagerItem[]) {
  const flattenedLinks = allItems.flat();
  const activeIndex = flattenedLinks.findIndex(
    // @ts-expect-error TODO: fix
    (link) => currentItem.slug === link && link.slug,
  );

  const previous = activeIndex ? flattenedLinks[activeIndex - 1] : null;

  const next =
    activeIndex !== flattenedLinks.length - 1
      ? flattenedLinks[activeIndex + 1]
      : null;

  return {
    next,
    prev: previous,
  };
}
