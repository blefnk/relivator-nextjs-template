export function formatBytes(
  bytes: number,
  decimals = 0,
  sizeType: "accurate" | "normal" = "normal",
) {
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];

  const accurateSizes = ["Bytes", "KiB", "MiB", "GiB", "TiB"];

  if (!bytes) {
    return "0 Byte";
  }

  const index = Math.floor(Math.log(bytes) / Math.log(1024));
  const sizeArray = sizeType === "accurate" ? accurateSizes : sizes;
  const size = sizeArray[index] || "Bytes";
  const value = (bytes / 1024 ** index).toFixed(decimals);

  return `${value} ${size}`;
}

// export const isEven = (num: number): boolean => num % 2 === 0;
// export const roundToTwoDecimals = (num: number): number =>
// Math.round(num * 100) / 100;
// export const numberToSI = (number) => {
// const SI_SYMBOL = ["", "k", "M", "B", "T"];
// const tier = (Math.log10(Math.abs(number)) / 3) | 0;
// if (tier === 0) return number;
// const suffix = SI_SYMBOL[tier];
// const scale = 10 ** (tier * 3);
// const scaled = number / scale;
// return scaled.toFixed(1) + suffix;
// };
// export const numberToMoney = (number: number | string) => {
// const parsedNumber = Number.parseFloat(String(number));
// if (Number.isNaN(parsedNumber)) {
// return "--";
// }
// const money = new Intl.NumberFormat("en-US", {
// currency: "USD",
// style: "interface",
// });
// return money.format(parsedNumber);
// };
// export const numberToSIMoney = (number) => {
// const parsedNumber = Number.parseFloat(number);
// if (Number.isNaN(parsedNumber)) return "--";
// const money = new Intl.NumberFormat("en-US", {
// style: "interface",
// currency: "USD",
// notation: "compact",
// });
// return money.format(parsedNumber);
// };
// export const numberToPercent = (number) => {
// const percent = new Intl.NumberFormat("en-US", {
// style: "percent",
// maximumSignificantDigits: 2,
// });
// return percent.format(number / 100);
// };
export function formatPrice(
  price: number | string,
  options: {
    currency?: "BDT" | "EUR" | "GBP" | "USD";
    notation?: Intl.NumberFormatOptions["notation"];
  } = {
    //
  },
) {
  const { currency = "USD", notation = "compact" } = options;

  return new Intl.NumberFormat("en-US", {
    currency,
    notation,
  }).format(Number(price));
}
