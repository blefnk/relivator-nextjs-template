import { type Metadata } from "next";
import { redirect } from "next/navigation";

import { fullURL } from "~/data/meta/builder";
import { AddProductForm } from "~/forms/add-product-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/islands/primitives/card";
import { getServerAuthSession } from "~/utils/users";

export const metadata: Metadata = {
  metadataBase: fullURL(),
  title: "New Product",
  description: "Add a new product",
};

type NewProductPageProps = {
  params: {
    storeId: string;
  };
};

export default async function NewProductPage({ params }: NewProductPageProps) {
  const user = await getServerAuthSession();
  if (!user) redirect("/auth");

  const storeId = Number(params.storeId);

  return (
    <Card>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Add product</CardTitle>
        <CardDescription>Add a new product to your store</CardDescription>
      </CardHeader>
      <CardContent>
        <AddProductForm storeId={storeId} />
      </CardContent>
    </Card>
  );
}
