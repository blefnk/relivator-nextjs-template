import { countries } from "~/data/other/countries/typescript/countries";

export default function getCountriesByCallingCode(callingCode: string) {
  const formattedCallingCode = String(callingCode).includes("+")
    ? callingCode
    : `+${callingCode}`;

  const matchingCountries = countries.filter(
    (country) => country.callingCode === formattedCallingCode,
  );

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
