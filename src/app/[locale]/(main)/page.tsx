import Link from "next/link";

import { REPOSITORY_URL } from "~/app";
import {
  Clock,
  Code,
  DollarSign,
  Files,
  Github,
  QrCode,
  Text
} from "lucide-react";
import { Balancer } from "react-wrap-balancer";
import { cnBase } from "tailwind-variants";

import { getI18n, getScopedI18n } from "~/data/i18n/server";
import { getGitHubStars } from "~/utils/server/stars";
import { typography } from "~/utils/server/text";

import FeatureCards from "~/islands/modules/feature-cards";
import Hero from "~/islands/modules/hero";
import { Button } from "~/islands/primitives/button";

type FeatureCardProps = {
  title: string;
  description: string;
  icon: React.ElementType;
};

function FeatureCard({ title, description, icon: Icon }: FeatureCardProps) {
  return (
    <div className="relative overflow-hidden rounded-lg border bg-background p-2 text-left">
      <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
        <Icon className="h-12 w-12" />
        <div className="space-y-2">
          <h3 className="font-bold">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
    </div>
  );
}

export const revalidate = 60;

export default async function Page() {
  const stars = await getGitHubStars();
  const t = await getI18n();
  const scopedT = await getScopedI18n("pages.home");

  return (
    <main className="container grid items-center">
      <Hero />

      <section
        id="open-source"
        className="space-y-4 py-8 text-center md:py-12 lg:py-24"
      >
        <h2
          className={cnBase(
            typography.h2,
            "text-3xl leading-[1.1] sm:text-3xl md:text-6xl"
          )}
        >
          {scopedT("open-source.title")}
        </h2>
        <p className="mx-auto max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
          {scopedT("open-source.subtitle.first")}
          <br />
          {scopedT("open-source.subtitle.second")}{" "}
          <a
            target="_blank"
            rel="noreferrer"
            className="underline underline-offset-4"
            href={REPOSITORY_URL}
          >
            GitHub
          </a>
          .
        </p>
        <a
          target="_blank"
          rel="noreferrer"
          href={REPOSITORY_URL}
          className="mx-auto flex w-fit transition-opacity hover:opacity-80"
        >
          <div className="flex h-10 w-10 items-center justify-center space-x-2 rounded-md border border-muted bg-muted">
            <Github />
          </div>
          {stars && (
            <div className="flex items-center">
              <div className="h-4 w-4 border-y-8 border-l-0 border-r-8 border-solid border-muted border-y-transparent" />
              <div className="flex h-10 items-center rounded-md border border-muted bg-muted px-4 font-medium">
                {scopedT("open-source.stars", { count: stars })}
              </div>
            </div>
          )}
        </a>
      </section>

      <section
        id="features"
        className="space-y-6 py-8 text-center md:py-12 lg:py-24"
      >
        <h2
          className={cnBase(
            typography.h2,
            "text-3xl leading-[1.1] sm:text-3xl md:text-6xl"
          )}
        >
          {scopedT("features.title")}
        </h2>
        <p className="mx-auto max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
          {scopedT("features.subtitle")}
        </p>
        <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
          <FeatureCard
            title={scopedT("features.cryptography.title")}
            description={scopedT("features.cryptography.description")}
            icon={QrCode}
          />
          <FeatureCard
            title={scopedT("features.text.title")}
            description={scopedT("features.text.description")}
            icon={Text}
          />
          <FeatureCard
            title={scopedT("features.clock.title")}
            description={scopedT("features.clock.description")}
            icon={Clock}
          />
          <FeatureCard
            title={scopedT("features.currency.title")}
            description={scopedT("features.currency.description")}
            icon={Code}
          />
          <FeatureCard
            title={scopedT("features.files.title")}
            description={scopedT("features.files.description")}
            icon={Files}
          />
          <FeatureCard
            title={scopedT("features.devtools.title")}
            description={scopedT("features.devtools.description")}
            icon={DollarSign}
          />
        </div>
      </section>

      <FeatureCards />

      <section className="py-10 text-center md:py-12 lg:py-22 xl:py-32">
        <Balancer
          as="h1"
          className={cnBase(
            typography.h1,
            "text-3xl sm:text-5xl md:text-6xl lg:text-7xl"
          )}
        >
          {scopedT("title", {
            tools: (
              <span className="bg-gradient-to-r from-primary to-pink-600 bg-clip-text text-transparent">
                {t("general.tools")}
              </span>
            )
          })}
        </Balancer>
        <Balancer
          as="h2"
          className="mx-auto mt-8 !block max-w-xl text-lg font-semibold tracking-tight text-muted-foreground sm:text-xl"
        >
          {scopedT("subtitle")}
        </Balancer>
        <div className="mt-4 flex w-full items-center justify-center gap-4">
          <Button className="h-11 px-8" asChild>
            <Link href="/features">{scopedT("get-started")}</Link>
          </Button>
          <Button className="h-11 px-8" variant="outline" asChild>
            <a href={REPOSITORY_URL} target="_blank" rel="noreferrer">
              <Github className="h-4 w-4" />
              <span>GitHub</span>
            </a>
          </Button>
        </div>
      </section>
    </main>
  );
}
