import { cnBase } from "tailwind-variants";

import { typography } from "~/server/text";
import { type GenerateMetadata } from "~/data/meta/extend";

export const generateMetadata: GenerateMetadata = async () => {
  return {
    metadataBase: new URL("https://relivator.bleverse.com"),
    description: "The best React 18 & Next.js 14 starter just for you.",
    keywords: "nextjs, starter, react, tools, bleverse, blefonix",
  };
};

export default async function Page() {
  return (
    <div className="grid content-center border-b">
      <main className="duration-really-slow container py-10 animate-in fade-in slide-in-from-bottom-8">
        <div className="space-y-2">
          <h1 className={cnBase(typography.h1, "lg:text-4xl")}>Relivator</h1>
        </div>
        <h2 className={cnBase(typography.h2, "mt-8 border-b pb-2")}></h2>
        <p className={typography.p}>
          MIT &copy;{" "}
          <a
            className="font-medium underline underline-offset-4"
            href="https://x.com/blefnk"
            target="_blank"
            rel="noreferrer"
          >
            Bleverse
          </a>
        </p>
      </main>
    </div>
  );
}
