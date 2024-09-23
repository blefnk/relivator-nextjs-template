import Link from "next/link";

import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";

import { buttonVariants } from "~/components/ui/button";
import { cn } from "~/utils/cn";

export default function HomeBottomSection() {
  const t = useTranslations();

  return (
    <section
      id="create-a-store-banner"
      className={`
        mb-14 mt-10 grid place-items-center gap-6 bg-card px-6 text-center
        text-card-foreground
      `}
      aria-labelledby="create-a-store-banner-heading"
    >
      <div
        className={`
          text-xl font-medium

          sm:text-2xl
        `}
      >
        {t("landing.footer-cta")}
      </div>
      <Link
        className={cn(
          buttonVariants({
            size: "lg",
            variant: "outline",
          }),
          "",
        )}
        href="/dashboard/stores"
      >
        {t("landing.get-started-button")}
        <ArrowRight className="ml-2 size-4" />
      </Link>
    </section>
  );
}
