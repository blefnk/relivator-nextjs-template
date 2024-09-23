import type { Metadata } from "next";

import { useTranslations } from "next-intl";

import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "~/components/Navigation/PageNavMenu";
import { Separator } from "~/components/ui/separator";
import { Shell } from "~/components/Wrappers/ShellVariants";

export const metadata: Metadata = {
  description: "Explore the latest news and updates from the community",
  title: "Blog",
};

export default function BlogPage() {
  const t = useTranslations();

  return (
    <Shell className="md:pb-10">
      <PageHeader id="blog-header" aria-labelledby="blog-header-heading">
        <PageHeaderHeading>{t("page.blog")}</PageHeaderHeading>
        <PageHeaderDescription>
          Explore the latest news and updates from the community
        </PageHeaderDescription>
      </PageHeader>
      <Separator className="mb-2.5" />
      <section
        id="blog-posts"
        className={`
          grid grid-cols-1 gap-8

          lg:grid-cols-4

          md:grid-cols-3

          sm:grid-cols-2
        `}
        aria-labelledby="blog-posts-heading"
      >
        Blog still in development. Please check back later.
      </section>
    </Shell>
  );
}
