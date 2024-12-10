import type { MDXComponents } from "mdx/types";

import { Callout } from "~/components/mdx/callout";
import { CodeBlock } from "~/components/mdx/code-block";
import { LinkBadge } from "~/components/mdx/link-badge";
import { MdxCard } from "~/components/mdx/mdx-card";
import { MdxImage } from "~/components/mdx/mdx-image";
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";
import { AspectRatio } from "~/components/ui/aspect-ratio";
import { ScrollArea } from "~/components/ui/scroll-area";
import { cn } from "~/server/utils";

// export function useMDXComponents(components: MDXComponents): MDXComponents {
//   return components;
// }

// Define MDX components
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ className, ...props }) => (
      <h1
        className={cn(
          "mt-2 scroll-m-20 font-sans text-4xl font-bold",
          className,
        )}
        {...props}
      />
    ),
    h2: ({ className, ...props }) => (
      <h2
        className={cn(
          "mt-12 scroll-m-20 border-b pb-2 font-sans text-2xl font-semibold tracking-tight first:mt-0",
          className,
        )}
        {...props}
      />
    ),
    h3: ({ className, ...props }) => (
      <h3
        className={cn(
          "mt-8 scroll-m-20 font-sans text-xl font-semibold tracking-tight",
          className,
        )}
        {...props}
      />
    ),
    h4: ({ className, ...props }) => (
      <h4
        className={cn(
          "mt-8 scroll-m-20 font-sans text-lg font-semibold tracking-tight",
          className,
        )}
        {...props}
      />
    ),
    h5: ({ className, ...props }) => (
      <h5
        className={cn(
          "mt-8 scroll-m-20 text-lg font-semibold tracking-tight",
          className,
        )}
        {...props}
      />
    ),
    h6: ({ className, ...props }) => (
      <h6
        className={cn(
          "mt-8 scroll-m-20 text-base font-semibold tracking-tight",
          className,
        )}
        {...props}
      />
    ),
    a: ({ className, ...props }) => (
      <a
        className={cn("font-medium underline underline-offset-4", className)}
        {...props}
      />
    ),
    p: ({ className, ...props }) => (
      <p
        className={cn("leading-7 [&:not(:first-child)]:mt-6", className)}
        {...props}
      />
    ),
    ul: ({ className, ...props }) => (
      <ul className={cn("my-6 ml-6 list-disc", className)} {...props} />
    ),
    ol: ({ className, ...props }) => (
      <ol className={cn("my-6 ml-6 list-decimal", className)} {...props} />
    ),
    li: ({ className, ...props }) => (
      <li className={cn("mt-2", className)} {...props} />
    ),
    blockquote: ({ className, ...props }) => (
      <blockquote
        className={cn("mt-6 border-l-2 pl-6 italic", className)}
        {...props}
      />
    ),
    img: ({ className, alt, ...props }) => (
      // biome-ignore lint/a11y/useAltText: <explanation>
      <img className={cn("rounded-md", className)} alt={alt} {...props} />
    ),
    hr: (props) => <hr className="my-4 md:my-8" {...props} />,
    table: ({ className, ...props }) => (
      <div className="my-6 w-full overflow-y-auto">
        <table className={cn("w-full", className)} {...props} />
      </div>
    ),
    tr: ({ className, ...props }) => (
      <tr
        className={cn("m-0 border-t p-0 even:bg-muted", className)}
        {...props}
      />
    ),
    th: ({ className, ...props }) => (
      <th
        className={cn(
          "border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right",
          className,
        )}
        {...props}
      />
    ),
    td: ({ className, ...props }) => (
      <td
        className={cn(
          "border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right",
          className,
        )}
        {...props}
      />
    ),
    pre: CodeBlock,
    code: ({ className, ...props }) => (
      <code
        className={cn(
          "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm",
          className,
        )}
        {...props}
      />
    ),
    Image: MdxImage,
    Alert,
    AlertTitle,
    AlertDescription,
    AspectRatio,
    Card: MdxCard,
    LinkBadge: LinkBadge,
    ScrollArea,
    Callout,
    ...components,
  };
}

type MdxProps = {
  code: string;
};

export function Mdx({ code }: MdxProps) {
  const Component = useMDXComponents({}) as unknown as (props: {
    components: MDXComponents;
  }) => React.ReactElement;

  return (
    <div className="mdx overflow-hidden">
      <Component components={useMDXComponents({})} />
    </div>
  );
}

// TODO: [temporary] Simulate allAuthors
export const allAuthors = [
  {
    _id: "1",
    title: "John Doe",
    twitter: "johndoe",
    avatar: "https://example.com/johndoe.jpg",
  },
  {
    _id: "2",
    title: "Jane Doe",
    twitter: "janedoe",
    avatar: "https://example.com/janedoe.jpg",
  },
];

// TODO: [temporary] Simulate allPages
export const allPages = [
  {
    slugAsParams: "home",
    title: "Home",
    description: "Welcome!",
    body: { code: "Hello, world 1!" },
  },
  {
    slugAsParams: "about",
    title: "About",
    description: "Learn more about us",
    body: { code: "Hello, world 1!" },
  },
  {
    slugAsParams: "contact",
    title: "Contact",
    description: "Get in touch with us",
    body: { code: "Hello, world 1!" },
  },
];

export type Post = {
  slug: string;
  slugAsParams: string;
  title: string;
  published: boolean;
  date: string;
  readingTime: number;
  authors: string[];
  body: { code: string };
  image: string;
  description: string;
};

// TODO: [temporary] Simulate allPosts
export const allPosts: Post[] = [
  {
    slug: "post-1",
    slugAsParams: "post-1",
    title: "Post 1",
    published: true,
    date: "2023-01-01",
    readingTime: 5,
    authors: ["John Doe", "Jane Doe"],
    body: { code: "Hello, world 1!" },
    image: "https://www.gstatic.com/webp/gallery/1.webp",
    description: "Description 1",
  },
  {
    slug: "post-2",
    slugAsParams: "post-2",
    title: "Post 2",
    published: false,
    date: "2023-02-01",
    readingTime: 10,
    authors: ["Jane Doe"],
    body: { code: "Hello, world 2!" },
    image: "https://www.gstatic.com/webp/gallery/5.webp",
    description: "Description 2",
  },
  {
    slug: "post-3",
    slugAsParams: "post-3",
    title: "Post 3",
    published: true,
    date: "2023-03-01",
    readingTime: 15,
    authors: ["John Doe", "Jane Doe"],
    body: { code: "Hello, world 3!" },
    image: "https://www.gstatic.com/webp/gallery/3.webp",
    description: "Description 3",
  },
  {
    slug: "post-4",
    slugAsParams: "post-4",
    title: "Post 4",
    published: true,
    date: "2023-04-01",
    readingTime: 20,
    authors: ["Jane Doe"],
    body: { code: "Hello, world 4!" },
    image: "https://www.gstatic.com/webp/gallery/4.webp",
    description: "Description 4",
  },
];
