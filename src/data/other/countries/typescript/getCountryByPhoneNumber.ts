import { countries } from "~/data/other/countries/typescript/countries";

export default function getCountryByPhoneNumber(phoneNumber: string) {
  const matchingCountries = [];
  const formattedPhoneNumber = phoneNumber.replace(/\s/g, "");

  for (const item of countries) {
    if (
      formattedPhoneNumber.startsWith(item.callingCode.replace(/[\s#]/g, ""))
    ) {
      matchingCountries.push(item);
    }
  }

  let [matchingCountry] = matchingCountries;

  if (matchingCountries.length > 1) {
    // If there are multiple matching countries, we need to find the correct one
    // @ts-expect-error TODO: fix
    matchingCountry = null;

    // We need to find the country that has the correct area code
    // @ts-expect-error TODO: fix
    const { callingCode } = matchingCountries[0];

    for (const matchingCountry_ of matchingCountries) {
      for (const item of matchingCountry_.phoneMasks) {
        const areaCode = formattedPhoneNumber.substring(
          callingCode.length,
          item.replace(/\D/g, "").length + callingCode.length,
        );

        if (
          areaCode &&
          item.replace(/\D/g, "") &&
          areaCode === item.replace(/\D/g, "")
        ) {
          if (
            matchingCountry_.cca2 === "CA" ||
            matchingCountry_.cca2 === "US"
          ) {
            matchingCountry = {
              ...matchingCountry_,
              phoneMasks: [item.replace(/\d/g, "#").trim()],
            };
          } else {
            matchingCountry = {
              ...matchingCountry_,
              phoneMasks: [item.replace(/\d/g, "").trim()],
            };
          }
        }
      }
    }
  }

  if (matchingCountry) {
    matchingCountry = {
      name: matchingCountry.name,
      callingCode: matchingCountry.callingCode,
      cca2: matchingCountry.cca2,
      flag: matchingCountry.flag,
      phoneMasks: matchingCountry.phoneMasks,
    };
  }

  return matchingCountry;
}
