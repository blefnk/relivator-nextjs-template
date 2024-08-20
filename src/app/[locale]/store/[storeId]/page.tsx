import { Shell } from "~/components/Wrappers/ShellVariants";

// import type { Metadata } from "next";
// import { notFound } from "next/navigation";

// import { getProductsAction } from "@/actions/reliverse/product-old";
// import { getStoresAction } from "@/actions/reliverse/store";
// import { Separator } from "@/components/ui/separator";
// import { eq } from "drizzle-orm";
// import { getTranslations } from "next-intl/server";
// import { authProvider } from "~/../reliverse.config";

// import { authjs } from "~/auth/authjs";
// import { clerk } from "~/auth/clerk";
// import { Products } from "~/components/Common/products";
// import { Breadcrumbs } from "~/components/Navigation/Pagination/Breadcrumbs";
// import { db } from "~/db";
// import { products, stores } from "~/db/schema/provider";

// const isString = (a: unknown) => typeof a === "string";

// type StorePageProps = {
//   params: {
//     storeId: string;
//   };
//   searchParams: Record<string, string | string[] | undefined>;
// };

// async function getStoreFromParameters({
//   storeId,
// }: {
//   storeId: string;
// }) {
//   return await db.query.stores.findFirst({
//     where: eq(stores.id, storeId),
//   });
// }

// export async function generateMetadata({
//   params,
// }: StorePageProps): Promise<Metadata> {
//   const store = await getStoreFromParameters(params);

//   if (!store) {
//     return {};
//   }

//   return {
//     description: store.description,

//     title: store.name,
//   };
// }

// export default async function StorePage({
// params,
// searchParams,
// }: StorePageProps) {
export default function StorePage() {
  // const store = await getStoreFromParameters(params);

  // if (!store) {
  //   notFound();
  // }

  // const { page, per_page, store_page } = searchParams;

  // const t = await getTranslations();

  // // Products transaction
  // const limit = isString(per_page) ? Number.parseInt(per_page) : 8;

  // const offset = isString(page) ? (Number.parseInt(page) - 1) * limit : 0;

  // const productsTransaction = await getProductsAction({
  //   limit: limit,
  //   offset: offset,
  //   page: isString(page) ? Number.parseInt(page) : 1,
  //   store_ids: String(store.id),
  // });

  // const pageCount = Math.ceil(Number(productsTransaction.count) / limit);

  // // Stores transaction
  // const storesLimit = 25;

  // const storesOffset = isString(store_page)
  //   ? (Number.parseInt(store_page) - 1) * storesLimit
  //   : 0;

  // const storesTransaction = await getStoresAction({
  //   limit: storesLimit,
  //   offset: storesOffset,
  //   sort: "name.asc",
  // });

  // const storePageCount = Math.ceil(
  //   Number(storesTransaction.count) / storesLimit,
  // );

  // const session = authProvider === "clerk" ? await clerk() : await authjs();

  return (
    <Shell>
      Temporary Disabled Page
      {/* <Breadcrumbs
        segments={[
          {
            href: "/stores",
            title: String(t("store.stores.stores")),
          },
          {
            href: `/store/${store.id}`,
            title: store.name,
          },
        ]}
      />
      <div
        className={`
          flex flex-col gap-8

          md:flex-row md:gap-16
        `}
      >
        <div className="flex w-full flex-col gap-4">
          <div className="space-y-2">
            <h2 className="line-clamp-1 text-2xl font-bold">{store.name}</h2>
            <p className="text-base text-muted-foreground">
              {store.description}
            </p>
          </div>
          <Separator className="my-1.5" />
          <Products
            categories={Object.values(products.category.enumValues)}
            pageCount={pageCount}
            products={productsTransaction.items}
            session={session}
            storePageCount={storePageCount}
            stores={storesTransaction.items}
            tAddToCart={t("store.products.addToCart")}
          />
        </div>
      </div> */}
    </Shell>
  );
}
