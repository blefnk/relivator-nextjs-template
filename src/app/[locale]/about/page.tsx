import Balancer from "react-wrap-balancer";

import type { Metadata } from "next";
import Link from "next/link";

import { buttonVariants } from "@/browser/reliverse/ui/Button";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { cnBase } from "tailwind-variants";

import { siteConfig } from "~/app";
import { cn, typography } from "~/utils";

// export const dynamic = "force-static";
// export const metadata = seo({ title: "About" });
export const metadata: Metadata = {
  title: "About Relivator",
};

export default function Page() {
  const t = useTranslations();

  return (
    <div className="grid content-center border-b">
      <main
        className={`
          container py-10 duration-700 animate-in fade-in slide-in-from-bottom-8
        `}
      >
        <div className="space-y-2">
          <h1 className={cnBase(typography.h1, "lg:text-4xl")}>
            {siteConfig.name}
          </h1>
          <Balancer
            as="p"
            className={`
              !max-w-5xl text-base leading-normal text-primary/90

              sm:text-lg sm:leading-7
            `}
          >
            {t("landing.about")}
          </Balancer>
          <section
            aria-labelledby="create-a-store-banner-heading"
            className={`
              mb-14 mt-10 grid place-items-start gap-6 bg-card pt-6 text-center
              text-card-foreground
            `}
            id="create-a-store-banner"
          >
            <Link
              className={cn(
                buttonVariants({
                  size: "lg",
                  variant: "secondary",
                }),
              )}
              href="https://github.com/blefnk/relivator-nextjs-template#readme"
              target="_blank"
              rel="noopener"
            >
              Learn More on Relivator's GitHub
              <ArrowRight className="ml-2 size-4" />
            </Link>
          </section>
        </div>
        <h2 className={cnBase(typography.h2, "mt-8 border-b pb-2")}>About</h2>
        <p className={typography.p}>
          © 2024{" "}
          <Link
            className="font-medium underline underline-offset-4"
            href="https://github.com/blefnk"
            rel="noreferrer noopener"
            target="_blank"
          >
            {siteConfig.author.handleAt}
          </Link>{" "}
          <Link
            className={`
              font-medium text-zinc-500 underline
              underline-offset-4
            `}
            href="https://github.com/blefnk/relivator-nextjs-template"
            rel="noreferrer noopener"
            target="_blank"
          >
            ({siteConfig.name}'s GitHub)
          </Link>
        </p>
      </main>
    </div>
  );
}
