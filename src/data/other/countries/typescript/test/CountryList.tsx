"use client";

import type { FC } from "react";
import { useEffect, useState } from "react";

import { useTranslations } from "next-intl";
import { ofetch } from "ofetch";

// TODO: Fix this test component, which parses countries data from a JSON file
type Currency = {
  name: string;
  symbol: string;
};

type Country = {
  cca2: string;
  currencies: Record<string, Currency>;
  flag: string;
  languages: Record<string, string>;
};

const CountryList: FC<{
  cca2?: string;
}> = ({ cca2 }) => {
  const t = useTranslations();

  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    const fetchCountriesData = async () => {
      try {
        const res = await ofetch("/countries.json");

        if (!res.ok) {
          throw new Error("Network res was not ok");
        }

        const data: Country[] = await res.json();

        if (cca2) {
          setCountries(data.filter((country) => country.cca2 === cca2));
        } else {
          setCountries(data);
        }
      } catch {
        setError("Failed to fetch countries data");
      } finally {
        setLoading(false);
      }
    };

    fetchCountriesData();
  }, [cca2]);

  if (loading) {
    return <div>{t("CountryList.loading")}</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      {countries.map((country) => (
        <div key={country.cca2}>
          <h2>
            {country.flag}
            {country.cca2}
          </h2>
          <p>{t("CountryList.currencies")}</p>
          <ul>
            {Object.entries(country.currencies).map(([code, currency]) => (
              <li key={code}>
                {currency.name} ({currency.symbol})
              </li>
            ))}
          </ul>
          <p>{t("CountryList.languages")}</p>
          <ul>
            {Object.entries(country.languages).map(([code, language]) => (
              <li key={code}>{language}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default CountryList;
