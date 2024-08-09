import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

function PostThreadList() {
  return <>PostThreadList</>;
}

export default async function CommentsServerComponent() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["posts-comments"],
  });

  const isEmptyData = true;

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {isEmptyData ? <>Empty</> : <PostThreadList />}
    </HydrationBoundary>
  );
}
