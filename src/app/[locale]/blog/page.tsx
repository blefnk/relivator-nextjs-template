import type { Metadata } from "next";

import { Separator } from "@/components/ui/separator";
import { useTranslations } from "next-intl";

import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "~/components/Navigation/PageNavMenu";
import { Shell } from "~/components/Wrappers/ShellVariants";

export const metadata: Metadata = {
  description: "Explore the latest news and updates from the community",
  title: "Blog",
};

export default function BlogPage() {
  const t = useTranslations();

  return (
    <Shell className="md:pb-10">
      <PageHeader aria-labelledby="blog-header-heading" id="blog-header">
        <PageHeaderHeading>{t("page.blog")}</PageHeaderHeading>
        <PageHeaderDescription>
          Explore the latest news and updates from the community
        </PageHeaderDescription>
      </PageHeader>
      <Separator className="mb-2.5" />
      <section
        aria-labelledby="blog-posts-heading"
        className={`
          grid grid-cols-1 gap-8

          lg:grid-cols-4

          md:grid-cols-3

          sm:grid-cols-2
        `}
        id="blog-posts"
      >
        Blog still in development. Please check back later.
      </section>
    </Shell>
  );
}
