import type { GenerateMetadata } from "~/utils/types/metadata";
import { typography } from "~/utils/server/text";
import { getScopedI18n } from "~/data/i18n/server";

import { Todo } from "./todo";

export const generateMetadata: GenerateMetadata = async () => {
  const t = await getScopedI18n("pages.tools.todo");

  return {
    title: t("title"),
    metadataBase: new URL("https://relivator.bleverse.com"),
    description: "The best Next.js 13 and React 18 starter just for you.",
    keywords: "relivator, bleverse, blefonix, nextjs, utils, react, tools"
  };
};

export default async function Page() {
  const t = await getScopedI18n("pages.tools.todo");

  return (
    <main className="container">
      <h1 className={typography.h1}>{t("title")}</h1>
      <Todo />
    </main>
  );
}
