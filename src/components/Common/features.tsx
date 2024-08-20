import type { ElementType } from "react";
import { Balancer } from "react-wrap-balancer";

import { Separator } from "@/components/ui/separator";
import { cn } from "@/utils/reliverse/cn";
import {
  Clock,
  Files,
  LayoutDashboard,
  PlaneTakeoff,
  QrCode,
  Server,
  ShoppingBag,
  ToggleRight,
} from "lucide-react";
import { useTranslations } from "next-intl";

export function Features() {
  const t = useTranslations("landing");

  return (
    <div
      className={`
        mx-auto grid justify-center gap-4

        lg:grid-cols-4

        md:grid-cols-2

        sm:grid-cols-2
      `}
    >
      <FeatureCard
        description={t("features.devtools.ambitions-description")}
        icon={Clock}
        title={t("features.devtools.title")}
      />
      <FeatureCard
        description={t("features.nextjs.description")}
        icon={PlaneTakeoff}
        title={t("features.nextjs.title")}
      />
      <FeatureCard
        description={t("features.database.description")}
        icon={QrCode}
        title={t("features.database.title")}
      />
      <FeatureCard
        description={t("features.text.description")}
        icon={ToggleRight}
        title={t("features.text.title")}
      />
      <FeatureCard
        description={t("features.auth.description")}
        icon={Files}
        title={t("features.auth.title")}
      />
      <FeatureCard
        description={t("features.database.description")}
        icon={Server}
        title={t("features.database.title")}
      />
      <FeatureCard
        description={t("features.interface.description")}
        icon={LayoutDashboard}
        title={t("features.interface.title")}
      />
      <FeatureCard
        description={t("features.devtools.description")}
        icon={ShoppingBag}
        title={t("features.devtools.title")}
      />
    </div>
  );
}

type FeatureCardProps = {
  description: string;
  icon: ElementType;
  title: string;
};

function FeatureCard({ description, icon: Icon, title }: FeatureCardProps) {
  return (
    <div className="overflow-hidden rounded-lg border bg-background p-2 text-left">
      <div className="flex flex-col justify-between rounded-lg p-6">
        <div className="flex min-h-[64px] items-center space-x-4">
          <Icon aria-hidden className="size-8" />
          <Balancer
            as="h2"
            className={cn(`
              text-lg font-medium tracking-tight text-muted-foreground

              sm:text-xl
            `)}
          >
            {title}
          </Balancer>
        </div>
        <Separator className="my-4" />
        <Balancer as="p" className="flex text-muted-foreground">
          {description}
        </Balancer>
      </div>
    </div>
  );
}
