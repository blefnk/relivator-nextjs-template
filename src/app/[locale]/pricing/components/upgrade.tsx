"use client";

import type { FC, ReactElement } from "react";
import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle2, X } from "lucide-react";
import { useTranslations } from "next-intl";

import ButtonSetSubscription from "~/app/[locale]/pricing/components/subscribe";

const PricingTableContent = ({
  onClose,
  priceIdEnterprise,
  priceIdPremium,
  userSubscription,
}: {
  priceIdEnterprise: string;
  priceIdPremium: string;
  userRole: "admin" | "user";
  userSubscription: "enterprise" | "none" | "premium" | "starter";
  onClose?: () => void;
  onSave?: () => void;
}): ReactElement => {
  const [isMonthly, setIsMonthly] = useState(true);
  const [currency, setCurrency] = useState("$");

  const togglePricing = () => {
    setIsMonthly(!isMonthly);
  };

  const toggleCurrency = () => {
    setCurrency(currency === "$" ? "R$" : "$");
  };

  // Prices for both currencies
  const prices = {
    enterprise: {
      monthly: {
        PLN: 499.95,
        USD: 99.99,
      },
      yearly: {
        PLN: 4999.5,
        USD: 999.99,
      },
    },
    premium: {
      monthly: {
        PLN: 99.95,
        USD: 19.99,
      },
      yearly: {
        PLN: 999.5,
        USD: 199.99,
      },
    },
  };

  return (
    <>
      <div className="mb-8 flex items-center justify-between">
        <div
          className={`
            rounded-lg bg-zinc-100 p-2

            dark:bg-zinc-700
          `}
        >
          <Button
            className="mr-1 rounded px-4 py-2"
            onClick={togglePricing}
            type="button"
            variant={isMonthly ? "outline" : "ghost"}
          >
            Monthly
          </Button>
          <Button
            onClick={togglePricing}
            type="button"
            variant={isMonthly ? "ghost" : "outline"}
          >
            Yearly
          </Button>
        </div>
        <div
          className={`
            rounded-lg bg-zinc-100 p-2

            dark:bg-zinc-700
          `}
        >
          <Button
            className="mr-1 rounded px-4 py-2"
            onClick={toggleCurrency}
            type="button"
            variant={currency === "$" ? "outline" : "ghost"}
          >
            $
          </Button>
          <Button
            onClick={toggleCurrency}
            type="button"
            variant={currency === "R$" ? "outline" : "ghost"}
          >
            R$
          </Button>
        </div>
        {}
        {onClose && (
          <Button onClick={onClose} type="button" variant="outline">
            <X />
          </Button>
        )}
      </div>
      <div
        className={`
          grid grid-cols-1 gap-8 overflow-x-auto

          lg:grid-cols-4

          md:grid-cols-2
        `}
      >
        <PricingPlan
          buttonText="Subscribe"
          currency={currency}
          features={["30 days support"]}
          isCurrentPlan
          isSubscribed
          mapPlanId="starter"
          name="Starter" // @ts-expect-error TODO: Fix ts
          price={`${currency}${isMonthly ? prices.free.monthly[currency] : prices.free.yearly[currency]}`}
          stripeCustomerId="cus_123456789"
          stripePriceId="starter"
          stripeSubscriptionId="sub_123456789"
          userSubscription={userSubscription}
        />
        <PricingPlan
          buttonText="Subscribe"
          currency={currency}
          features={["60 days support"]}
          isCurrentPlan={false}
          isSubscribed={false}
          mapPlanId="premium"
          name="Premium"
          popular // @ts-expect-error TODO: Fix ts
          price={`${currency}${isMonthly ? prices.premium.monthly[currency] : prices.premium.yearly[currency]}`}
          stripeCustomerId="cus_123456789"
          stripePriceId={priceIdPremium}
          stripeSubscriptionId="sub_123456789"
          userSubscription={userSubscription}
        />
        <PricingPlan
          buttonText="Subscribe"
          currency={currency}
          features={["90 days support"]}
          isCurrentPlan={false}
          isSubscribed={false}
          mapPlanId="enterprise"
          name="Enterprise" // @ts-expect-error TODO: Fix ts
          price={`${currency}${isMonthly ? prices.enterprise.monthly[currency] : prices.enterprise.yearly[currency]}`}
          stripeCustomerId="cus_123456789"
          stripePriceId={priceIdEnterprise}
          stripeSubscriptionId="sub_123456789"
          userSubscription={userSubscription}
        />
      </div>
    </>
  );
};

