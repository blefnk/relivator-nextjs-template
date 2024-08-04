import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "~/components/Navigation/PageNavMenu";
import { Shell } from "~/components/Wrappers/ShellVariants";

export default async function BillingPage() {
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
    </Shell>
  );
}
