import { useTranslations } from "next-intl";

export default function CountryListPage() {
  const t = useTranslations();

  return (
    <div>
      <h1>{t("page.countriesData")}</h1>
      `CountryList`
      {/* <CountryList /> */}
      <h2>{t("page.specificCountryRe")}</h2>
      `CountryList cca2="RE"`
      {/* <CountryList cca2="RE" /> */}
    </div>
  );
}
