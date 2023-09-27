"use client";

import { REPOSITORY_URL } from "~/app";
import { Github } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next-intl/link";
import { Balancer } from "react-wrap-balancer";
import { cnBase } from "tailwind-variants";

import { typography } from "~/server/text";

import { Button } from "../primitives/button";

export default function CommonSection() {
  const t = useTranslations("landing");

  return (
    <section className="pt-14 pb-20 text-center">
      <Balancer
        as="h1"
        className={cnBase(
          typography.h1,
          "text-3xl font-heading sm:text-5xl md:text-6xl lg:text-7xl",
        )}
      >
        <span className="bg-gradient-to-r from-primary to-pink-600 bg-clip-text text-transparent">
          {t("title")}
        </span>
      </Balancer>
      <div>
        <Balancer
          as="h2"
          className="mx-auto !block max-w-xl text-lg font-semibold tracking-tight text-muted-foreground sm:text-xl"
        >
          {t("subtitle")}
        </Balancer>
        <div className="mt-4 flex w-full items-center justify-center gap-4">
          <Button className="h-11 px-8" asChild>
            <Link href={REPOSITORY_URL} target="_blank" rel="noreferrer">
              <Github className="h-4 w-4 mr-2" />
              <span>Check Project Github</span>
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
