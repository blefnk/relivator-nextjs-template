import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import Balancer from "react-wrap-balancer";
import { cnBase } from "tailwind-variants";

import { siteConfig } from "~/app";
import { Link as ButtonLink } from "~/core/link";
import { seo } from "~/data/meta";
import { typography } from "~/server/text";

export const metadata = seo({ title: "About" });

export default function Page() {
  const t = useTranslations();
  return (
    <div className="grid content-center border-b">
      <main className="container py-10 duration-700 animate-in fade-in slide-in-from-bottom-8">
        <div className="space-y-2">
          <h1 className={cnBase(typography.h1, "lg:text-4xl")}>
            {siteConfig.name}
          </h1>
          <Balancer
            as="p"
            className="!max-w-5xl text-base leading-normal text-primary/90 sm:text-lg sm:leading-7"
          >
            {t("landing.about")}
          </Balancer>
          <section
            aria-labelledby="create-a-store-banner-heading"
            className="mb-14 mt-10 grid place-items-start gap-6 bg-card pt-6 text-center text-card-foreground"
            id="create-a-store-banner"
          >
            <ButtonLink href="/" size="lg" variant="secondary">
              Learn More on Home Page
              <ArrowRight className="ml-2 h-4 w-4" />
            </ButtonLink>
          </section>
        </div>
        {/* biome-ignore lint/style/useSelfClosingElements: <explanation> */}
        {/* biome-ignore lint/a11y/useHeadingContent: <explanation> */}
        <h2 className={cnBase(typography.h2, "mt-8 border-b pb-2")}></h2>
        <p className={typography.p}>
          &copy; 2024{" "}
          <Link
            className="font-medium underline underline-offset-4"
            href="https://github.com/blefnk"
            rel="noreferrer"
            target="_blank"
          >
            {siteConfig.author}
          </Link>{" "}
          <Link
            className="font-medium text-zinc-500 underline underline-offset-4"
            href="https://github.com/blefnk/relivator"
            rel="noreferrer"
            target="_blank"
          >
            ({siteConfig.name}'s GitHub)
          </Link>
        </p>
      </main>
    </div>
  );
}
