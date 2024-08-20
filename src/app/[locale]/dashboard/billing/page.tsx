import type { Metadata } from "next";

import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "~/components/Navigation/PageNavMenu";
import { Shell } from "~/components/Wrappers/ShellVariants";

// import { authjs } from "~/auth/authjs";
// import { clerk } from "~/auth/clerk";
// import { authProvider } from "~/auth/provider";
// import { redirect } from "~/navigation";

export const metadata: Metadata = {
  description: "Manage your billings and subscription",
  title: "Billing",
};

export default async function BillingPage() {
  // const user = authProvider === "clerk" ? await clerk() : await authjs();

  // if (!user) {
  //   redirect("/error");
  // }

  return (
    <Shell>
      <PageHeader>
        <PageHeaderHeading size="sm">
          Oops... Billing page is temporarily disabled...
        </PageHeaderHeading>
        <PageHeaderDescription size="sm">
          We are working on this page. It will be live again soon. Stay tuned
          for updates.
        </PageHeaderDescription>
      </PageHeader>
      {/* <pre>{JSON.stringify(user, null, 2)}</pre> */}
    </Shell>
  );
}
