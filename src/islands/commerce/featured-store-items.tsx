import { cn } from "~/utils";
import { getCookie } from "cookies-next";
import { desc, eq, sql } from "drizzle-orm";
import { getTranslations } from "next-intl/server";

import { Link as ButtonLink } from "~/core/link";
import { db } from "~/data/db";
import { products, stores, type Product, type Store } from "~/data/db/schema";
import { ProductCard } from "~/islands/modules/cards/product-card";
import { StoreCard } from "~/islands/modules/cards/store-card-default";
import { buttonVariants } from "~/islands/primitives/button";
import { Link } from "~/navigation";
import { getServerAuthSession } from "~/utils/auth/users";

export async function FeaturedStoreItems() {
  // todo: fix strange product images browser console warning message:
  // todo: "Ignoring unsupported entryTypes: largest-contentful-paint"

  const t = await getTranslations();

  const someProducts = await db
    .select({
      id: products.id,
      name: products.name,
      storeId: products.storeId,
      images: products.images,
      category: products.category,
      price: products.price,
      inventory: products.inventory,
      stripeAccountId: sql`MAX(${stores.stripeAccountId})`,
    })
    .from(products)
    .limit(8)
    .leftJoin(stores, eq(products.storeId, stores.id))
    .groupBy(products.id)
    .orderBy(
      desc(sql`MAX(${stores.stripeAccountId})`),
      desc(products.createdAt),
    );

  // console.log("someProducts", someProducts);
  // console.log("someProducts.storeId", someProducts.storeId);

  const someStores = await db
    .select({
      id: stores.id,
      name: stores.name,
      description: stores.description,
      stripeAccountId: stores.stripeAccountId,
    })
    .from(stores)
    .limit(12)
    .leftJoin(products, eq(products.storeId, stores.id))
    .groupBy(stores.id)
    .orderBy(desc(stores.stripeAccountId), desc(sql<number>`count(*)`));

  const session = await getServerAuthSession();
  const guestEmail = getCookie("GUEST_EMAIL")?.toString() || null;

  return (
    <section
      id="featured-items"
      aria-labelledby="featured-items-heading"
      className="mt-10 grid grid-cols-1 items-stretch gap-6 text-card-foreground/80 sm:grid-cols-2"
    >
      <div className="rounded-lg border-2 border-dotted bg-card px-6 py-16 shadow-sm">
        <div className="flex items-baseline">
          <h3 className="mb-10 flex-1 font-heading text-xl md:flex md:text-2xl lg:text-3xl">
            <span className="mr-1 hidden md:block">Featured</span> Products
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
              <span className="hidden sm:block">View all</span>
            </div>
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {guestEmail || session ? (
            <>
              {someProducts.map((product: Product) => (
                <ProductCard
                  variant="default"
                  key={product.id}
                  product={product}
                  storeId={Number(product.storeId)}
                  tAddToCart={t("store.product.addToCart")}
                />
              ))}
            </>
          ) : (
            <>
              {someProducts.map((product: Product) => (
                <ProductCard
                  variant="guest"
                  key={product.id}
                  product={product}
                  storeId={Number(product.storeId)}
                  tAddToCart={t("store.product.addToCart")}
                />
              ))}
            </>
          )}
        </div>
      </div>

      <div className="rounded-lg border-2 border-dotted bg-card px-6 py-16 shadow-sm">
        <div className="flex items-baseline">
          <h2 className="mb-10 flex-1 font-heading text-xl md:flex md:text-2xl lg:text-3xl">
            <span className="mr-1 hidden md:block">Featured</span> Stores
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
              <span className="hidden sm:block">View all</span>
            </div>
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {someStores.map((store: Store) => (
            <StoreCard
              key={store.id}
              store={store}
              href={`/products?store_ids=${store.id}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
