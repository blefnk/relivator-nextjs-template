import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { eq } from "drizzle-orm";

import { db } from "~/data/db/client";
import { stores } from "~/data/db/schema";
import { env } from "~/data/env";
import { fullURL } from "~/data/meta/builder";

export const metadata: Metadata = {
  metadataBase: fullURL(),
  title: "Orders",
  description: "Manage your orders"
};

interface OrdersPageProps {
  params: {
    storeId: string;
  };
}

export default async function OrdersPage({ params }: OrdersPageProps) {
  const storeId = Number(params.storeId);

  const store = await db.query.stores.findFirst({
    where: eq(stores.id, storeId),
    columns: {
      id: true,
      name: true,
      description: true
    }
  });

  if (!store) {
    notFound();
  }

  return <div>Orders Table</div>;
}
