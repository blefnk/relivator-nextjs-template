"use client";

import type { ComponentProps } from "react";
import { ClerkProvider } from "@clerk/nextjs";
import { QueryClientProvider } from "@tanstack/react-query";
import { settings } from "~/app";
import { ThemeProvider as NextThemeProvider } from "next-themes";

import { I18nProviderClient } from "~/data/i18n/client";
import en from "~/data/i18n/dicts/en";
import { Toaster } from "~/islands/primitives/toast/toaster";
import { queryClient } from "~/utils/server/query";
import { WithChildren } from "~/utils/types/with-children";

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

export function ClientProviders({
  children,
  locale
}: WithChildren<{ locale: string }>) {
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <I18nProviderClient locale={locale} fallbackLocale={en}>
          {children}
        </I18nProviderClient>
      </QueryClientProvider>
      <Toaster />
    </ThemeProvider>
  );
}
