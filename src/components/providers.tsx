"use client";

import type * as React from "react";

import { ThemeProvider as NextThemesProvider } from "next-themes";

import { TooltipProvider } from "~/components/ui/tooltip";

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider {...props}>
      <TooltipProvider delayDuration={0}>{children}</TooltipProvider>
    </NextThemesProvider>
  );
}
