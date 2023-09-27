import { type Metadata } from "next";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import { authOptions } from "~/server/auth";
// import { env } from "~/data/env/env.mjs";
import { fullURL } from "~/data/meta/builder";
import { AddProductForm } from "~/forms/add-product-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/islands/primitives/card";

export const metadata: Metadata = {
  metadataBase: fullURL(),
  title: "New Product",
  description: "Add a new product",
};

interface NewProductPageProps {
  params: {
    storeId: string;
  };
}

export default async function NewProductPage({ params }: NewProductPageProps) {
  const storeId = Number(params.storeId);

  const session = await getServerSession(authOptions());

  if (!session) {
    redirect("/sign-in");
  }

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
