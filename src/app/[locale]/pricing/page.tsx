import Balancer from "react-wrap-balancer";

import { useTranslations } from "next-intl";

import PricingPageClient from "~/app/[locale]/pricing/components/client";
import { Shell } from "~/components/Wrappers/ShellVariants";
import { env } from "~/env";

const PREMIUM = env.STRIPE_PROFESSIONAL_SUBSCRIPTION_PRICE_ID || "";
const ENTERPRISE =
  env.STRIPE_PROFESSIONAL_SUBSCRIPTION_PRICE_ID || PREMIUM || "";

// TODO: Consider using: import { JSX } from "react";
// export default function PricingPage(): JSX.Element {}
export default function PricingPage() {
  const t = useTranslations("page");

  const userSubscription = "starter";
  const userRole = "user";

  // if (userId) {
  //   const user = await db
  //     .select()
  //     .from(users)
  //     .where(eq(users.id, userId))
  //     .then((res) => res[0] || null);
  //   userSubscription = user?.subscription || "starter";
  // }
  return (
    <Shell>
      <Balancer asd="h1">{t("pricing")}</Balancer>
      <Balancer asd="p">
        No worries! Relivator will always be an open-source. But if you want
        even more and personalized things, just contact us.
      </Balancer>
      <PricingPageClient
        priceIdEnterprise={ENTERPRISE}
        priceIdPremium={PREMIUM}
        userRole={userRole}
        userSubscription={userSubscription}
      />
    </Shell>
  );
}
