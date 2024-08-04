import { replace } from "string-ts";

export const typography = {
  h1: "scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-5xl",
  h2: "scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0",
  h3: "scroll-m-20 text-2xl font-semibold tracking-tight",
  h4: "scroll-m-20 text-xl font-semibold tracking-tight",
  link: `text-sm text-primary inline-block after:content-[''] after:w-0 after:h-[1px]
  after:block after:bg-current after:transition-all hover:after:w-full`,
  p: "leading-7 [&:not(:first-child)]:mt-6",
};

export function slugify(string_: string) {
  return string_
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/-{2,}/g, "-");
}

export function unslugify(string_: string) {
  return replace(string_, /-/g, " ");
}

// @deprecated Use this instead:
// @see https://github.com/gustavoguichard/string-ts#titlecase
// export function titleCaseDeprecated(str: string) {
//   return str.replace(
//     /\w\S*/g,
//     (txt) => txt.charAt(0).toUpperCase() + txt.slice(1).toLowerCase(),
//   );
// }
// @deprecated Use this instead:
// @see https://github.com/gustavoguichard/string-ts#titlecase
// export function titleCaseTsDeprecated(str: string) {
//   return str
//     .split(/\s+/) // Split the string into words
//     .map(
//       (word) =>
//         word.charAt(0).toUpperCase() + // Uppercase the first char of each word
//         replace(
//           word.slice(1), // Take the rest of the word
//           /.+/,
//           word.slice(1).toLowerCase(), // Make the rest of the word lowercase
//         ),
//     )
//     .join(" "); // Rejoin the words into a single string
// }
// export const capitalize = (str: string): string =>
//   str.charAt(0).toUpperCase() + str.slice(1);
// export const reverseString = (str: string): string =>
//   str.split("").reverse().join("");
// export function toSentenceCase(str: string) {
//   return str
//     .replace(/([A-Z])/g, " $1")
//     .replace(/^./, (str) => str.toUpperCase());
// }
export function truncate(string_: string, length: number) {
  return string_.length > length
    ? `${string_.substring(0, length)}...`
    : string_;
}
