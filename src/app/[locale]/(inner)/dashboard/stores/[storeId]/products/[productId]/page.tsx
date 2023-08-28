import { type Metadata } from "next";
import { notFound } from "next/navigation";
import { and, eq } from "drizzle-orm";

import { db } from "~/data/db/client";
import { products } from "~/data/db/schema";
import { env } from "~/data/env";
import { fullURL } from "~/data/meta/builder";
import { UpdateProductForm } from "~/forms/update-product-form";
import { ProductPager } from "~/islands/navigation/pagination/product-pager";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "~/islands/primitives/card";

export const metadata: Metadata = {
  metadataBase: fullURL(),
  title: "Manage Product",
  description: "Manage your product"
};

interface UpdateProductPageProps {
  params: {
    storeId: string;
    productId: string;
  };
}

export default async function UpdateProductPage({
  params
}: UpdateProductPageProps) {
  const storeId = Number(params.storeId);
  const productId = Number(params.productId);

  const product = await db.query.products.findFirst({
    where: and(eq(products.id, productId), eq(products.storeId, storeId))
  });

  if (!product) {
    notFound();
  }

  return (
    <Card>
      <CardHeader className="space-y-1">
        <div className="flex items-center justify-between space-x-2">
          <CardTitle className="text-2xl">Update product</CardTitle>
          <ProductPager product={product} />
        </div>
        <CardDescription>
          Update your product information, or delete it
        </CardDescription>
      </CardHeader>
      <CardContent>
        <UpdateProductForm product={product} />
      </CardContent>
    </Card>
  );
}
