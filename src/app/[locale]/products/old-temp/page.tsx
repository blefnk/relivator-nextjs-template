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
// import { authjs } from "~/auth/authjs";
// import { clerk } from "~/auth/clerk";

// import { Products } from "~/components/Common/products";
// import {
//   PageHeader,
//   PageHeaderDescription,
//   PageHeaderHeading,
// } from "~/components/Navigation/PageNavMenu";
// import { Shell } from "~/components/Wrappers/ShellVariants";
//
// import { products } from "~/db/schema/provider";
// import { getProductsAction } from "@/actions/reliverse//product";
// import { getStoresAction } from "@/actions/reliverse//store";
//
// export default async function ProductsPage({
//   searchParams,
// }) {
export default async function ProductsPage() {
  // const {
  //   categories,
  //   page,
  //   per_page,
  //   price_range,
  //   sort,
  //   store_ids,
  //   store_page,
  //   subcategories,
  // } = productsSearchParametersSchema.parse(searchParams);
  // // Products transaction
  // const pageAsNumber = Number(page);
  // const fallbackPage =
  //   Number.isNaN(pageAsNumber) || pageAsNumber < 1 ? 1 : pageAsNumber;
  // const perPageAsNumber = Number(per_page);
  // // Number of items per page
  // const limit = Number.isNaN(perPageAsNumber) ? 10 : perPageAsNumber;
  // // Number of items to skip
  // const offset = fallbackPage > 0 ? (fallbackPage - 1) * limit : 0;
  // const productsTransaction = await getProductsAction({
  //   categories,
  //   limit,
  //   offset,
  //   price_range,
  //   sort,
  //   store_ids,
  //   subcategories,
  // });
  // const pageCount = math.ceil(Number(productsTransaction.count) / limit);
  // // Stores transaction
  // const storesPageAsNumber = Number(store_page);
  // const fallbackStoresPage =
  //   Number.isNaN(storesPageAsNumber) || storesPageAsNumber < 1
  //     ? 1
  //     : storesPageAsNumber;
  // const storesLimit = 40;
  // const storesOffset =
  //   fallbackStoresPage > 0 ? (fallbackStoresPage - 1) * storesLimit : 0;
  // const storesTransaction = await getStoresAction({
  //   limit: storesLimit,
  //   offset: storesOffset,
  //   sort: "productCount.desc",
  // });
  // const storePageCount = math.ceil(
  //   Number(storesTransaction.count) / storesLimit,
  // );
  // const session = await authjs();
  return (
    <div>
      Products Old Page (should be removed - temp)
      {/* <Shell> */}
      {/* <PageHeader>
        <PageHeaderHeading size="sm">
          {t("store.products.products")}
        </PageHeaderHeading>
        <PageHeaderDescription size="sm">
          {t("store.products.buyProductsFromOurStores")}
        </PageHeaderDescription>
      </PageHeader> */}
      {/* <Products
        categories={Object.values(products.category.enumValues)}
        pageCount={pageCount}
        products={productsTransaction.items}
        session={session}
        storePageCount={storePageCount}
        stores={storesTransaction.items}
        tAddToCart={t("store.products.addToCart")}
      /> */}
      {/* </Shell> */}
    </div>
  );
}
