export default function Posts() {
  // This useQuery could just as well happen in some deeper
  // child to <Posts>, data will be available immediately either way
  // const { data } = useQuery({
  //   queryKey: ["posts"],
  // });
  // This query was not prefetched on the server and will not start
  // fetching until on the client, both patterns are fine to mix.
  // const { data: commentsData } = useQuery({
  //   queryKey: ["posts-comments"],
  // });
}
