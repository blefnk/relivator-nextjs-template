/**
 * Utility functions
 * =================
 *
 * This file contains utility functions that are used throughout the app.
 *
 * @see https://github.com/sadmann7/skateshop/blob/main/src/lib/utils.ts
 * @see https://github.com/steven-tey/dub/blob/main/packages/utils/src/index.ts
 */

import { isClerkAPIResponseError } from "@clerk/nextjs";
import { type CartLineItem } from "~/types";
import { clsx, type ClassValue } from "clsx";
import dayjs from "dayjs";
import { toast } from "react-hot-toast";
import { replace } from "string-ts";
import { twMerge } from "tailwind-merge";
import * as z from "zod";

import { env } from "~/env.mjs";

/**
 * Determines whether the environment is development.
 * @returns boolean Whether the environment is dev.
 */
export const isDevEnv = () => {
  return process.env.NODE_ENV === "development";
};

/**
 * ### Helper function to append a query parameter to the URL.
 *
 * If URL contains other query parameters besides specified ones in the function,
 * the `addQueryParamIfMissed` function will handle them. This function works
 * by parsing the entire URL and manipulating its query parameters
 * specifically, without altering other parts of the URL.
 *
 * @param url - the URL to append the query parameter to.
 * @param parameter - the query parameter to append.
 * @param value - the value of the query parameter.
 * @returns the URL with the query parameter appended.
 *
 * @see https://stackoverflow.com/q/5999118
 */
export function addQueryParamIfMissed(
  url: string,
  parameter: string,
  value: string,
): string {
  const urlObject = new URL(url);
  if (!urlObject.searchParams.has(parameter)) {
    urlObject.searchParams.append(parameter, value);
  }
  return urlObject.toString();
}

/**
 * `clsx` is a tiny utility for constructing className strings conditionally.
 * `cn` function is a small extension for `clsx` to implement better support for TailwindCSS classes.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export const cls = cn;

export const ERR = {
  unauthenticated: "Unauthenticated",
  unauthorized: "Unauthorized",
  db: "Failed to find in database",
  undefined: "Undefined variable",
  fetch: "Failed to fetch data",
  not_allowed: "User should not be allowed to do this action",
};

export function formatDate(date: Date | string | number) {
  return dayjs(date).format("MMMM D, YYYY");
}

export function formatBytes(
  bytes: number,
  decimals = 0,
  sizeType: "accurate" | "normal" = "normal",
) {
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const accurateSizes = ["Bytes", "KiB", "MiB", "GiB", "TiB"];
  if (bytes === 0) return "0 Byte";
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / 1024 ** i).toFixed(decimals)} ${
    sizeType === "accurate" ? accurateSizes[i] ?? "Bytest" : sizes[i] ?? "Bytes"
  }`;
}

export function slugify(str: string) {
  return str
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-");
}

export function unslugify(str: string) {
  return replace(str, /-/g, " ");
}

/**
 * @deprecated Use this instead:
 * @see https://github.com/gustavoguichard/string-ts#titlecase
 */
export function titleCaseDeprecated(str: string) {
  return str.replace(
    /\w\S*/g,
    (txt) => txt.charAt(0).toUpperCase() + txt.slice(1).toLowerCase(),
  );
}

/**
 * @deprecated Use this instead:
 * @see https://github.com/gustavoguichard/string-ts#titlecase
 */
export function titleCaseTsDeprecated(str: string) {
  return str
    .split(/\s+/) // Split the string into words
    .map(
      (word) =>
        word.charAt(0).toUpperCase() + // Uppercase the first char of each word
        replace(
          word.slice(1), // Take the rest of the word
          /.+/,
          word.slice(1).toLowerCase(), // Make the rest of the word lowercase
        ),
    )
    .join(" "); // Rejoin the words into a single string
}

export function toSentenceCase(str: string) {
  return str
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (str) => str.toUpperCase());
}

export function truncate(str: string, length: number) {
  return str.length > length ? `${str.substring(0, length)}...` : str;
}

