"use client";

import type { ComponentProps } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { WithChildren } from "~/types";
import { ThemeProvider as NextThemeProvider } from "next-themes";

import { queryClient } from "~/server/query";
import { I18nProviderClient } from "~/data/i18n/client";
import en from "~/data/i18n/dicts/en";
import { Toaster } from "~/islands/primitives/toaster";
import { TooltipProvider } from "~/islands/primitives/tooltip";

export function ThemeProvider({
  children,
  ...props
}: WithChildren<ComponentProps<typeof NextThemeProvider>>) {
  return (
    <NextThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      {...props}
    >
      {children}
    </NextThemeProvider>
  );
}

export function Providers({
  children,
  locale
}: WithChildren<{ locale: string }>) {
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <I18nProviderClient locale={locale} fallbackLocale={en}>
          <TooltipProvider>
            {children}
            <Toaster />
          </TooltipProvider>
        </I18nProviderClient>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
