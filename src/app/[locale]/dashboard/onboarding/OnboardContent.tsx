import { Separator } from "@/browser/reliverse/ui/Separator";

import Content from "./content.mdx";

export default function Onboarding() {
  return (
    <>
      <Separator className="mb-2" />
      <article
        className={`
          prose pb-8

          dark:prose-invert

          lg:prose-xl
        `}
      >
        <Content />
      </article>
    </>
  );
}
