import Link from "next/link";

import { getScopedI18n } from "~/data/i18n/server";
import { typography } from "~/utils/server/text";
import type { GenerateMetadata } from "~/utils/types/metadata";

const tools = [
  {
    category: "Todo",
    tools: [
      {
        title: "Todo List",
        description:
          "Manage your tasks and to-dos efficiently using a comprehensive task list.",
        href: "/features/todo",
        releasedAt: new Date()
      }
    ]
  }
];

function ToolCard({
  title,
  description,
  href,
  releasedAt
}: (typeof tools)[number]["tools"][number]) {
  if (!releasedAt) {
    return (
      <div
        aria-disabled
        className="relative inline-block h-full w-64 cursor-not-allowed select-none rounded-lg border p-6"
      >
        <div className="absolute inset-0 grid h-full w-full place-content-center rounded-lg bg-gradient-to-br from-background/95 to-background/60">
          <p className="font-semibold">Coming Soon!</p>
        </div>
        <h3 className="mb-2 font-bold">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    );
  }

  return (
    <Link
      className="inline-block h-full w-64 space-y-2 rounded-lg border p-6 transition hover:border-border/60"
      href={href}
    >
      <h3 className="font-bold">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </Link>
  );
}

export const generateMetadata: GenerateMetadata = async () => {
  const t = await getScopedI18n("pages.tools");

  return {
    title: t("title"),
    metadataBase: new URL("https://utils.bleverse.com"),
    description: "The best React 18 & Next.js 13 Relivator just for you.",
    keywords: "nextjs, Relivator, react, tools, bleverse, blefonix"
  };
};

export default async function Tools() {
  const t = await getScopedI18n("pages.tools");

  return (
    <main className="container">
      <h1 className={typography.h1}>{t("title")}</h1>
      <div className="mt-8 space-y-12">
        {tools.map((tool) => (
          <section key={tool.category} className="space-y-4">
            <h2 className={typography.h3}>{tool.category}</h2>
            <ul className="grid grid-cols-[repeat(auto-fill,minmax(16rem,1fr))] justify-items-center gap-x-2 gap-y-6 md:justify-items-start">
              {tool.tools.map((tool) => (
                <li key={tool.title}>
                  <ToolCard {...tool} />
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </main>
  );
}
