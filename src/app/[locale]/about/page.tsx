import type { Metadata } from "next";

import { Heading } from "@/components/ui/heading";
import { Link } from "@/components/ui/link";
import { Main } from "@/components/ui/main";
import { Paragraph } from "@/components/ui/paragraph";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";

import { siteConfig } from "~/app";

export const metadata: Metadata = {
  title: "About Relivator",
};

export default function AboutPage() {
  const t = useTranslations();

  return (
    <Main className="grid content-center border-b">
      <div className="container py-10">
        <div className="space-y-2">
          <Heading as="h1">{siteConfig.name}</Heading>
          <Paragraph
            className={`
              !max-w-5xl text-base leading-normal text-primary/90

              sm:text-lg sm:leading-7
            `}
          >
            {t("landing.about")}
          </Paragraph>
          <section
            aria-labelledby="create-a-store-banner-heading"
            className={`
              mb-14 mt-10 grid place-items-start gap-6 bg-card pt-6 text-center
              text-card-foreground
            `}
            id="create-a-store-banner"
          >
            <Link
              href="https://github.com/blefnk/relivator-nextjs-template#readme"
              target="_blank"
              rel="noopener"
              variant="default"
            >
              Learn More on Relivator's GitHub
              <ArrowRight className="ml-2 size-4" />
            </Link>
          </section>
        </div>
        <Heading>{t("page.about")}</Heading>
        <Paragraph>
          <br />
          <br />© 2024
          <br />
          <Link
            className="font-medium"
            href="https://github.com/blefnk"
            target="_blank"
            rel="noopener"
          >
            {siteConfig.author.handleAt}
          </Link>
        </Paragraph>
      </div>
    </Main>
  );
}
