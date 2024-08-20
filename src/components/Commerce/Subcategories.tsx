import Link from "next/link";

import { Badge } from "@/components/ui/badge";

import { productCategories } from "~/constants/products";

export function ProductSubcategories() {
  return (
    <div className="mx-auto flex flex-col items-center space-y-4 text-center">
      <div
        aria-labelledby="random-subcategories-heading"
        className="flex flex-wrap items-center justify-center gap-4"
        id="random-subcategories"
      >
        {productCategories[
          Math.floor(Math.random() * productCategories.length)
        ]?.subcategories?.map((subcategory) => (
          <Link
            href={`/categories/${String(productCategories[0]?.title)}/${subcategory.slug}`}
            key={subcategory.slug}
          >
            <Badge className="rounded px-3 py-1" variant="outline">
              {}
              {subcategory.title}
            </Badge>
            {}
            <span className="sr-only">{subcategory.title}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
