import { and, eq } from "drizzle-orm";
import { type Metadata } from "next";
import { notFound } from "next/navigation";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { env } from "~/env.js";
import { db } from "~/server/db";
import { products } from "~/server/db/schema";
import { getCategories, getSubcategories } from "~/server/queries/product";

import { UpdateProductForm } from "./_components/update-product-form";

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
  title: "Manage Product",
  description: "Manage your product",
};

type UpdateProductPageProps = {
  params: {
    storeId: string;
    productId: string;
  };
};

export default async function UpdateProductPage({
  params,
}: UpdateProductPageProps) {
  const storeId = decodeURIComponent(params.storeId);
  const productId = decodeURIComponent(params.productId);

  const product = await db.query.products.findFirst({
    where: and(eq(products.id, productId), eq(products.storeId, storeId)),
  });

  if (!product) {
    notFound();
  }

  const promises = Promise.all([getCategories(), getSubcategories()]).then(
    ([categories, subcategories]) => ({ categories, subcategories }),
  );

  return (
    <Card>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Update product</CardTitle>
        <CardDescription>
          Update your product information, or delete it
        </CardDescription>
      </CardHeader>
      <CardContent>
        <UpdateProductForm promises={promises} product={product} />
      </CardContent>
    </Card>
  );
}
