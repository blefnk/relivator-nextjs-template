import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { titleCase } from "string-ts";

import { type Product } from "~/data/db/schema";
import { env } from "~/env.mjs";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "~/islands/navigation/page-header";
import { Products } from "~/islands/products";
import { Shell } from "~/islands/wrappers/shell-variants";
import { getProductsAction } from "~/server/actions/product";
import { getStoresAction } from "~/server/actions/store";
import { getServerAuthSession } from "~/utils/auth/users";

interface CategoryPageProperties {
  params: {
    category: Product["category"];
  };
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

export function generateMetadata({ params }: CategoryPageProperties): Metadata {
  return {
    metadataBase: new URL(env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"),
    title: titleCase(params.category),
    description: `Buy products from the ${params.category} category`,
  };
}

export default async function CategoryPage({
  params,
  searchParams,
}: CategoryPageProperties) {
  const { category } = params;
  const {
    page,
    per_page,
    sort,
    subcategories,
    price_range,
    store_ids,
    store_page,
  } = searchParams;

  const t = await getTranslations();

  // Products transaction
  const limit = typeof per_page === "string" ? parseInt(per_page) : 8;
  const offset = typeof page === "string" ? (parseInt(page) - 1) * limit : 0;

  const productsTransaction = await getProductsAction({
    limit,
    offset,
    sort: typeof sort === "string" ? sort : null,
    categories: category,
    subcategories: typeof subcategories === "string" ? subcategories : null,
    price_range: typeof price_range === "string" ? price_range : null,
    store_ids: typeof store_ids === "string" ? store_ids : null,
  });

  const pageCount = Math.ceil(productsTransaction.count / limit);

  // Stores transaction
  const storesLimit = 25;
  const storesOffset =
    typeof store_page === "string" ?
      (parseInt(store_page) - 1) * storesLimit
    : 0;

  const storesTransaction = await getStoresAction({
    limit: storesLimit,
    offset: storesOffset,
    sort: "productCount.desc",
  });

  const storePageCount = Math.ceil(storesTransaction.count / storesLimit);

  const session = await getServerAuthSession();

  return (
    <Shell>
      <PageHeader
        id="category-page-header"
        aria-labelledby="category-page-header-heading"
      >
        <PageHeaderHeading size="sm">{titleCase(category)}</PageHeaderHeading>
        <PageHeaderDescription size="sm">
          {t("store.categories.buyFromCategories", {
            category: category,
          })}
        </PageHeaderDescription>
      </PageHeader>
      <Products
        id="category-page-products"
        aria-labelledby="category-page-products-heading"
        products={productsTransaction.items}
        pageCount={pageCount}
        category={category}
        stores={storesTransaction.items}
        storePageCount={storePageCount}
        session={session?.id ?? null}
        tAddToCart={t("store.product.addToCart")}
      />
    </Shell>
  );
}
