import type { Metadata } from "next";

import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "~/components/Navigation/PageNavMenu";
import { Shell } from "~/components/Wrappers/ShellVariants";

// TODO: finish implementing functions in this file
// import { create, all } from 'mathjs';
// import type { ConfigOptions } from 'mathjs';
// const mathjsConfig: ConfigOptions = {
//   relTol: 1e-12,
//   absTol: 1e-15,
//   matrix: 'Matrix',
//   number: 'number',
//   precision: 64,
//   predictable: false,
//   randomSeed: null
// };
// const math = create(all || {}, mathjsConfig);
// import { CheckIcon, CircleIcon } from "@radix-ui/react-icons";
// import Link from "next/link";
// import { getTranslations } from "next-intl/server";
// import { ProductBuilder } from "~/components/Common/product-building";
// import {
//   PageHeader,
//   PageHeaderDescription,
//   PageHeaderHeading,
// } from "~/components/Navigation/PageNavMenu";
// import { productCategories } from "~/constants/products";
// import { getCartItemsAction } from "@/actions/reliverse//cart";
// import { getProductsAction } from "@/actions/reliverse//product";
// import { getCartId } from "@/server/reliverse/cart";
// import { cn } from "~/utils";
// const isString = (a: unknown) => typeof a === "string";
export const metadata: Metadata = {
  description: "Select the components for the board",
  title: "Build a Board",
};

// type CustomClothesPageProps = {
//   searchParams: Record<string, string | string[] | undefined>;
// };
// export default async function CustomClothesPage({
//   searchParams,
// }: CustomClothesPageProps) {
export default async function CustomClothesPage() {
  /* const { page, per_page, price_range, sort, subcategory } = searchParams;

  const t = await getTranslations();

  // Products transaction
  const limit = isString(per_page) ? Number.parseInt(per_page) : 8;

  const offset = isString(page) ? (Number.parseInt(page) - 1) * limit : 0;

  const activeSubcategory = isString(subcategory) ? subcategory : "decks";

  const productsTransaction = await getProductsAction({
    limit,
    offset,
    price_range: isString(price_range) ? price_range : null,
    sort: isString(sort) ? sort : null,
    subcategories: activeSubcategory,
  });

  // @ts-expect-error TODO: fix
  const pageCount = math.ceil(productsTransaction.count / limit);

  const cartId = await getCartId();
  const cartItems = await getCartItemsAction({
    cartId: Number(cartId),
  }); */
  return (
    <Shell className="gap-4">
      <PageHeader>
        <PageHeaderHeading size="sm">
          Oops... Clothing page is temporarily disabled...
        </PageHeaderHeading>
        <PageHeaderDescription size="sm">
          We are working on this page. It will be live again soon. Stay tuned
          for updates.
        </PageHeaderDescription>
      </PageHeader>
      {/* <PageHeader
        aria-labelledby="custom-clothing-header-heading"
        id="custom-clothing-header"
      >
        <PageHeaderHeading size="sm">{t("page.buildABoard")}</PageHeaderHeading>
        <PageHeaderDescription size="sm">
          Select the components for the board
        </PageHeaderDescription>
      </PageHeader>
      <section
        aria-labelledby="custom-clothing-categories-heading"
        className={`
          sticky top-14 z-30 w-full shrink-0 overflow-hidden bg-background/50
          pb-4 pt-6 shadow-md

          sm:backdrop-blur
        `}
        id="custom-clothing-categories"
      >
        <div className="grid place-items-center overflow-x-auto">
          <div
            className={`
              inline-flex w-fit items-center rounded border bg-background p-1
              text-muted-foreground shadow-2xl
            `}
          >
            {productCategories[0]?.subcategories.map((subcategory) => (
              <Link
                aria-label={subcategory.title}
                href={`/custom/clothing?subcategory=${subcategory.slug}`}
                key={subcategory.title}
                scroll={false}
              >
                <div
                  className={cn(
                    `
                      inline-flex items-center justify-center whitespace-nowrap
                      rounded border-b-2 border-transparent px-3 py-1.5 text-sm
                      font-medium ring-offset-background transition-all

                      focus-visible:outline-none focus-visible:ring-2
                      focus-visible:ring-ring focus-visible:ring-offset-2

                      hover:bg-muted hover:text-foreground
                    `,
                    subcategory.slug === activeSubcategory &&
                      `
                        rounded-none border-primary text-foreground

                        hover:rounded-t
                      `,
                  )}
                >
                  {cartItems
                    ?.map((item) => item.subcategory)
                    ?.includes(subcategory.slug) ? (
                    <CheckIcon aria-hidden="true" className="mr-2 size-4" />
                  ) : (
                    <CircleIcon aria-hidden="true" className="mr-2 size-4" />
                  )}
                  {subcategory.title}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <ProductBuilder
        aria-labelledby="custom-clothing-products-heading"
        cartItems={cartItems || []}
        id="custom-clothing-products"
        pageCount={pageCount}
        products={productsTransaction.items}
        subcategory={activeSubcategory}
        tAddToCart={t("store.products.addToCart")}
      /> */}
    </Shell>
  );
}
