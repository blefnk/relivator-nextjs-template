import { useTranslations } from "next-intl";

export function PrivacyNoticeRightAligned() {
  const t = useTranslations();

  return (
    <header>
      <h2>
        {t(
          "privacy-notice-right-aligned.elementsBannersPrivacyNoticeRightAligned",
        )}
      </h2>
      <p>{t("privacy-notice-right-aligned.privacynoticerightaligned")}</p>
    </header>
  );
}
