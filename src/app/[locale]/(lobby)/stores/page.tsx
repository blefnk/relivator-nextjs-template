import { type Metadata } from "next";
import { env } from "~/env.js";
import type { SearchParams } from "~/types";

import { getProducts } from "~/lib/queries/product";
import { AlertCard } from "~/components/alert-card";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "~/components/page-header";
import { Shell } from "~/components/shell";

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
  title: "Stores",
  description: "Discover products from our stores",
};

interface StoresPageProps {
  searchParams: SearchParams;
}

export default async function StoresPage({ searchParams }: StoresPageProps) {
  const productsTransaction = await getProducts(searchParams);

  return (
    <Shell>
      <PageHeader>
        <PageHeaderHeading size="sm">Stores</PageHeaderHeading>
        <PageHeaderDescription size="sm">
          Discover our stores and their products
        </PageHeaderDescription>
      </PageHeader>
      <AlertCard />
    </Shell>
  );
}
