import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

import PostThreadList from "./post-thread-list";

export default async function CommentsServerComponent() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["posts-comments"],
  });

  const isEmptyData = true;

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {isEmptyData ?
        <>Empty</>
      : <PostThreadList userId="" type="comment" />}
    </HydrationBoundary>
  );
}

/**
 * @see https://tanstack.com/query/latest/docs/react/guides/advanced-ssr
 * @see https://github.com/OhMinsSup/sst-next-app/blob/main/src/app/(root)/profile/%5BuserId%5D/%40comments/page.tsx
 */
