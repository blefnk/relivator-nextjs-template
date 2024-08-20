import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/utils/reliverse/cn";
import { formatPrice } from "@/utils/reliverse/number";
import { authProvider } from "~/../reliverse.config";
import { getCookie } from "cookies-next";
import { and, desc, eq, not } from "drizzle-orm";
import { getTranslations } from "next-intl/server";
import { titleCase } from "string-ts";

import type { Product } from "~/db/schema/provider";

import { authjs } from "~/auth/authjs";
import { clerk } from "~/auth/clerk";
import { CartAddForm } from "~/components/Forms/CartAddForm";
import { ProductCard } from "~/components/Modules/Cards/ProductCard";
import { Breadcrumbs } from "~/components/Navigation/Pagination/Breadcrumbs";
import { Shell } from "~/components/Wrappers/ShellVariants";
import { db } from "~/db";
import { products, stores } from "~/db/schema/provider";
import { env } from "~/env";

type ProductPageProps = {
  params: {
    productId: string;
  };
};

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const productId = Number(params.productId);

  const product = await db.query.products.findFirst({
    columns: {
      name: true,
      description: true,
    },
    where: eq(products.id, String(productId)),
  });

  if (!product) {
    return {};
  }

  return {
    description: product.description,
    title: titleCase(product.name),
  };
}

// eslint-disable-next-line complexity
export default async function ProductPage({ params }: ProductPageProps) {
  const session = authProvider === "clerk" ? await clerk() : await authjs();
  const guestEmail = getCookie?.("GUEST_EMAIL")?.toString() || null;

  const t = await getTranslations();

  const productId = Number(params.productId);

  const product = await db.query.products.findFirst({
    columns: {
      id: true,
      name: true,
      category: true,
      description: true,
      images: true,
      price: true,
      storeId: true,
    },
    where: eq(products.id, String(productId)),
  });

  if (!product) {
    notFound();
  }

  const store = await db.query.stores.findFirst({
    columns: {
      id: true,
      name: true,
    },
    where: eq(stores.id, String(product.storeId)),
  });

  const otherProducts = store
    ? await db
        .select({
          id: products.id,
          name: products.name,
          category: products.category,
          images: products.images,
          inventory: products.inventory,
          price: products.price,
        })
        .from(products)
        .limit(4)
        .where(
          and(
            eq(products.storeId, product.storeId),
            not(eq(products.id, String(productId))),
          ),
        )
        .orderBy(desc(products.inventory))
    : [];

  return (
    <Shell>
      <Breadcrumbs
        segments={[
          {
            href: "/products",
            title: String(t("store.products.products")),
          },
          {
            href: `/products?category=${product.category}`,
            title: titleCase(product.category || ""),
          },
          {
            href: `/product/${product.id}`,
            title: product.name,
          },
        ]}
      />
      <div
        className={`
          flex flex-col gap-8

          md:flex-row md:gap-16
        `}
      >
        {/* <ProductImageCarousel
          className="w-full md:w-1/2"
          images={product.images || []}
          options={{ loop: true }}
        /> */}
        <Separator
          className={`
            mt-4

            md:hidden
          `}
        />
        <div
          className={`
            flex w-full flex-col gap-4

            md:w-1/2
          `}
        >
          <div className="space-y-2">
            <h2 className="line-clamp-1 text-2xl font-bold">{product.name}</h2>
            <p className="text-base text-muted-foreground">
              {formatPrice(product.price)}
            </p>
            {store ? (
              <Link
                className={`
                  line-clamp-1 inline-block text-base text-muted-foreground

                  hover:underline
                `}
                href={`/products?store_ids=${store.id}`}
              >
                {store.name}
              </Link>
            ) : null}
          </div>
          <Separator className="my-1.5" />
          {guestEmail || session ? (
            <>
              {store && (
                <CartAddForm
                  productId={productId}
                  storeId={store.id}
                  tAddToCart={t("store.products.addToCart")}
                />
              )}
            </>
          ) : (
            <Link
              className={cn(
                buttonVariants({
                  size: "default",
                  variant: "secondary",
                }),
                "max-w-[164px] whitespace-nowrap",
              )}
              href="/auth/sign-in"
            >
              {t("store.products.addToCart")}
            </Link>
          )}
          <Separator className="mt-5" />
          <Accordion
            className="w-full"
            collapsible
            defaultValue="description"
            type="single"
          >
            <AccordionItem value="description">
              <AccordionTrigger>
                {t("store.products.description")}
              </AccordionTrigger>
              <AccordionContent>
                {product.description && product.description.length > 0
                  ? product.description
                  : String(t("store.products.noDescription"))}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
      {env.NODE_ENV === "development" && (
        <>
          <Separator />
          <h1 className="font-semibold">{t("page.localhostOnlyDebugInfo")}</h1>
          <div className="space-y-2">
            <p>store.id: {store?.id}</p>
            <p>productId: {productId}</p>
            <p>product.storeId: {product.storeId}</p>
            <p>product.price: {product.price}</p>
            <p>store.name: {store?.name}</p>
            <p>product.category: {product.category}</p>
            <p>product.name: {product.name}</p>
            <p>guestEmail: {guestEmail || "not set or not found in cookie"}</p>
          </div>
          {store && otherProducts.length > 0 ? <Separator /> : null}
        </>
      )}
      {store && otherProducts.length > 0 ? (
        <div
          className={`
            overflow-hidden

            md:pt-6
          `}
        >
          <h2 className="line-clamp-1 flex-1 text-2xl font-bold">
            {t("store.products.moreProductsFrom", {
              storeName: store.name,
            })}
          </h2>
          <div className="overflow-x-auto pb-2 pt-6">
            <div className="flex w-fit gap-4">
              {otherProducts.map((product) => (
                <ProductCard
                  className="min-w-[260px]"
                  key={product.id}
                  product={product as Product}
                  storeId={product.id}
                  tAddToCart={t("store.products.addToCart")}
                />
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </Shell>
  );
}
