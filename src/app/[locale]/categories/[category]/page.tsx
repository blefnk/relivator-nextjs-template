// src\app\[locale]\categories\[category]\page.tsx
import type { Metadata } from "next";

import { titleCase } from "string-ts";

import type { Product } from "~/db/schema/provider";

import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "~/components/Navigation/PageNavMenu";
import { Shell } from "~/components/Wrappers/ShellVariants";

type CategoryPageProps = {
  params: {
    category: Product["category"];
  };
  searchParams: Record<string, string | string[] | undefined>;
};

export function generateMetadata({ params }: CategoryPageProps): Metadata {
  return {
    description: `Buy products from the ${params.category} category`,
    title: titleCase(params.category || ""),
  };
}

export default async function CategoryPage({}: CategoryPageProps) {
  return (
    <Shell>
      <PageHeader
        aria-labelledby="category-page-header-heading"
        id="category-page-header"
      >
        <PageHeaderHeading size="sm">
          Oops... Category page is temporarily disabled...
        </PageHeaderHeading>
        <PageHeaderDescription size="sm">
          We are working on this page. It will be live again soon. Stay tuned
          for updates.
        </PageHeaderDescription>
      </PageHeader>
    </Shell>
  );
}
