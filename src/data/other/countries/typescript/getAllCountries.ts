import { countries } from "~/data/other/countries/typescript/countries";

export default function getAllCountries() {
  const formattedCountries = [];

  for (const country of countries) {
    formattedCountries.push({
      name: country.name,
      callingCode: country.callingCode,
      cca2: country.cca2,
      flag: country.flag,
    });
  }

  return formattedCountries;
}
