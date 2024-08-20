import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/utils/reliverse/cn";

export function HomeFeaturedItems() {
  // todo: fix strange product images browser console warning message:
  // todo: "Ignoring unsupported entryTypes: largest-contentful-paint"
  // const t = await getTranslations();
  // const someProducts = await db
  //   .select({
  //     id: products.id,
  //     storeId: products.storeId,
  //     name: products.name,
  //     category: products.category,
  //     images: products.images,
  //     inventory: products.inventory,
  //     price: products.price,
  //     stripeAccountId: sql`MAX(${stores.stripeAccountId})`,
  //   })
  //   .from(products)
  //   .limit(8)
  //   .leftJoin(stores, eq(products.storeId, stores.id))
  //   .groupBy(products.id)
  //   .orderBy(
  //     desc(sql`MAX(${stores.stripeAccountId})`),
  //     desc(products.createdAt),
  //   );
  // // consola.info("someProducts", someProducts);
  // // consola.info("someProducts.storeId", someProducts.storeId);
  // const someStores = await db
  //   .select({
  //     id: stores.id,
  //     description: stores.description,
  //     name: stores.name,
  //     stripeAccountId: stores.stripeAccountId,
  //   })
  //   .from(stores)
  //   .limit(12)
  //   .leftJoin(products, eq(products.storeId, stores.id))
  //   .groupBy(stores.id)
  //   .orderBy(desc(stores.stripeAccountId), desc(sql<number>`count(*)`));
  // const session = await authjs();
  // const guestEmail = getCookie("GUEST_EMAIL")?.toString() || null;
  return (
    <section
      aria-labelledby="featured-items-heading"
      className={`
        mt-10 grid grid-cols-1 items-stretch gap-6 text-card-foreground/80

        sm:grid-cols-2
      `}
      id="featured-items"
    >
      <div
        className={`
          rounded-lg border-2 border-dotted bg-card px-6 py-16 shadow-sm
        `}
      >
        <div className="flex items-baseline">
          <h3
            className={`
              mb-10 flex-1 text-xl font-medium

              lg:text-3xl

              md:flex md:text-2xl
            `}
          >
            <span
              className={`
                mr-1 hidden

                md:block
              `}
            >
              Featured
            </span>{" "}
            Products
          </h3>
          <Link aria-label="Products" href="/products">
            <div
              className={cn(
                buttonVariants({
                  size: "sm",
                  variant: "link",
                }),
                "text-muted-foreground",
              )}
            >
              <span
                className={`
                  hidden

                  sm:block
                `}
              >
                View all
              </span>
            </div>
          </Link>
        </div>
        <div
          className={`
            grid grid-cols-2 gap-4

            lg:grid-cols-4

            md:grid-cols-3

            sm:grid-cols-2
          `}
        >
          {/* {guestEmail || session ? (
            <>
              {someProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  // @ts-expect-error TODO: fix id type
                  storeId={Number(product.storeId)}
                  tAddToCart={t("store.products.addToCart")}
                  variant="default"
                />
              ))}
            </>
          ) : (
            <>
              {someProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  // @ts-expect-error TODO: fix id type
                  storeId={Number(product.storeId)}
                  tAddToCart={t("store.products.addToCart")}
                  variant="guest"
                />
              ))}
            </>
          )} */}
        </div>
      </div>
      <div
        className={`
          rounded-lg border-2 border-dotted bg-card px-6 py-16 shadow-sm
        `}
      >
        <div className="flex items-baseline">
          <h2
            className={`
              mb-10 flex-1 text-xl font-medium

              lg:text-3xl

              md:flex md:text-2xl
            `}
          >
            <span
              className={`
                mr-1 hidden

                md:block
              `}
            >
              Featured
            </span>{" "}
            Stores
          </h2>
          <Link aria-label="Stores" href="/stores">
            <div
              className={cn(
                buttonVariants({
                  size: "sm",
                  variant: "link",
                }),
                "text-muted-foreground",
              )}
            >
              <span
                className={`
                  hidden

                  sm:block
                `}
              >
                View all
              </span>
            </div>
          </Link>
        </div>
        <div
          className={`
            grid grid-cols-2 gap-4

            lg:grid-cols-4

            md:grid-cols-3

            sm:grid-cols-2
          `}
        >
          {/* {someStores.map((store) => (
            <StoreCard
              href={`/products?store_ids=${store.id}`}
              key={store.id}
              store={store}
            />
          ))} */}
        </div>
      </div>
    </section>
  );
}
