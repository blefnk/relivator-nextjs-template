import type { Metadata } from "next";

// import { getStoresAction } from "@/actions/reliverse//store";
// import { storesSearchParametersSchema } from "@/actions/reliverse/validations/parameters";
// import consola from "consola";
// import { Stores } from "~/components/Common/stores";
import { getTranslations } from "next-intl/server";

import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "~/components/Navigation/PageNavMenu";
import { Shell } from "~/components/Wrappers/ShellVariants";

export const metadata: Metadata = {
  description: "Buy stores from our stores",

  title: "Stores",
};

// type StoresPageProps = {
//   searchParams: Record<string, string | string[] | undefined>;
// };

// export default async function StoresPage({ searchParams }: StoresPageProps) {
export default async function StoresPage() {
  // const { page, per_page, sort, statuses } =
  // storesSearchParametersSchema.parse(searchParams);

  const t = await getTranslations();

  // Stores transaction
  // const pageAsNumber = Number(page);

  // const fallbackPage =
  // Number.isNaN(pageAsNumber) || pageAsNumber < 1 ? 1 : pageAsNumber;

  // const perPageAsNumber = Number(per_page);
  // const limit = Number.isNaN(perPageAsNumber) ? 10 : perPageAsNumber;
  // const offset = fallbackPage > 0 ? (fallbackPage - 1) * limit : 0;

  // try {
  //   const storesTransaction = await getStoresAction({
  //     limit,
  //     offset,
  //     sort,
  //     statuses,
  //   });
  // } catch (error) {
  //   consola.error(error);
  // }

  // // @ts-expect-error TODO: fix
  // const pageCount = Math.ceil(storesTransaction.count / limit);

  return (
    <Shell>
      <PageHeader
        aria-labelledby="stores-page-header-heading"
        id="stores-page-header"
      >
        <PageHeaderHeading size="sm">
          {t("store.products.products")}
        </PageHeaderHeading>
        <PageHeaderDescription size="sm">
          {t("store.stores.buy-products")}
        </PageHeaderDescription>
        <br />
        <PageHeaderHeading size="sm">
          Oops... Stores page is temporarily disabled...
        </PageHeaderHeading>
        <PageHeaderDescription size="sm">
          We are working on this page. It will be live again soon. Stay tuned
          for updates.
        </PageHeaderDescription>
      </PageHeader>
      {/* <Stores
        aria-labelledby="stores-page-stores-heading"
        id="stores-page-stores"
        pageCount={pageCount} // @ts-expect-error TODO: fix
        stores={storesTransaction.items}
      /> */}
    </Shell>
  );
}
