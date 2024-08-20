import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/utils/reliverse/cn";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";

export default function HomeBottomSection() {
  const t = useTranslations();

  return (
    <section
      aria-labelledby="create-a-store-banner-heading"
      className={`
        mb-14 mt-10 grid place-items-center gap-6 bg-card px-6 text-center
        text-card-foreground
      `}
      id="create-a-store-banner"
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
