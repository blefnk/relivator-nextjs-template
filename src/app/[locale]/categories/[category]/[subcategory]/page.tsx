import type { Metadata } from "next";

import { unslugify } from "@/utils/reliverse/string";
import { titleCase } from "string-ts";

import type { Product } from "~/db/schema/provider";

import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "~/components/Navigation/PageNavMenu";
import { Shell } from "~/components/Wrappers/ShellVariants";

type SubcategoryPageProps = {
  params: {
    category: Product["category"];
    subcategory: string;
  };
  searchParams: Record<string, string | string[] | undefined>;
};

export function generateMetadata({ params }: SubcategoryPageProps): Metadata {
  const subcategory = unslugify(params.subcategory);

  return {
    description: `Buy the best ${subcategory}`,

    title: titleCase(subcategory),
  };
}

export default async function SubcategoryPage() {
  return (
    <Shell>
      <PageHeader>
        <PageHeaderHeading size="sm">
          Oops... Subcategory page is temporarily disabled...
        </PageHeaderHeading>
        <PageHeaderDescription size="sm">
          We are working on this page. It will be live again soon. Stay tuned
          for updates.
        </PageHeaderDescription>
      </PageHeader>
    </Shell>
  );
}
