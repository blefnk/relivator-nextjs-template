import type { User } from "@clerk/nextjs/server";
import type { ClassValue } from "clsx";

import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import { env } from "~/env";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function absoluteUrl(path: string) {
  return `${env.NEXT_PUBLIC_APP_URL}${path}`;
}

export function formatPrice(
  price: number | string,
  options: Intl.NumberFormatOptions = {},
) {
  return new Intl.NumberFormat("en-US", {
    currency: options.currency ?? "USD",
    notation: options.notation ?? "compact",
    style: "currency",
    ...options,
  }).format(Number(price));
}

export function formatNumber(
  number: number | string,
  options: Intl.NumberFormatOptions = {},
) {
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: options.maximumFractionDigits ?? 2,
    minimumFractionDigits: options.minimumFractionDigits ?? 0,
    notation: options.notation ?? "standard",
    style: options.style ?? "decimal",
    ...options,
  }).format(Number(number));
}

export function formatDate(
  date: Date | number | string,
  options: Intl.DateTimeFormatOptions = {},
) {
  return new Intl.DateTimeFormat("en-US", {
    day: options.day ?? "numeric",
    month: options.month ?? "long",
    year: options.year ?? "numeric",
    ...options,
  }).format(new Date(date));
}

export function formatBytes(
  bytes: number,
  decimals = 0,
  sizeType: "accurate" | "normal" = "normal",
) {
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const accurateSizes = ["Bytes", "KiB", "MiB", "GiB", "TiB"];

  if (bytes === 0) return "0 Byte";

  const index = Math.floor(Math.log(bytes) / Math.log(1024));

  return `${(bytes / 1024 ** index).toFixed(decimals)} ${
    sizeType === "accurate"
      ? (accurateSizes[index] ?? "Bytest")
      : (sizes[index] ?? "Bytes")
  }`;
}

export function formatId(id: string) {
  return `#${id.toString().padStart(4, "0")}`;
}

export function slugify(str: string) {
  return str
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/-{2,}/g, "-");
}

export function unslugify(str: string) {
  return str.replace(/-/g, " ");
}

export function toTitleCase(str: string) {
  return str.replace(
    /\w\S*/g,
    (txt) => txt.charAt(0).toUpperCase() + txt.slice(1).toLowerCase(),
  );
}

export function toSentenceCase(str: string) {
  return str
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (str) => str.toUpperCase());
}

export function truncate(str: string, length: number) {
  return str.length > length ? `${str.substring(0, length)}...` : str;
}

export function getUserEmail(user: null | User) {
  const email =
    user?.emailAddresses?.find(
      (event_) => event_.id === user.primaryEmailAddressId,
    )?.emailAddress ?? "";

  return email;
}

export function isMacOs() {
  if (typeof globalThis === "undefined") return false;

  return globalThis.navigator.userAgent.includes("Mac");
}
