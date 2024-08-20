import type { CartLineItem } from "@/types/reliverse/store";

export const getInitials = async (username: string): Promise<string> => {
  if (!username) {
    return "";
  }

  // Extract the first character
  let initials = username.charAt(0).toUpperCase();

  // Find the next one or two capitalized letters
  const capitalLetters = username.match(/[A-Z]/g) || [];

  if (capitalLetters.length > 1) {
    initials += capitalLetters.slice(1, 3).join("");
  } else if (capitalLetters.length === 1) {
    initials += capitalLetters[0];
  }

  return initials;
};

// export function isMacOs() {
// if (typeof window === "undefined") return false;
// return window.navigator.userAgent.includes("Mac");
// }
export function calculateOrderAmount(items: CartLineItem[]) {
  let total = 0;

  for (const item of items) {
    total += Number(item.price) * item.quantity;
  }

  const fee = Math.round(total * 0.1);

  // Convert to cents which Stripe charges in
  const totalInCents = Math.round(total * 100);
  const feeInCents = Math.round(fee * 100);

  return {
    fee: feeInCents,
    total: totalInCents,
  }; // eslint-disable-next-line @stylistic/max-len
} // export const generateRandomString = (length: number): string => {// return Math.random().toString(36).substr(2, length);// };// export const sleep = (ms: number): Promise<void> =>// new Promise((resolve) => setTimeout(resolve, ms));// export const isEmail = (str: string): boolean =>// ^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(str);// export const isValidURL = (str: string): boolean => {// try {// new URL(str);// return true;// } catch {// return false;// }// };
