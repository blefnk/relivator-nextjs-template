"use client";

import { REPOSITORY_URL } from "~/app";
import { Github } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next-intl/link";
import { cnBase } from "tailwind-variants";

import { typography } from "~/server/text";

type OssRepoSectionProps = {
  githubStars?: any;
};

export default function OssRepoSection({ githubStars }: OssRepoSectionProps) {
  const t = useTranslations();

  return (
    <section
      id="open-source"
      className="grid place-items-center gap-6 border rounded-lg bg-card px-6 py-14 text-center text-card-foreground shadow-sm"
    >
      <h2
        className={cnBase(typography.h2, "text-4xl leading-[1.1] font-heading")}
      >
        {t("landing.open-source.title")}
      </h2>
      <p className="mx-auto max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
        {t("landing.open-source.subtitle.first")}
        <br />
        {t("landing.open-source.subtitle.second")}{" "}
        <Link
          target="_blank"
          rel="noreferrer"
          className="underline underline-offset-4"
          href={REPOSITORY_URL}
        >
          GitHub
        </Link>
        .
      </p>
      <Link
        target="_blank"
        rel="noreferrer"
        href={REPOSITORY_URL}
        className="mx-auto flex w-fit transition-opacity hover:opacity-80"
      >
        <div className="flex h-10 w-10 items-center justify-center space-x-2 rounded-md border border-muted bg-muted">
          <Github />
        </div>
        {githubStars && (
          <div className="flex items-center">
            <div className="h-4 w-4 border-y-8 border-l-0 border-r-8 border-solid border-muted border-y-transparent" />
            <div className="flex h-10 items-center rounded-md border border-muted bg-muted px-4 font-medium">
              {t("landing.open-source.stars", { count: githubStars })}
            </div>
          </div>
        )}
      </Link>
    </section>
  );
}
