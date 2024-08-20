import type { Metadata } from "next";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/utils/reliverse/cn";
import { ChevronLeft } from "lucide-react";
import { useTranslations } from "next-intl";

import { Shell } from "~/components/Wrappers/ShellVariants";
import { env } from "~/env";

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
  const t = useTranslations();

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
        <ChevronLeft className="mr-2 size-4" />
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
          <ChevronLeft aria-hidden="true" className="mr-2 size-4" />
          See all posts
          <span className="sr-only">{t("page.seeAllPosts")}</span>
        </Link>
      </div>
    </Shell>
  );
}