export function isArrayOfFile(files: unknown): files is File[] {
  const isArray = Array.isArray(files);
  if (!isArray) return false;
  return files.every((file) => file instanceof File);
}

export function absoluteUrl(path: string) {
  return `${env.NEXT_PUBLIC_APP_URL}${path}`;
}

export function catchError(error: unknown) {
  if (error instanceof z.ZodError) {
    const errors = error.issues.map((issue) => {
      return issue.message;
    });
    return toast(errors.join("\n"));
  } else if (error instanceof Error) {
    return toast(error.message);
  } else {
    return toast("Something went wrong, please try again later.");
  }
}

export function toastError(errorMessage: string) {
  toast.error(errorMessage);
}

export function catchClerkError(error: unknown) {
  const unknownErr = "Something went wrong, please try again later.";

  if (error instanceof z.ZodError) {
    const errors = error.issues.map((issue) => {
      return issue.message;
    });
    return toast(errors.join("\n"));
  } else if (isClerkAPIResponseError(error)) {
    return toast.error(error.errors[0]?.longMessage ?? unknownErr);
  } else {
    return toast.error(unknownErr);
  }
}

/**
 * @see https://github.com/nextauthjs/next-auth/blob/main/docs/docs/guides/basics/pages.md?plain=1#L47
 */
export function catchAuthError(error?: string | null) {
  switch (error) {
    case "OAuthAccountNotLinked":
      return {
        title: "You already have an account",
        description:
          "Please sign in with the other service you used to sign up.",
      };
    case "EmailSignin":
      return {
        title: "Unable to send login e-mail",
        description: "Sending your login e-mail failed. Please try again.",
      };
    case "CredentialsSignin":
      return {
        title: "Invalid username or password",
        description:
          "The username and password you entered did not match our records. Please double-check and try again.",
      };
    case "SessionRequired":
      return {
        title: "Login required",
        description: "You must be logged in to view this page",
      };
    default:
      return {
        title: "Something went wrong.",
        description: "Your sign in request failed. Please try again.",
      };
  }
}

export function isMacOs() {
  if (typeof window === "undefined") return false;

  return window.navigator.userAgent.includes("Mac");
}

export function calculateOrderAmount(items: CartLineItem[]) {
  const total = items.reduce((acc, item) => {
    return acc + Number(item.price) * item.quantity;
  }, 0);
  const fee = Math.round(total * 0.1);

  const totalInCents = Math.round(total * 100);
  const feeInCents = Math.round(fee * 100);

  return {
    total: totalInCents, // Converts to cents which stripe charges in
    fee: feeInCents,
  };
}

export function formatPrice(
  price: number | string,
  options: {
    currency?: "USD" | "EUR" | "GBP" | "BDT";
    notation?: Intl.NumberFormatOptions["notation"];
  } = {},
) {
  const { currency = "USD", notation = "compact" } = options;

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    notation,
  }).format(Number(price));
}

export const numberToSI = (number) => {
  const SI_SYMBOL = ["", "k", "M", "B", "T"];

  const tier = (Math.log10(Math.abs(number)) / 3) | 0;

  if (tier === 0) return number;

  const suffix = SI_SYMBOL[tier];
  const scale = 10 ** (tier * 3);

  const scaled = number / scale;

  return scaled.toFixed(1) + suffix;
};

export const numberToMoney = (number) => {
  const parsedNumber = parseFloat(number);

  if (Number.isNaN(parsedNumber)) return "--";

  const money = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  return money.format(parsedNumber);
};

export const numberToSIMoney = (number) => {
  const parsedNumber = parseFloat(number);

  if (Number.isNaN(parsedNumber)) return "--";

  const money = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    notation: "compact",
  });

  return money.format(parsedNumber);
};

export const numberToPercent = (number) => {
  const percent = new Intl.NumberFormat("en-US", {
    style: "percent",
    maximumSignificantDigits: 2,
  });

  return percent.format(number / 100);
};
