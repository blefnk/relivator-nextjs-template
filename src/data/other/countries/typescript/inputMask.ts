import { countries } from "~/data/other/countries/typescript/countries";

export default function phoneMask(
  phoneNumber: string,
  callingCode: string,
  cca2: string,
): string {
  let matrix = "";

  for (const item of countries) {
    const newCode = item.callingCode.replace(/[\s#]/g, "");

    if (callingCode && callingCode.includes(newCode)) {
      if (item.phoneMasks.length === 1) {
        if (cca2 !== "CA" && cca2 !== "US" && cca2 !== "IT") {
          // @ts-expect-error TODO: fix
          matrix = item.phoneMasks[0].replace(/\d/g, "").trim();
        }
      } else if (item.phoneMasks.length > 1) {
        let hasDifferentLengthsOfPhoneNumbers = false;

        for (let index = 0; index < item.phoneMasks.length; index++) {
          if (
            // @ts-expect-error TODO: fix
            phoneNumber.length > item.phoneMasks[0].length &&
            newCode !== "+1"
          ) {
            hasDifferentLengthsOfPhoneNumbers = true;
          }
        }

        if (!hasDifferentLengthsOfPhoneNumbers) {
          if (cca2 === "CA" || cca2 === "US") {
            // @ts-expect-error TODO: fix
            matrix = item.phoneMasks[0].replace(/\d/g, "#").trim();
          } else {
            // @ts-expect-error TODO: fix
            matrix = item.phoneMasks[0].replace(/\d/g, "").trim();
          }
        } else {
          for (let index = 0; index < item.phoneMasks.length; index++) {
            if (
              // @ts-expect-error TODO: fix
              phoneNumber.length > item.phoneMasks[index].length &&
              item.phoneMasks[index + 1]
            ) {
              // @ts-expect-error TODO: fix
              matrix = item.phoneMasks[index + 1].replace(/\d/g, "").trim();
            }
          }
        }
      }
    }
  }

  let index = 0;
  const newValue = phoneNumber.replace(/\D/g, "");

  return matrix.replace(/(?!\+)./g, function (a) {
    return /[\d#]/.test(a) && index < newValue.length
      ? newValue.charAt(index++)
      : index >= newValue.length
        ? ""
        : a;
  });
}
