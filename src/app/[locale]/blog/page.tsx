import { type Metadata } from "next";

import { AlertCard } from "~/components/alert-card";
import { Shell } from "~/components/shell";
import { env } from "~/env.js";

// import * as React from "react";

// import {
// PageHeader,
// PageHeaderDescription,
// PageHeaderHeading,
// } from "~/components/page-header";
// import { Separator } from "~/components/ui/separator";
// import { allPosts } from "~/mdx-components";

// import { PostCard } from "./_components/post-card";
// import { PostCardSkeleton } from "./_components/post-card-skeleton";

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
  title: "Blog",
  description: "Explore the latest news and updates from the community",
};

export default async function BlogPage() {
  // const posts = allPosts
  //   .filter((post) => post.published)
  //   .sort((a, b) => b.date.localeCompare(a.date));

  return (
    <Shell className="md:pb-10 mt-20">
      <AlertCard />

      {/* <PageHeader>
        <PageHeaderHeading>Blog</PageHeaderHeading>
        <PageHeaderDescription>
          Explore the latest news and updates from the community
        </PageHeaderDescription>
      </PageHeader>
      <Separator className="mb-2.5" />
      <section className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <React.Suspense
          fallback={Array.from({ length: 4 }).map((_, i) => (
            <PostCardSkeleton key={i} />
          ))}
        >
          {posts.map((post, i) => (
            <PostCard key={post.slug} post={post} i={i} />
          ))}
        </React.Suspense>
      </section> */}
    </Shell>
  );
}
