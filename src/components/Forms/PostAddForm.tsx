"use client";

import { createPost } from "@/server/reliverse/actions/post";

// Protected React Server Actions w/ tRPC
// @see https://trpc.io/blog/trpc-actions
export default function PostForm() {
  // Use `action` to make form progressively enhanced
  // And `Using `onSubmit` allows building rich
  // interactive forms once JavaScript has loaded
  return (
    <form
      action={(formData) => {
        createPost({
          title: formData.get("title") as string,
        });
      }}
      onSubmit={(event_) => {
        event_.preventDefault();
        const formData = new FormData(event_.target as HTMLFormElement);
        const title = formData.get("title");

        // TODO: show loading toast
        createPost({
          // @ts-expect-error TODO: fix
          title,
        });
      }}
    >
      <input name="title" type="text" />
      <button type="submit">Create Post</button>
    </form>
  );
}
