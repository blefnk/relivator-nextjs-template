import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "~/components/Navigation/PageNavMenu";
import { Shell } from "~/components/Wrappers/ShellVariants";

export function UserNotFound() {
  return (
    <Shell variant="sidebar">
      <PageHeader>
        <PageHeaderHeading size="sm">
          Oops... It seems something went wrong...
        </PageHeaderHeading>
        <PageHeaderDescription size="sm">
          Please make sure you are logged in. If you are, then please log out
          and log in again, and try visiting this page once more.
        </PageHeaderDescription>
      </PageHeader>
    </Shell>
  );
}