export const PricingTableNative = ({
  priceIdEnterprise,
  priceIdPremium,
  userRole,
  userSubscription,
}: {
  priceIdEnterprise: string;
  priceIdPremium: string;
  userRole: "admin" | "user";
  userSubscription: "enterprise" | "none" | "premium" | "starter";
}) => (
  <>
    {/* <div className="flex justify-between items-center">
        <div className="bg-zinc-100 dark:bg-zinc-700 p-2 rounded-lg">
          <Button
            type="button"
            variant="outline"
            className="px-4 py-2 rounded mr-1"
          >
            Monthly
          </Button>
          <Button type="button" variant="ghost" className="text-text-2">
            Yearly
          </Button>
        </div>
      </div> */}
    <PricingTableContent
      priceIdEnterprise={priceIdEnterprise}
      priceIdPremium={priceIdPremium}
      userRole={userRole}
      userSubscription={userSubscription}
    />
  </>
);

type PricingPlanProps = {
  buttonText: string;
  currency: string;
  features: string[];
  isCurrentPlan: boolean;
  isSubscribed: boolean;
  isTemplateFree?: boolean;
  mapPlanId: "enterprise" | "none" | "premium" | "starter";
  name: string;
  popular?: boolean;
  price: string;
  stripeCustomerId: string;
  stripePriceId: string;
  stripeSubscriptionId: string;
  userSubscription: "enterprise" | "none" | "premium" | "starter";
};

const PricingPlan: FC<PricingPlanProps> = ({
  name,
  features,
  isTemplateFree,
  mapPlanId,
  popular,
  price,
  userSubscription,
}) => {
  const t = useTranslations();

  // const { userId, isLoaded } = useAuth();
  // if (
  //   // In case the user signs out while on the page.
  //   !isLoaded ||
  //   !userId
  // ) {
  //   return null;
  // }
  return (
    <div
      className={`
        flex flex-col items-start rounded-lg border border-zinc-400
        bg-transparent p-6 shadow-lg

        dark:border-zinc-700

        ${
          popular
            ? `
              bg-zinc-200

              dark:bg-zinc-700
            `
            : ""
        }
      `}
    >
      <div className="flex flex-col items-start">
        {popular ? (
          <Badge
            className="-mt-1 mb-2 rounded-full px-4 py-1 font-semibold"
            variant="default"
          >
            Most popular
          </Badge>
        ) : (
          <Badge
            className="mb-2 border-none bg-transparent py-1 font-semibold"
            variant="outline"
          >
            ⠀
          </Badge>
        )}
        <h3 className="mb-4 text-xl font-medium opacity-80">{name}</h3>
      </div>
      {/* <div className="text-2xl font-bold mb-6">{isTemplateFree ? `${currency}0.00` : price}</div> */}
      <div className="mb-6 text-2xl font-bold">
        {isTemplateFree ? "Free" : price}
      </div>
      {/* <ButtonManageSubscription
        mapPlanId={mapPlanId}
        isCurrentPlan={isCurrentPlan}
        isSubscribed={isSubscribed}
        stripeCustomerId={stripeCustomerId}
        stripePriceId={stripePriceId}
        stripeSubscriptionId={stripeSubscriptionId}
      /> */}
      <ButtonSetSubscription
        isTemplateFree={isTemplateFree}
        mapPlanId={mapPlanId}
        userSubscription={userSubscription}
      />
      <p className="mb-3 mt-4 text-sm opacity-70">
        {t("upgrade.thisIncludes")}
      </p>
      <ul className="mb-4 space-y-2 text-left text-sm">
        {features.map((feature) => (
          <li className="flex items-center" key={feature}>
            <span className="mr-2 mt-1">
              <CheckCircle2 className="max-w-5" />
            </span>
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      {/* {DEBUG_GOD_MODE && process.env.NODE_ENV === "development" && (
        <div className="opacity-50 mt-6 text-sm space-y-2">
          <h2 className="font-semibold">{t("upgrade.localhostDebug")}</h2>
          <p>mapPlanId: {mapPlanId}</p>
          <p>isCurrentPlan: {String(isCurrentPlan)}</p>
          <p>isSubscribed: {String(isSubscribed)}</p>
          <p>stripeCustomerId: {stripeCustomerId}</p>
          <p>stripePriceId: {stripePriceId}</p>
          <p>stripeSubscriptionId: {stripeSubscriptionId}</p>
        </div>
      )} */}
    </div>
  );
};
