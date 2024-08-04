import { countries } from "~/data/other/countries/typescript/countries";

export default function getCountriesByName(name: string) {
  const matchingCountries = countries.filter((country) => {
    return country.name.includes(name);
  });

  const formattedCountries = [];

  for (const country of matchingCountries) {
    formattedCountries.push({
      name: country.name,
      callingCode: country.callingCode,
      cca2: country.cca2,
      flag: country.flag,
    });
  }

  return formattedCountries;
}
