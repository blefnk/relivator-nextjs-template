import { Edit, Mail, View } from "lucide-react";

import { Link } from "~/core/link";
import { sendEmails } from "~/core/mail/resend";
import AdminProductsManagement from "~/core/trpc/tanstack/products-admin";
import { GeneralShell } from "~/islands/wrappers/general-shell";
import { redirect } from "~/navigation";
import Creating from "~/plugins/builder/creating";
import { getServerAuthSession } from "~/utils/auth/users";

import ButtonSetPrivilegies from "./_islands/privilegies";

export default async function AdminMainPage() {
  const session = await getServerAuthSession();
  if (!session) return redirect("/auth");

  // TODO: Implement email system
  /* const email = "blefnk@gmail.com";
  const firstName = "Nazarii";
  enum Templates {
    Onboard = "ONBOARD",
  }
  await sendEmails([email], { firstName }, Templates.Onboard); */

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
            /src/app/[locale]/(cms)/* will be used
          </p>
          <Creating type="page" />
        </section>

        <section className="mb-12 space-y-4">
          <h2>Create New Component</h2>
          <p className="text-muted-foreground">
            /src/islands/(cms)/* will be used
          </p>
          <Creating type="component" />
        </section>

        <section className="mb-12 space-y-4">
          <h2>Create New Post</h2>
          <Link href="/blog/new" variant="secondary">
            <Edit className="mr-2 h-4 w-4" aria-hidden="true" />
            Create post
          </Link>
          <br />
          <Link href="/blog" variant="secondary">
            <View className="mr-2 h-4 w-4" aria-hidden="true" />
            See all posts
          </Link>
        </section>

        <section className="mb-12 space-y-4">
          <h2>Edit User Privilegies</h2>
          <ButtonSetPrivilegies userId={session.id} newRole="user" />
        </section>

        {/* TODO: Implement email system */}
        {/* <section className="mb-12 space-y-4">
          <h2>Test Email Delivery</h2>
          <Link href="/api/mail" variant="secondary">
            <Mail className="mr-2 h-4 w-4" aria-hidden="true" />
            Send email
          </Link>
        </section> */}
      </section>

      <hr />
      <AdminProductsManagement />
    </GeneralShell>
  );
}
