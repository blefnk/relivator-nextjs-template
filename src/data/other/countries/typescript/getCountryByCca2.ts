import { countries } from "~/data/other/countries/typescript/countries";

export default function getCountryByCca2(cca2: string) {
  let matchingCountry = countries.find(
    (country) => country.cca2.toLowerCase() === cca2.toLowerCase(),
  );

  if (matchingCountry) {
    matchingCountry = {
      name: matchingCountry.name,
      callingCode: matchingCountry.callingCode,
      cca2: matchingCountry.cca2,
      flag: matchingCountry.flag,
      phoneMasks: matchingCountry.phoneMasks,
    };

    return matchingCountry;
  }

  return null;
}
