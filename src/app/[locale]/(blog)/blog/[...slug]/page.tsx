import "~/styles/mdx.css";

import { type Metadata } from "next";
import { cn } from "~/utils";

import { env } from "~/env.mjs";
import { Icons } from "~/islands/icons";
import { buttonVariants } from "~/islands/primitives/button";
import { Separator } from "~/islands/primitives/separator";
import { Shell } from "~/islands/wrappers/shell-variants";
import { Link } from "~/navigation";

export async function generateMetadata(): Promise<Metadata> {
  const url = env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

  const ogUrl = new URL(`${url}/api/og`);
  ogUrl.searchParams.set("type", "Blog Post");
  ogUrl.searchParams.set("mode", "dark");

  return {
    openGraph: {
      type: "article",
      images: [
        {
          url: ogUrl.toString(),
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      images: [ogUrl.toString()],
    },
  };
}

export default async function PostPage() {
  return (
    <Shell as="article" variant="markdown">
      <Link
        href="/blog"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "absolute left-[-200px] top-14 hidden xl:inline-flex",
        )}
      >
        <Icons.chevronLeft className="mr-2 h-4 w-4" />
        See all posts
      </Link>
      <div>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground"></div>
        <h1 className="mt-2 inline-block text-4xl font-bold leading-tight lg:text-5xl">
          Post
        </h1>
      </div>

      <Separator className="my-10" />
      <div className="flex justify-center py-5">
        <Link href="/blog" className={cn(buttonVariants({ variant: "ghost" }))}>
          <Icons.chevronLeft className="mr-2 h-4 w-4" aria-hidden="true" />
          See all posts
          <span className="sr-only">See all posts</span>
        </Link>
      </div>
    </Shell>
  );
}
