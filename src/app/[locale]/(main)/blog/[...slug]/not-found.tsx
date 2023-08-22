import { Shell } from "~/islands/common/shells/shell";
import { ErrorCard } from "~/islands/error-card";

export default function BlogNotFound() {
  return (
    <Shell variant="centered" className="max-w-md">
      <ErrorCard
        title="Post not found"
        description="The post you are looking for does not exist"
        retryLink="/blog"
        retryLinkText="Go to Blog"
      />
    </Shell>
  );
}
