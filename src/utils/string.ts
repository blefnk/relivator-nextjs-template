import { replace } from "string-ts";

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

export function truncate(string_: string, length: number) {
  return string_.length > length
    ? `${string_.substring(0, length)}...`
    : string_;
}
