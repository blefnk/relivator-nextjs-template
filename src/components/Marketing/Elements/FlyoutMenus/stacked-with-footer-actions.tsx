import { useTranslations } from "next-intl";

export function StackedWithFooterActions() {
  const t = useTranslations();

  return (
    <header>
      <h2>
        {t(
          "stacked-with-footer-actions.elementsFlyoutMenusStackedWithFooterActions",
        )}
      </h2>
      <p>{t("stacked-with-footer-actions.stackedwithfooteractions")}</p>
    </header>
  );
}
