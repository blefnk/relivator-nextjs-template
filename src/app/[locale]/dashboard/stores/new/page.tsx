import type { Metadata } from "next";
import { redirect } from "next/navigation";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { authProvider } from "~/auth";
import { authjs } from "~/auth/authjs";
import { clerk } from "~/auth/clerk";
import { StoreAddForm } from "~/components/Forms";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "~/components/Navigation/PageNavMenu";
import { Shell } from "~/components/Wrappers/ShellVariants";

export const metadata: Metadata = {
  description: "Add a new store",
  title: "New Store",
};

export default async function NewStorePage() {
  // const user = await revalidateUser();
  const user = authProvider === "clerk" ? await clerk() : await authjs();

  if (!user) {
    redirect("/auth");
  }

  // consola.info(user);
  return (
    <Shell variant="sidebar">
      <PageHeader
        aria-labelledby="new-store-page-header-heading"
        id="new-store-page-header"
      >
        <PageHeaderHeading size="sm">New Store</PageHeaderHeading>
        <PageHeaderDescription size="sm">
          Add a new store to the account
        </PageHeaderDescription>
      </PageHeader>
      <Card
        aria-labelledby="new-store-page-form-heading"
        id="new-store-page-form-container"
      >
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Add store</CardTitle>
          <CardDescription>Add a new store to the account</CardDescription>
        </CardHeader>
        <CardContent>
          <StoreAddForm userId={user.id} />
        </CardContent>
      </Card>
    </Shell>
  );
}
