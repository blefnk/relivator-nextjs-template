/**
 * Subcategory Page
 * ================
 *
 * @see https://github.com/gustavoguichard/string-ts#-api
 */

import type { Metadata } from "next";
import { unslugify } from "~/utils";
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

type SubcategoryPageProperties = {
  params: {
    category: Product["category"];
    subcategory: string;
  };
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
};

export function generateMetadata({
  params,
}: SubcategoryPageProperties): Metadata {
  const subcategory = unslugify(params.subcategory);

  return {
    metadataBase: new URL(env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"),
    title: titleCase(subcategory),
    description: `Buy the best ${subcategory}`,
  };
}

export default async function SubcategoryPage({
  params,
  searchParams,
}: SubcategoryPageProperties) {
  const { category, subcategory } = params;
  const { page, per_page, sort, price_range, store_ids, store_page } =
    searchParams;

  const t = await getTranslations();

  // Products transaction
  const limit = typeof per_page === "string" ? parseInt(per_page) : 8;
  const offset = typeof page === "string" ? (parseInt(page) - 1) * limit : 0;

  const productsTransaction = await getProductsAction({
    limit,
    offset,
    sort: typeof sort === "string" ? sort : null,
    categories: category,
    subcategories: subcategory,
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
        id="subcategory-page-header"
        aria-labelledby="subcategory-page-header-heading"
      >
        <PageHeaderHeading size="sm">
          {titleCase(unslugify(subcategory))}
        </PageHeaderHeading>
        <PageHeaderDescription size="sm">
          {t("store.categories.buyTheBest", {
            category: unslugify(subcategory),
          })}
        </PageHeaderDescription>
      </PageHeader>
      <Products
        id="subcategory-page-products"
        aria-labelledby="subcategory-page-products-heading"
        products={productsTransaction.items}
        pageCount={pageCount}
        stores={storesTransaction.items}
        storePageCount={storePageCount}
        session={session?.id || null}
        tAddToCart={t("store.product.addToCart")}
      />
    </Shell>
  );
}
