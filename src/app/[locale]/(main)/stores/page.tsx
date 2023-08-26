import { type Metadata } from "next";

import { getStoresAction } from "~/server/actions/store";
import { env } from "~/data/env";
import { fullURL } from "~/data/meta/builder";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading
} from "~/islands/page-header";
import { Shell } from "~/islands/shells/shell";
import { Stores } from "~/islands/stores";

export const metadata: Metadata = {
  metadataBase: fullURL(),
  title: "Stores",
  description: "Buy stores from our stores"
};

interface StoresPageProps {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

export default async function StoresPage({ searchParams }: StoresPageProps) {
  const { page, per_page, sort, statuses } = searchParams ?? {};

  // Stores transaction
  const limit = typeof per_page === "string" ? parseInt(per_page) : 8;
  const offset = typeof page === "string" ? (parseInt(page) - 1) * limit : 0;

  const storesTransaction = await getStoresAction({
    limit: limit,
    offset: offset,
    sort: typeof sort === "string" ? sort : "productCount.desc",
    statuses: typeof statuses === "string" ? statuses : null
  });

  const pageCount = Math.ceil(storesTransaction.total / limit);

  return (
    <Shell>
      <PageHeader
        id="stores-page-header"
        aria-labelledby="stores-page-header-heading"
      >
        <PageHeaderHeading size="sm">Stores</PageHeaderHeading>
        <PageHeaderDescription size="sm">
          Buy products from our stores
        </PageHeaderDescription>
      </PageHeader>
      <Stores
        id="stores-page-stores"
        aria-labelledby="stores-page-stores-heading"
        stores={storesTransaction.items}
        pageCount={pageCount}
      />
    </Shell>
  );
}
