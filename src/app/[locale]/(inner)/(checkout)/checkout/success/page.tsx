import type { Metadata } from "next";
import { eq } from "drizzle-orm";

import { getCheckoutSessionProducts } from "~/server/actions/order";
import { db } from "~/data/db";
import { stores } from "~/data/db/schema";
import { env } from "~/data/env";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading
} from "~/islands/navigation/page-header";
import { Shell } from "~/islands/wrappers/shell";

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: "Order Summary",
  description: "Order summary for your purchase"
};

interface OrderSummaryPageProps {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

export default async function OrderSuccessPage({
  searchParams
}: OrderSummaryPageProps) {
  const { store_id } = searchParams ?? {};
  const storeId = typeof store_id === "string" ? Number(store_id) : undefined;

  const store = await db.query.stores.findFirst({
    columns: {
      id: true,
      name: true,
      stripeAccountId: true
    },
    where: storeId ? eq(stores.id, storeId) : undefined
  });

  const products = await getCheckoutSessionProducts({
    storeId: store?.id
  });

  return (
    <Shell>
      <PageHeader>
        <PageHeaderHeading>Thank you for your order</PageHeaderHeading>
        <PageHeaderDescription>
          Your order has been placed and will be processed as soon as possible.
        </PageHeaderDescription>
      </PageHeader>
      <pre>
        {JSON.stringify(
          {
            storeId,
            products
          },
          null,
          2
        )}
      </pre>
      {/* <section>
        <h2>Order Summary</h2>
        {store && <p>Store: {store.name}</p>}
        <ul>
          {products.map((product) => (
            <li key={product.id}>{product.name}</li>
          ))}
        </ul>
      </section> */}
    </Shell>
  );
}
