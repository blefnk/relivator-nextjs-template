import type { ReactElement } from "react";

import Link from "next/link";
import { redirect } from "next/navigation";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/utils";
import { Edit, Mail, View } from "lucide-react";
import { authProvider } from "reliverse.config";

import { authjs } from "~/auth/authjs";
import { clerk } from "~/auth/clerk";
import { GeneralShell } from "~/components/Wrappers/GeneralShell";
import AdminProductsManagement from "~/core/trpc-old/tanstack/products-admin";

export default async function AdminMainPage(): Promise<ReactElement> {
  const session = authProvider === "clerk" ? await clerk() : await authjs();

  if (!session) {
    return redirect("/auth");
  }

  // TODO: Implement email system
  // const email = "blefnk@gmail.com";
  // const firstName = "Nazarii";
  // enum Templates {
  // Onboard = "ONBOARD",
  // }
  // await sendEmails([email], { firstName }, Templates.Onboard); */

  return (
    <GeneralShell>
      <h1 className="mt-12 text-lg font-semibold">Admin Page</h1>
      <p className="-mt-3 text-muted-foreground">
        The page is still in development. Currently you can create the new pages
        and components here, likewise play with tRPC and TanStack Query below
        (use also TanStack DevTools on localhost).
      </p>
      <hr className="my-2" />
      <section className="flex space-x-8">
        <section className="mb-12 space-y-4">
          <h2>Create New Page</h2>
          <p className="text-muted-foreground">
            /src/app/[locale]/admin/* will be used
          </p>
          {/* <Creating type="page" /> */}
          Soon...
        </section>
        <section className="mb-12 space-y-4">
          <h2>Create New Component</h2>
          <p className="text-muted-foreground">
            /src/components/(cms)/* will be used
          </p>
          {/* <Creating type="component" /> */}
          Soon...
        </section>
        <section className="mb-12 space-y-4">
          <h2>Create New Post</h2>
          <Link
            className={cn(
              buttonVariants({
                size: "default",
                variant: "secondary",
              }),
              "",
            )}
            href="/blog/new"
          >
            <Edit aria-hidden="true" className="mr-2 size-4" />
            Create post
          </Link>
          <br />
          <Link
            className={cn(
              buttonVariants({
                size: "default",
                variant: "secondary",
              }),
              "",
            )}
            href="/blog"
          >
            <View aria-hidden="true" className="mr-2 size-4" />
            See all posts
          </Link>
        </section>
        <section className="mb-12 space-y-4">
          <h2>Edit User Privileges</h2>
          <p>Not implemented yet</p>
          {/* <ButtonSetPrivileges newRole="user" userId={session.id} /> */}
        </section>
        {/* TODO: Implement email system */}
        <section className="mb-12 space-y-4">
          <h2>Test Email Delivery</h2>
          <span
            className={cn(
              buttonVariants({
                size: "default",
                variant: "secondary",
              }),
              "",
            )}
          >
            <Mail className="mr-2 size-4" aria-hidden="true" />
            Send test email to {session.email}
          </span>
        </section>
      </section>
      <hr />
      <AdminProductsManagement />
    </GeneralShell>
  );
}
