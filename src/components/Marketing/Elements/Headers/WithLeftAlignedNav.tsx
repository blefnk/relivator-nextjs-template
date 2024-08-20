import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

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
