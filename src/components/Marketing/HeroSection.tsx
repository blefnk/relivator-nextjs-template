import { Balancer } from "react-wrap-balancer";

import Link from "next/link";

import { ShoppingCart, Store } from "lucide-react";
import { useTranslations } from "next-intl";

import { HeroSection } from "~/components/Marketing/Marketing/HeroSection";
import { buttonVariants } from "~/components/ui/button";
import { cn } from "~/utils/cn";

export default function HomeHeroSection() {
  const t = useTranslations();

  return (
    <section
      id="hero"
      className={`
        mx-auto mb-2 mt-4 flex w-full flex-col items-center justify-center
        gap-4 text-center
      `}
      aria-labelledby="hero-heading"
    >
      <HeroSection />
      <Balancer
        className={`
          max-w-5xl text-sm leading-normal text-primary/90

          sm:text-lg sm:leading-7
        `}
        as="p"
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
          href="/products"
        >
          <Store className="mr-2 size-4" />
          {t("landing.sell-now")}
        </Link>

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
      </div>
    </section>
  );
}
