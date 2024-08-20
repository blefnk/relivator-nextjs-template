import { Balancer } from "react-wrap-balancer";

import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/utils/reliverse/cn";
import { config } from "@reliverse/core";
import { Download, ShoppingCart, Store } from "lucide-react";
import { useTranslations } from "next-intl";

import { GithubStarsBadge } from "~/components/Common/stars";
import { HeroSection } from "~/components/Marketing/Marketing/HeroSection";
import { env } from "~/env";

export default function HomeHeroSection() {
  const t = useTranslations();

  return (
    <section
      aria-labelledby="hero-heading"
      className={`
        mx-auto mb-2 mt-20 flex w-full flex-col items-center justify-center
        gap-4 text-center
      `}
      id="hero"
    >
      <GithubStarsBadge />
      <HeroSection />
      <Balancer
        as="p"
        className={`
          max-w-5xl text-sm leading-normal text-primary/90

          sm:text-lg sm:leading-7
        `}
      >
        {t("landing.about")}
      </Balancer>
      <div className="mt-3 flex flex-wrap items-center justify-center gap-4">
        <Link
          className={cn(
            buttonVariants({
              size: "lg",
              variant: "secondary",
            }),
          )}
          href={
            env.NODE_ENV === "development" ? "/dashboard" : "/dashboard/billing"
          }
        >
          <Store className="mr-2 size-4" />
          {/* {env.DEMO_NOTES_ENABLED === "true"
            ? String(t("demo.launch"))
            : String(t("landing.sell-now"))} */}
          {t("landing.sell-now")}
        </Link>
        {env.DEMO_NOTES_ENABLED === "true" && env.NODE_ENV !== "development" ? (
          <Link
            className={cn(
              buttonVariants({
                size: "lg",
                variant: "outline",
              }),
              "",
            )}
            href={`${config.framework.repo}/#how-to-install-and-get-started`}
            rel="noreferrer noopener"
            target="_blank"
          >
            <Download className="mr-2 size-4" />
            {t("landing.main-cta")}
          </Link>
        ) : (
          <Link
            className={cn(
              buttonVariants({
                size: "lg",
                variant: "outline",
              }),
              "",
            )}
            href="/products"
          >
            <ShoppingCart className="mr-2 size-4" />
            {t("landing.buy-now")}
          </Link>
        )}
      </div>
    </section>
  );
}
