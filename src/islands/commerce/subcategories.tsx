import Link from "next/link";

import { Badge } from "~/islands/primitives/badge";
import { productCategories } from "~/server/config/products";

export function ProductSubcategories() {
  return (
    <div className="mx-auto flex flex-col items-center space-y-4 text-center">
      <div
        id="random-subcategories"
        aria-labelledby="random-subcategories-heading"
        className="flex flex-wrap items-center justify-center gap-4"
      >
        {productCategories[
          Math.floor(Math.random() * productCategories.length)
        ]?.subcategories.map((subcategory) => (
          <Link
            key={subcategory.slug}
            href={`/categories/${String(productCategories[0]?.title)}/${
              subcategory.slug
            }`}
          >
            <Badge variant="outline" className="rounded px-3 py-1">
              {subcategory.title}
            </Badge>
            <span className="sr-only">{subcategory.title}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
