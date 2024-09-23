"use client";

import type { ThemeProviderProps } from "next-themes/dist/types";

import { Theme as RadixThemes } from "@radix-ui/themes";
import { ThemeProvider as NextThemesProvider } from "next-themes";

import { TooltipProvider } from "~/components/ui/tooltip";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider
      {...props}
      attribute="class"
      defaultTheme="system"
      disableTransitionOnChange
      enableSystem
    >
      <RadixThemes
        accentColor="lime"
        appearance="inherit"
        grayColor="gray"
        radius="large"
      >
        <TooltipProvider delayDuration={0}>
          {/* import { Popover as PopoverProvider } from "~/components/ui/popover"; */}
          {/* <PopoverProvider>{children}</PopoverProvider> */}
          {children}
        </TooltipProvider>
      </RadixThemes>
    </NextThemesProvider>
  );
}
