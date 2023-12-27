import { type Metadata } from "next";
import { CheckIcon, CircleIcon } from "@radix-ui/react-icons";
import { cn } from "~/utils";
import { getTranslations } from "next-intl/server";

import { fullURL } from "~/data/meta/builder";
import { env } from "~/env.mjs";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "~/islands/navigation/page-header";
import { ProductBuilder } from "~/islands/product-building";
import { Shell } from "~/islands/wrappers/shell-variants";
import { Link } from "~/navigation";
import { getCartItemsAction } from "~/server/actions/cart";
import { getProductsAction } from "~/server/actions/product";
import { getCartId } from "~/server/cart";
import { productCategories } from "~/server/config/products";

export const metadata: Metadata = {
  metadataBase: fullURL(),
  title: "Build a Board",
  description: "Select the components for your board",
};

interface CustomClothesPageProperties {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function CustomClothesPage({
  searchParams,
}: CustomClothesPageProperties) {
  const { page, per_page, sort, subcategory, price_range } = searchParams;

  const t = await getTranslations();

  // Products transaction
  const limit = typeof per_page === "string" ? parseInt(per_page) : 8;
  const offset = typeof page === "string" ? (parseInt(page) - 1) * limit : 0;
  const activeSubcategory =
    typeof subcategory === "string" ? subcategory : "decks";

  const productsTransaction = await getProductsAction({
    limit,
    offset,
    sort: typeof sort === "string" ? sort : null,
    subcategories: activeSubcategory,
    price_range: typeof price_range === "string" ? price_range : null,
  });

  const pageCount = Math.ceil(productsTransaction.count / limit);

  // Get cart items
  // console.log("⏳ awaiting getCartId for CustomClothesPage...");
  const cartId = await getCartId();
  // console.log("get custom clothing's `cartId`:", cartId);
  const cartItems = await getCartItemsAction({ cartId: Number(cartId) });

  return (
    <Shell className="gap-4">
      <PageHeader
        id="custom-clothing-header"
        aria-labelledby="custom-clothing-header-heading"
      >
        <PageHeaderHeading size="sm">Build a Board</PageHeaderHeading>
        <PageHeaderDescription size="sm">
          Select the components for your board
        </PageHeaderDescription>
      </PageHeader>
      <section
        id="custom-clothing-categories"
        aria-labelledby="custom-clothing-categories-heading"
        className="sticky top-14 z-30 w-full shrink-0 overflow-hidden bg-background/50 pb-4 pt-6 shadow-md sm:backdrop-blur"
      >
        <div className="grid place-items-center overflow-x-auto">
          <div className="inline-flex w-fit items-center rounded border bg-background p-1 text-muted-foreground shadow-2xl">
            {productCategories[0]?.subcategories.map((subcategory) => (
              <Link
                aria-label={subcategory.title}
                key={subcategory.title}
                href={`/custom/clothing?subcategory=${subcategory.slug}`}
                scroll={false}
              >
                <div
                  className={cn(
                    "inline-flex items-center justify-center whitespace-nowrap rounded border-b-2 border-transparent px-3 py-1.5 text-sm font-medium ring-offset-background transition-all hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                    subcategory.slug === activeSubcategory &&
                      "rounded-none border-primary text-foreground hover:rounded-t",
                  )}
                >
                  {(
                    cartItems
                      ?.map((item) => item.subcategory)
                      ?.includes(subcategory.slug)
                  ) ?
                    <CheckIcon className="mr-2 h-4 w-4" aria-hidden="true" />
                  : <CircleIcon className="mr-2 h-4 w-4" aria-hidden="true" />}
                  {subcategory.title}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <ProductBuilder
        id="custom-clothing-products"
        aria-labelledby="custom-clothing-products-heading"
        products={productsTransaction.items}
        pageCount={pageCount}
        subcategory={activeSubcategory}
        cartItems={cartItems ?? []}
        tAddToCart={t("store.product.addToCart")}
      />
    </Shell>
  );
}
