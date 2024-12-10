import { type Metadata } from "next";

import type { SearchParams } from "~/types";

import { AlertCard } from "~/components/alert-card";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "~/components/page-header";
import { Shell } from "~/components/shell";
import { env } from "~/env.js";
import { getProducts } from "~/server/queries/product";

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
  title: "Products",
  description: "Buy products from our stores",
};

type ProductsPageProps = {
  searchParams: SearchParams;
};

export default async function ProductsPage({
  searchParams,
}: ProductsPageProps) {
  const productsTransaction = await getProducts(searchParams);

  return (
    <Shell>
      <PageHeader>
        <PageHeaderHeading size="sm">Products</PageHeaderHeading>
        <PageHeaderDescription size="sm">
          Buy products from our stores
        </PageHeaderDescription>
      </PageHeader>
      <AlertCard />
    </Shell>
  );
}
