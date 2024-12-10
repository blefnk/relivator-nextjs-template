import type { Metadata } from "next";

import { AlertCard } from "~/components/alert-card";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "~/components/page-header";
import { Products } from "~/components/products";
import { Shell } from "~/components/shell";
import { env } from "~/env.js";
import { getProducts } from "~/server/queries/product";
import { getStores } from "~/server/queries/store";
import { toTitleCase, unslugify } from "~/server/utils";
import { productsSearchParamsSchema } from "~/server/validations/params";

type SubcategoryPageProps = {
  params: Promise<{
    category: string;
    subcategory: string;
  }>;
  searchParams: Record<string, string | string[] | undefined>;
};

/* export async function generateMetadata({
  params,
}: SubcategoryPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const { category, subcategory } = resolvedParams;
  const subcategoryTitle = unslugify(subcategory);

  return {
    metadataBase: new URL(env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
    title: toTitleCase(subcategoryTitle),
    description: `Buy the best ${subcategoryTitle}`,
  };
} */

export default async function SubcategoryPage({
  params,
  searchParams,
}: SubcategoryPageProps) {
  /* const resolvedParams = await params;
  const { category, subcategory } = resolvedParams;

  const subcategoryTitle = unslugify(subcategory);
  const { page, per_page, sort, price_range, store_ids, store_page, active } =
    productsSearchParamsSchema.parse(searchParams);

  // Products transaction
  const limit = typeof per_page === "string" ? parseInt(per_page) : 8;
  const offset = typeof page === "string" ? (parseInt(page) - 1) * limit : 0;

  const productsTransaction = await getProducts(searchParams);

  // Stores transaction
  const storesLimit = 25;
  const storesOffset =
    typeof store_page === "string"
      ? (parseInt(store_page) - 1) * storesLimit
      : 0;

  const storesTransaction = await getStores(searchParams); */

  return (
    <Shell className="mt-20">
      <AlertCard />
      {/* <PageHeader>
        <PageHeaderHeading size="sm">
          {toTitleCase(subcategoryTitle)}
        </PageHeaderHeading>
        <PageHeaderDescription size="sm">
          {`Buy the best ${subcategoryTitle}`}
        </PageHeaderDescription>
      </PageHeader> */}
      {/* <Products
        products={productsTransaction.data}
        pageCount={productsTransaction.pageCount}
        stores={storesTransaction.data}
        storePageCount={storesTransaction.pageCount}
      /> */}
    </Shell>
  );
}
