import { ErrorCard } from "~/islands/cards/error-card";
import { Shell } from "~/islands/shells/shell";

export default function PageNotFound() {
  return (
    <Shell variant="centered" className="max-w-md">
      <ErrorCard
        title="Page not found"
        description="The page you are looking for does not exist"
        retryLink="/"
        retryLinkText="Go to Home"
      />
    </Shell>
  );
}
