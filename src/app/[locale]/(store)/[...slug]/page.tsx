import { notFound } from "next/navigation";

import "~/styles/mdx.css";

import { type Metadata } from "next";
import { siteConfig } from "~/app";

import { absoluteUrl } from "~/server/utils";
import { Mdx } from "~/islands/modules/markdown/mdx-components";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading
} from "~/islands/navigation/page-header";
import { MdxPager } from "~/islands/navigation/pagination/mdx-pager";
import { Separator } from "~/islands/primitives/separator";
import { Shell } from "~/islands/wrappers/shell";

interface PageProps {
  params: {
    slug: string[];
  };
}

// eslint-disable-next-line @typescript-eslint/require-await
async function getPageFromParams(params: PageProps["params"]) {
  const slug = params?.slug?.join("/") ?? "";
  // const page = allPages.find((page) => page.slugAsParams === slug);

  // if (!page) {
  //   null;
  // }

  // return page;

  return null;
}

export async function generateMetadata({
  params
}: PageProps): Promise<Metadata> {
  const page = await getPageFromParams(params);

  if (!page) {
    return {};
  }

  const url = absoluteUrl("/");

  const ogUrl = new URL(`${url}/api/og`);
  // ogUrl.searchParams.set("title", page.title);
  ogUrl.searchParams.set("type", siteConfig.name);
  ogUrl.searchParams.set("mode", "light");

  return {
    // title: page.title,
    // description: page.description,
    openGraph: {
      // title: page.title,
      // description: page.description,
      type: "article",
      // url: absoluteUrl(page.slug),
      images: [
        {
          url: ogUrl.toString(),
          width: 1200,
          height: 630
          // alt: page.title
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      // title: page.title,
      // description: page.description,
      images: [ogUrl.toString()]
    }
  };
}

// eslint-disable-next-line @typescript-eslint/require-await
// export async function generateStaticParams(): Promise<PageProps["params"][]> {
//   return allPages.map((page) => ({
//     slug: page.slugAsParams.split("/")
//   }));
// }

export default async function PagePage({ params }: PageProps) {
  const page = await getPageFromParams(params);

  if (!page) {
    notFound();
  }

  // Remove the /pages prefix from the slug
  // const formattedPage = {
  //   ...page,
  //   slug: page.slug.replace(/^\/pages/, "")
  // };

  // const formattedPages = allPages.map((page) => ({
  //   ...page,
  //   slug: page.slug.replace(/^\/pages/, "")
  // }));

  return (
    <Shell as="article" variant="markdown">
      <PageHeader>
        {/* <PageHeaderHeading>{page.title}</PageHeaderHeading> */}
        {/* <PageHeaderDescription>{page.description}</PageHeaderDescription> */}
      </PageHeader>
      <Separator className="my-4" />
      {/* <Mdx code={page.body.code} /> */}
      {/* <MdxPager
        currentItem={formattedPage}
        allItems={formattedPages}
        className="my-4"
      /> */}
    </Shell>
  );
}
