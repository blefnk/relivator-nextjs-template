import type { GenerateMetadata } from "~/utils/types/metadata";

import { REPOSITORY_URL } from "~/app";
import { Balancer } from "react-wrap-balancer";
import { cnBase } from "tailwind-variants";

import { getScopedI18n } from "~/utils/server/i18n";
import { typography } from "~/utils/server/text";

export const generateMetadata: GenerateMetadata = async () => {
  const t = await getScopedI18n("pages.about");

  return {
    title: t("title"),
    metadataBase: new URL("https://utils.bleverse.com"),
    description: "The best React 18 & Next.js 13 Relivator just for you.",
    keywords: "nextjs, Relivator, react, tools, bleverse, blefonix"
  };
};

export default async function Page() {
  const t = await getScopedI18n("pages.about");

  return (
    <div className="grid content-center border-b">
      <main className="duration-really-slow container py-10 animate-in fade-in slide-in-from-bottom-8">
        <div className="space-y-2">
          <h1 className={cnBase(typography.h1, "lg:text-4xl")}>{t("title")}</h1>
          <Balancer as="p" className="text-lg text-muted-foreground">
            {t("subtitle", {
              link: (
                <a
                  className="font-medium underline underline-offset-4"
                  href={REPOSITORY_URL}
                  target="_blank"
                  rel="noreferrer"
                >
                  {t("subtitle.link")}
                </a>
              )
            })}
          </Balancer>
        </div>
        <h2 className={cnBase(typography.h2, "mt-8 border-b pb-2")}>
          {t("author")}
        </h2>
        <p className={typography.p}>
          MIT &copy;{" "}
          <a
            className="font-medium underline underline-offset-4"
            href="https://x.com/bleverse_com"
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
