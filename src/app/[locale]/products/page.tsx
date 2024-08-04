import type { Metadata } from "next";

import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "~/components/Navigation/PageNavMenu";
import { Shell } from "~/components/Wrappers/ShellVariants";

export const metadata: Metadata = {
  description: "Products catalogue",

  title: "Catalogue",
};

export default async function ProductsPage() {
  // const t = await getTranslations();

  return (
    <>
      <Shell>
        <PageHeader>
          <PageHeaderHeading size="sm">
            Oops... Products page is temporarily disabled...
          </PageHeaderHeading>
          {/* <h2 className="font-semibold">{t("store.products.catalogue")}</h2> */}
          <PageHeaderDescription size="sm">
            We are working on this page. It will be live again soon. Stay tuned
            for updates.
            {/* <ProductsCatalogue /> */}
          </PageHeaderDescription>
        </PageHeader>
      </Shell>
    </>
  );
}
