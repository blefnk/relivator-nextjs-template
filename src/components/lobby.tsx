import { getTranslations } from "next-intl/server";
import Link from "next/link";

import type {
  getCategories,
  getFeaturedProducts,
} from "~/server/queries/product";

import { ContentSection } from "~/components/content-section";
import { Icons } from "~/components/icons";
import {
  PageActions,
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "~/components/page-header";
import { ProductCard } from "~/components/product-card";
import { Shell } from "~/components/shell";
import { StoreCard } from "~/components/store-card";
import { Badge } from "~/components/ui/badge";
import { buttonVariants } from "~/components/ui/button";
import { siteConfig } from "~/config/site";
import { type getGithubStars } from "~/server/queries/github";
import { type getFeaturedStores } from "~/server/queries/store";
import { cn } from "~/server/utils";

import { CategoryCard } from "./category-card";

type LobbyProps = {
  githubStarsPromise: ReturnType<typeof getGithubStars>;
  productsPromise: ReturnType<typeof getFeaturedProducts>;
  categoriesPromise: ReturnType<typeof getCategories>;
  storesPromise: ReturnType<typeof getFeaturedStores>;
};

export async function Lobby({
  githubStarsPromise,
  productsPromise,
  categoriesPromise,
  storesPromise,
}: LobbyProps) {
  const t = await getTranslations();

  // @see the "Parallel data fetching" docs: https://nextjs.org/docs/app/building-your-application/data-fetching/patterns#parallel-data-fetching
  const [githubStars, products, categories, stores] = await Promise.all([
    githubStarsPromise,
    productsPromise,
    categoriesPromise,
    storesPromise,
  ]);

  return (
    <Shell className="max-w-6xl gap-0 mb-14">
      <PageHeader
        as="section"
        className="mx-auto items-center gap-2 text-center"
        withPadding
      >
        <Link
          href={siteConfig.links.github}
          target="_blank"
          rel="noreferrer"
          className="animate-fade-up"
          style={{ animationDelay: "0.10s", animationFillMode: "both" }}
        >
          <Badge
            aria-hidden="true"
            variant="secondary"
            className="rounded-full px-3.5 py-1.5"
          >
            <Icons.gitHub className="mr-2 size-3.5" aria-hidden="true" />
            {githubStars} stars on GitHub
          </Badge>
        </Link>
        <PageHeaderHeading
          className="animate-fade-up"
          style={{ animationDelay: "0.20s", animationFillMode: "both" }}
        >
          <span className="hidden md:block">
            Relivator template is the foundation of your eCommerce platform:
            Build More Efficient, Engaging, and Profitable Online Stores
          </span>
          <span className="block md:hidden">
            Relivator template is the foundation of your eCommerce platform
          </span>
        </PageHeaderHeading>
        <PageHeaderDescription
          className="max-w-[46.875rem] animate-fade-up"
          style={{ animationDelay: "0.30s", animationFillMode: "both" }}
        >
          Relivator Enhances your eCommerce with the Power of Next.js 15, React
          19, Tailwind, and more
        </PageHeaderDescription>
        <PageActions
          className="animate-fade-up"
          style={{ animationDelay: "0.40s", animationFillMode: "both" }}
        >
          <Link href="/products" className={cn(buttonVariants())}>
            Buy now
          </Link>
          <Link
            href="/dashboard/stores"
            className={cn(buttonVariants({ variant: "outline" }))}
          >
            Sell now
          </Link>
        </PageActions>
      </PageHeader>
      <section
        className="grid animate-fade-up grid-cols-1 gap-4 xs:grid-cols-2 md:grid-cols-4"
        style={{ animationDelay: "0.50s", animationFillMode: "both" }}
      >
        {categories.map((category) => (
          <CategoryCard key={category.name} category={category} />
        ))}
      </section>
      <ContentSection
        title={t("featuredProductsTitle")}
        description={t("featuredProductsDescription")}
        href="/products"
        linkText={t("viewAllProducts")}
        className="pt-14 md:pt-20 lg:pt-24"
      >
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </ContentSection>
      <ContentSection
        title={t("featuredStoresTitle")}
        description={t("featuredStoresDescription")}
        href="/stores"
        linkText={t("viewAllStores")}
        className="py-14 md:py-20 lg:py-24"
      >
        {stores.map((store) => (
          <StoreCard
            key={store.id}
            store={store}
            href={`/products?store_ids=${store.id}`}
          />
        ))}
      </ContentSection>
    </Shell>
  );
}
