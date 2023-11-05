import { Link } from "~/navigation";
import { cn } from "~/utils";
import { desc, eq, sql } from "drizzle-orm";

import { db } from "~/data/db";
import { products, stores } from "~/data/db/schema";
import { ProductCard } from "~/islands/modules/cards/product-card";
import { StoreCard } from "~/islands/modules/cards/store-card";
import { buttonVariants } from "~/islands/primitives/button";

export async function FeaturedStoreItems() {
  const someProducts = await db
    .select({
      id: products.id,
      name: products.name,
      images: products.images,
      category: products.category,
      price: products.price,
      inventory: products.inventory,
      stripeAccountId: sql`MAX(${stores.stripeAccountId})`,
    })
    .from(products)
    .limit(4)
    .leftJoin(stores, eq(products.storeId, stores.id))
    .groupBy(products.id)
    .orderBy(
      desc(sql`MAX(${stores.stripeAccountId})`),
      desc(products.createdAt),
    );

  const someStores = await db
    .select({
      id: stores.id,
      name: stores.name,
      description: stores.description,
      stripeAccountId: stores.stripeAccountId,
    })
    .from(stores)
    .limit(4)
    .leftJoin(products, eq(products.storeId, stores.id))
    .groupBy(stores.id)
    .orderBy(desc(stores.stripeAccountId), desc(sql<number>`count(*)`));

  return (
    <section
      id="featured-items"
      aria-labelledby="featured-items-heading"
      className="grid gap-6 grid-cols-1 sm:grid-cols-2 mt-10 items-stretch text-card-foreground/80"
    >
      <div className="border-dotted border-2 rounded-lg bg-card px-6 py-16 shadow-sm">
        <div className="flex items-center">
          <h2 className="flex-1 text-xl font-heading md:text-2xl mb-10 lg:text-3xl md:flex">
            <span className="mr-1">Featured</span> Products
          </h2>
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
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {someProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      <div className="border-dotted border-2 rounded-lg bg-card px-6 py-16 shadow-sm">
        <div className="flex items-center">
          <h2 className="flex-1 text-xl font-heading md:text-2xl lg:text-3xl mb-10 md:flex">
            <span className="mr-1">Featured</span> Stores
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
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {someStores.map((store) => (
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
