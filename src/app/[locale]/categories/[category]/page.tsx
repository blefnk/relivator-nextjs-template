import type { Metadata } from "next";

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
import { toTitleCase } from "~/server/utils";

type CategoryPageProps = {
  params: Promise<{ category: string }>;
  searchParams: SearchParams;
};

export async function generateMetadata({
  params,
}: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const { category } = await params;

  return {
    metadataBase: new URL(env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
    title: toTitleCase(category),
    description: `Buy products from the ${category} category`,
  };
}

export default async function CategoryPage({
  params,
  searchParams,
}: CategoryPageProps) {
  const { category: encodedCategory } = await params;
  const category = decodeURIComponent(encodedCategory);

  const productsTransaction = await getProducts(searchParams);

  return (
    <Shell>
      <PageHeader>
        <PageHeaderHeading size="sm">{toTitleCase(category)}</PageHeaderHeading>
        <PageHeaderDescription size="sm">
          {`Buy ${category} from the best stores`}
        </PageHeaderDescription>
      </PageHeader>
      <AlertCard />
    </Shell>
  );
}
