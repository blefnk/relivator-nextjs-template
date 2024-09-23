import type { ClassValue } from "clsx";

import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// clsx is a tiny utility for constructing className
// strings conditionally, this utility also ensures
// a better support for the tailwindcss classes
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
