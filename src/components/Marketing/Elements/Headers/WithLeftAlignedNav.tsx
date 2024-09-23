import { useTranslations } from "next-intl";

import { Button } from "~/components/ui/button";

export function WithLeftAlignedNav() {
  const t = useTranslations();

  return (
    <header>
      <h2>{t("WithLeftAlignedNav.elementsHeadersWithLeftAlignedNav")}</h2>
      <p>{t("WithLeftAlignedNav.withleftalignednav")}</p>
      <Button type="button" variant="default">
        Sign up | Log in
      </Button>
    </header>
  );
}
