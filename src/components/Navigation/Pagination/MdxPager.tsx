import type { HTMLAttributes } from "react";

import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/utils/reliverse/cn";
import { truncate } from "@/utils/reliverse/string";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
          aria-label="Previous post"
          className={cn(
            buttonVariants({
              variant: "ghost",
            }),
          )}
          href={pager.prev.slug}
        >
          <ChevronLeft aria-hidden="true" className="mr-2 size-4" />
          {truncate(pager.prev.title, 20)}
        </Link>
      ) : null}
      {pager?.next ? (
        <Link
          aria-label="Next post"
          className={cn(
            buttonVariants({
              variant: "ghost",
            }),
            "ml-auto",
          )}
          href={pager.next.slug}
        >
          {truncate(pager.next.title, 20)}
          <ChevronRight aria-hidden="true" className="ml-2 size-4" />
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
