"use client";

import { Clock, Code, DollarSign, Files, QrCode, Text } from "lucide-react";
import { useTranslations } from "next-intl";
import { cnBase } from "tailwind-variants";

import { typography } from "~/server/text";
import { FeatureCard } from "~/islands/modules/cards/feature-card";

export default function FeaturesSection() {
  const t = useTranslations("landing");

  return (
    <section id="features" className="space-y-6 text-center my-14">
      <h2
        className={cnBase(
          typography.h2,
          "text-3xl font-heading leading-[1.1] sm:text-3xl md:text-6xl",
        )}
      >
        {t("features.title")}
      </h2>
      <p className="mx-auto max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
        {t("features.subtitle")}
      </p>
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
    </section>
  );
}
