/**
 * Product Page
 * ============
 *
 * @see https://github.com/gustavoguichard/string-ts#-api
 */

import { type Metadata } from "next";
import { notFound } from "next/navigation";
import { formatPrice } from "~/utils";
import { getCookie, setCookie } from "cookies-next";
import { and, desc, eq, not } from "drizzle-orm";
import { getTranslations } from "next-intl/server";
import { titleCase } from "string-ts";

import { Link as ButtonLink } from "~/core/link";
import { db } from "~/data/db";
import { products, stores, users, type Product } from "~/data/db/schema";
import { env } from "~/env.mjs";
import { AddToCartForm } from "~/forms/add-to-cart-form";
import { ProductCard } from "~/islands/modules/cards/product-card";
import { Breadcrumbs } from "~/islands/navigation/pagination/breadcrumbs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/islands/primitives/accordion";
import { Separator } from "~/islands/primitives/separator";
import { ProductImageCarousel } from "~/islands/product-image-carousel";
import { Shell } from "~/islands/wrappers/shell-variants";
import { Link, redirect } from "~/navigation";
import { getServerAuthSession, getUserById } from "~/utils/auth/users";

interface ProductPageProperties {
  params: {
    productId: string;
  };
}

export async function generateMetadata({
  params,
}: ProductPageProperties): Promise<Metadata> {
  const productId = Number(params.productId);

  const product = await db.query.products.findFirst({
    columns: { name: true, description: true },
    where: eq(products.id, productId),
  });

  if (!product) return {};

  return {
    metadataBase: new URL(env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"),
    title: titleCase(product.name),
    description: product.description,
  };
}

export default async function ProductPage({ params }: ProductPageProperties) {
  const session = await getServerAuthSession();
  const guestEmail = getCookie("GUEST_EMAIL")?.toString() || null;

  const t = await getTranslations();

  const productId = Number(params.productId);

  const product: Product = await db.query.products.findFirst({
    columns: {
      id: true,
      name: true,
      description: true,
      price: true,
      images: true,
      category: true,
      storeId: true,
    },
    where: eq(products.id, productId),
  });

  if (!product) notFound();

  const store = await db.query.stores.findFirst({
    columns: { id: true, name: true },
    where: eq(stores.id, Number(product.storeId)),
  });

  const otherProducts =
    store ?
      await db
        .select({
          id: products.id,
          name: products.name,
          price: products.price,
          images: products.images,
          category: products.category,
          inventory: products.inventory,
        })
        .from(products)
        .limit(4)
        .where(
          and(
            eq(products.storeId, product.storeId),
            not(eq(products.id, productId)),
          ),
        )
        .orderBy(desc(products.inventory))
    : [];

  return (
    <Shell>
      <Breadcrumbs
        segments={[
          {
            title: `${t("store.product.products")}`,
            href: "/products",
          },
          {
            title: titleCase(product.category),
            href: `/products?category=${product.category}`,
          },
          {
            title: product.name,
            href: `/product/${product.id}`,
          },
        ]}
      />
      <div className="flex flex-col gap-8 md:flex-row md:gap-16">
        <ProductImageCarousel
          className="w-full md:w-1/2"
          images={product.images ?? []}
          options={{ loop: true }}
        />
        <Separator className="mt-4 md:hidden" />
        <div className="flex w-full flex-col gap-4 md:w-1/2">
          <div className="space-y-2">
            <h2 className="line-clamp-1 text-2xl font-bold">{product.name}</h2>
            <p className="text-base text-muted-foreground">
              {formatPrice(product.price)}
            </p>
            {store ?
              <Link
                href={`/products?store_ids=${store.id}`}
                className="line-clamp-1 inline-block text-base text-muted-foreground hover:underline"
              >
                {store.name}
              </Link>
            : null}
          </div>

          <Separator className="my-1.5" />

          {guestEmail || session ?
            <AddToCartForm
              productId={productId}
              storeId={store.id}
              tAddToCart={t("store.product.addToCart")}
            />
          : <ButtonLink
              href="/sign-in"
              size="default"
              variant="secondary"
              className="max-w-[164px] whitespace-nowrap"
            >
              {t("store.product.addToCart")}
            </ButtonLink>
          }

          <Separator className="mt-5" />

          <Accordion
            type="single"
            collapsible
            defaultValue="description"
            className="w-full"
          >
            <AccordionItem value="description">
              <AccordionTrigger>
                {t("store.product.description")}
              </AccordionTrigger>
              <AccordionContent>
                {product.description && product.description.length > 0 ?
                  product.description
                : `${t("store.product.noDescription")}`}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>

      {env.NODE_ENV === "development" && (
        <>
          <Separator />
          <h1 className="font-semibold">[localhost-only-debug-info]</h1>
          <div className="space-y-2">
            <p>store.id: {store.id}</p>
            <p>productId: {productId}</p>
            <p>product.storeId: {product.storeId}</p>
            <p>product.price: {product.price}</p>
            <p>product.inventory: {product.inventory || 0}</p>
            <p>store.name: {store.name}</p>
            <p>product.category: {product.category}</p>
            <p>product.name: {product.name}</p>
            <p>guestEmail: {guestEmail || "not set or not found in cookie"}</p>
          </div>
          {store && otherProducts.length > 0 ?
            <Separator />
          : null}
        </>
      )}

      {store && otherProducts.length > 0 ?
        <div className="overflow-hidden md:pt-6">
          <h2 className="line-clamp-1 flex-1 text-2xl font-bold">
            {t("store.product.moreProductsFrom", {
              storeName: store.name,
            })}
          </h2>
          <div className="overflow-x-auto pb-2 pt-6">
            <div className="flex w-fit gap-4">
              {otherProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  storeId={product.storeId}
                  className="min-w-[260px]"
                  tAddToCart={t("store.product.addToCart")}
                />
              ))}
            </div>
          </div>
        </div>
      : null}
    </Shell>
  );
}
