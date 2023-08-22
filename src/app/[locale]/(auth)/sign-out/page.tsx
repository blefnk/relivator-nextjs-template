import { LogOutButtons } from "~/islands/account/logout-buttons";
import { Shell } from "~/islands/common/shells/shell";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading
} from "~/islands/page-header";

export default function SignOutPage() {
  return (
    <Shell className="max-w-xs">
      <PageHeader className="text-center">
        <PageHeaderHeading size="sm">Sign out</PageHeaderHeading>
        <PageHeaderDescription size="sm">
          Are you sure you want to sign out?
        </PageHeaderDescription>
      </PageHeader>
      <LogOutButtons />
    </Shell>
  );
}
