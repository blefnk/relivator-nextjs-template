"use client";

import type { ThemeProviderProps } from "next-themes/dist/types";

import { ThemeProvider as NextThemesProvider } from "next-themes";

import { TooltipProvider } from "~/components/Providers/Tooltip";

export function Providers({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider {...props}>
      <TooltipProvider>{children}</TooltipProvider>
    </NextThemesProvider>
  );
}
