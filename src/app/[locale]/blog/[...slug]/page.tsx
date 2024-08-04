import type { Metadata } from "next";
import Link from "next/link";

import { buttonVariants } from "@/browser/reliverse/ui/Button";
import { Separator } from "@/browser/reliverse/ui/Separator";

import { Icons } from "~/components/Common/Icons";
import { Shell } from "~/components/Wrappers/ShellVariants";
import { env } from "~/env";
import { cn } from "~/utils";

export function generateMetadata(): Metadata {
  const url = env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  const ogUrl = new URL(`${url}/api/og`);

  ogUrl.searchParams.set("type", "Blog Post");
  ogUrl.searchParams.set("mode", "dark");

  return {
    openGraph: {
      images: [
        {
          height: 630,
          url: ogUrl.toString(),
          width: 1200,
        },
      ],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      images: [ogUrl.toString()],
    },
  };
}

export default function PostPage() {
  return (
    <Shell as="article" variant="markdown">
      <Link
        className={cn(
          buttonVariants({
            variant: "ghost",
          }),
          `
            absolute left-[-200px] top-14 hidden

            xl:inline-flex
          `,
        )}
        href="/blog"
      >
        <Icons.chevronLeft className="mr-2 size-4" />
        See all posts
      </Link>
      <div>
        <h1
          className={`
            mt-2 inline-block text-4xl font-bold leading-tight

            lg:text-5xl
          `}
        >
          Post
        </h1>
      </div>
      <Separator className="my-10" />
      <div className="flex justify-center py-5">
        <Link
          className={cn(
            buttonVariants({
              variant: "ghost",
            }),
          )}
          href="/blog"
        >
          <Icons.chevronLeft aria-hidden="true" className="mr-2 size-4" />
          See all posts
          <span className="sr-only">See all posts</span>
        </Link>
      </div>
    </Shell>
  );
}
