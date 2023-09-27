import { useLocale, useTranslations } from "next-intl";
import Link from "next-intl/link";

const languages = ["en", "de", "es", "uk"];

export default function LocSwitcher() {
  const t = useTranslations("LocaleSwitcher");
  const locale = useLocale();

  return (
    <div className="mr-2 rounded-2xl bg-muted px-4 py-1.5 text-lg font-medium">
      {languages.map((lang) => {
        if (lang !== locale) {
          return (
            <Link key={lang} href="/" locale={lang}>
              {t("locale", { locale: lang })}
            </Link>
          );
        } else {
          return null;
        }
      })}
    </div>
  );
}
