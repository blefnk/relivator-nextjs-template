import { type Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { products } from "~/data/db/schema";
import { fullURL } from "~/data/meta/builder";
import { productsSearchParamsSchema } from "~/data/validations/params";
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

export const metadata: Metadata = {
  metadataBase: fullURL(),
  title: "Products",
  description: "Buy products from our stores",
};

interface ProductsPageProperties {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

export default async function ProductsPage({
  searchParams,
}: ProductsPageProperties) {
  const {
    page,
    per_page,
    sort,
    categories,
    subcategories,
    price_range,
    store_ids,
    store_page,
  } = productsSearchParamsSchema.parse(searchParams);

  const t = await getTranslations();

  // Products transaction
  const pageAsNumber = Number(page);
  const fallbackPage =
    Number.isNaN(pageAsNumber) || pageAsNumber < 1 ? 1 : pageAsNumber;
  const perPageAsNumber = Number(per_page);
  // Number of items per page
  const limit = Number.isNaN(perPageAsNumber) ? 10 : perPageAsNumber;
  // Number of items to skip
  const offset = fallbackPage > 0 ? (fallbackPage - 1) * limit : 0;

  const productsTransaction = await getProductsAction({
    limit,
    offset,
    sort,
    categories,
    subcategories,
    price_range,
    store_ids,
  });

  const pageCount = Math.ceil(productsTransaction.count / limit);

  // Stores transaction
  const storesPageAsNumber = Number(store_page);
  const fallbackStoresPage =
    Number.isNaN(storesPageAsNumber) || storesPageAsNumber < 1 ?
      1
    : storesPageAsNumber;
  const storesLimit = 40;
  const storesOffset =
    fallbackStoresPage > 0 ? (fallbackStoresPage - 1) * storesLimit : 0;

  const storesTransaction = await getStoresAction({
    limit: storesLimit,
    offset: storesOffset,
    sort: "productCount.desc",
  });

  const storePageCount = Math.ceil(storesTransaction.count / storesLimit);

  const session = await getServerAuthSession();

  return (
    <Shell>
      <PageHeader>
        <PageHeaderHeading size="sm">
          {t("store.product.products")}
        </PageHeaderHeading>
        <PageHeaderDescription size="sm">
          {t("store.product.buyProductsFromOurStores")}
        </PageHeaderDescription>
      </PageHeader>
      <Products
        products={productsTransaction.items}
        pageCount={pageCount}
        categories={Object.values(products.category.enumValues)}
        stores={storesTransaction.items}
        storePageCount={storePageCount}
        session={session?.id ?? null}
        tAddToCart={t("store.product.addToCart")}
      />
    </Shell>
  );
}
