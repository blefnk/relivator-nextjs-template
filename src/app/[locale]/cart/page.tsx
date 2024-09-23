import type { Metadata } from "next";

import { getTranslations } from "next-intl/server";

import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "~/components/Navigation/PageNavMenu";
import { Shell } from "~/components/Wrappers/ShellVariants";

export const metadata: Metadata = {
  description: "Checkout with the cart items",
  title: "Cart",
};

export default async function CartPage() {
  const t = await getTranslations();

  return (
    <Shell>
      <PageHeader
        id="cart-page-header"
        aria-labelledby="cart-page-header-heading"
      >
        <PageHeaderHeading size="sm">{t("checkout.Title")}</PageHeaderHeading>
        <PageHeaderDescription size="sm">
          {t("checkout.Description")}
        </PageHeaderDescription>
      </PageHeader>
      The page is currently under construction.
    </Shell>
  );
}
