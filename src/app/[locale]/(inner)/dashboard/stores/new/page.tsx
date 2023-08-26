import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs";

import { env } from "~/data/env";
import { fullURL } from "~/data/meta/builder";
import { AddStoreForm } from "~/forms/add-store-form";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading
} from "~/islands/page-header";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "~/islands/primitives/card";
import { Shell } from "~/islands/shells/shell";

export const metadata: Metadata = {
  metadataBase: fullURL(),
  title: "New Store",
  description: "Add a new store"
};

export default async function NewStorePage() {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  return (
    <Shell variant="sidebar">
      <PageHeader
        id="new-store-page-header"
        aria-labelledby="new-store-page-header-heading"
      >
        <PageHeaderHeading size="sm">New Store</PageHeaderHeading>
        <PageHeaderDescription size="sm">
          Add a new store to your account
        </PageHeaderDescription>
      </PageHeader>
      <Card
        as="section"
        id="new-store-page-form-container"
        aria-labelledby="new-store-page-form-heading"
      >
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Add store</CardTitle>
          <CardDescription>Add a new store to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <AddStoreForm userId={user.id} />
        </CardContent>
      </Card>
    </Shell>
  );
}
