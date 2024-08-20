import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { useTranslations } from "next-intl";

import { productCategories } from "~/constants/products";

export default function HomeMainSection() {
  const t = useTranslations();

  return (
    <section
      aria-labelledby="categories-heading"
      className="py-1"
      id="categories"
    >
      <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4">
        {productCategories.map((category) => (
          <Link
            aria-label={`${t("demo.aria-label-goto")} ${category.title}`}
            href={`/categories/${category.title}`}
            key={category.title}
          >
            <h3>
              <Badge
                className={`
                  flex items-center justify-center rounded-l bg-secondary/40 p-4
                  text-base font-semibold capitalize
                  text-secondary-foreground/80 transition-colors

                  hover:bg-secondary/80 hover:text-secondary-foreground
                `}
              >
                {category.title}
              </Badge>
            </h3>
          </Link>
        ))}
      </div>
    </section>
  );
}
