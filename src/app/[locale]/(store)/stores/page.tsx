import { type Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { fullURL } from "~/data/meta/builder";
import { storesSearchParamsSchema } from "~/data/validations/params";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "~/islands/navigation/page-header";
import { Stores } from "~/islands/stores";
import { Shell } from "~/islands/wrappers/shell-variants";
import { getStoresAction } from "~/server/actions/store";

export const metadata: Metadata = {
  metadataBase: fullURL(),
  title: "Stores",
  description: "Buy stores from our stores",
};

interface StoresPageProperties {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

export default async function StoresPage({
  searchParams,
}: StoresPageProperties) {
  const { page, per_page, sort, statuses } =
    storesSearchParamsSchema.parse(searchParams);

  const t = await getTranslations();

  // Stores transaction
  const pageAsNumber = Number(page);
  const fallbackPage =
    Number.isNaN(pageAsNumber) || pageAsNumber < 1 ? 1 : pageAsNumber;
  const perPageAsNumber = Number(per_page);
  const limit = Number.isNaN(perPageAsNumber) ? 10 : perPageAsNumber;
  const offset = fallbackPage > 0 ? (fallbackPage - 1) * limit : 0;

  const storesTransaction = await getStoresAction({
    limit,
    offset,
    sort,
    statuses,
  });

  const pageCount = Math.ceil(storesTransaction.count / limit);

  return (
    <Shell>
      <PageHeader
        id="stores-page-header"
        aria-labelledby="stores-page-header-heading"
      >
        <PageHeaderHeading size="sm">
          {t("store.product.products")}
        </PageHeaderHeading>
        <PageHeaderDescription size="sm">
          {t("store.stores.buy-products")}
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
