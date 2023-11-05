"use client";

import { DISCORD_URL, REPOSITORY_URL } from "~/app";
import { Link } from "~/navigation";
import { Clock, Code, DollarSign, Files, QrCode, Text } from "lucide-react";
import { useTranslations } from "next-intl";
import { Balancer } from "react-wrap-balancer";

const sectionClass =
  "space-y-6 my-14 grid place-items-center gap-6 border rounded-lg bg-card px-6 py-14 text-card-foreground shadow-sm pt-4 pb-20 mt-4 items-center justify-center mx-auto w-fit transition-opacity hover:opacity-80";
const balancerHeaderClass =
  "mx-auto my-6 max-w-xl text-lg font-semibold tracking-tight text-muted-foreground sm:text-xl font-heading leading-[1.1]";
const balancerParagraphClass =
  "flex mx-auto max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7";
const linkClass = "underline underline-offset-4";

export function OssStarsBadge() {
  const t = useTranslations("plugins");
  return <span className="mr-1">{t("stars")}</span>;
}

export function OssFeaturesSection({
  githubStars,
}: {
  githubStars: number | null;
}) {
  const t = useTranslations("landing");
  return (
    <section id="open-source-features" className={sectionClass}>
      <Balancer as="h2" className={balancerHeaderClass}>
        {t("open-source.title")}
      </Balancer>
      <Balancer as="p" className={balancerParagraphClass}>
        {githubStars && (
          <Link href={REPOSITORY_URL}>
            <span>{t("open-source.stars", { count: githubStars })}</span>
          </Link>
        )}{" "}
        {t("title")} {t("open-source.subtitle.first")} {t("features.subtitle")}{" "}
        {t("subtitle")}
        <br />
        {t("open-source.subtitle.second")}{" "}
        <Link
          target="_blank"
          rel="noreferrer"
          className={linkClass}
          href={REPOSITORY_URL}
        >
          GitHub
        </Link>{" "}
        and visit our{" "}
        <Link
          target="_blank"
          rel="noreferrer"
          className={linkClass}
          href={DISCORD_URL}
        >
          Discord
        </Link>
        .
      </Balancer>
      <Features />
    </section>
  );
}

function Features() {
  const t = useTranslations("landing");
  return (
    <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
      <FeatureCard
        title={t("features.cryptography.title")}
        description={t("features.cryptography.description")}
        icon={QrCode}
      />
      <FeatureCard
        title={t("features.text.title")}
        description={t("features.text.description")}
        icon={Text}
      />
      <FeatureCard
        title={t("features.clock.title")}
        description={t("features.clock.description")}
        icon={Clock}
      />
      <FeatureCard
        title={t("features.currency.title")}
        description={t("features.currency.description")}
        icon={Code}
      />
      <FeatureCard
        title={t("features.files.title")}
        description={t("features.files.description")}
        icon={Files}
      />
      <FeatureCard
        title={t("features.devtools.title")}
        description={t("features.devtools.description")}
        icon={DollarSign}
      />
    </div>
  );
}

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
