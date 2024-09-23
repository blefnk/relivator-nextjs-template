"use client";

import { Moon, SunMedium } from "lucide-react";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";

import { Button } from "~/components/ui/button";

export function ThemeToggle() {
  const t = useTranslations();

  const { setTheme, theme } = useTheme();

  return (
    <Button
      size="icon"
      variant="ghost"
      onClick={() => {
        setTheme(theme === "light" ? "dark" : "light");
      }}
    >
      <SunMedium
        className={`
          size-5 rotate-0 scale-100 transition-all

          dark:-rotate-90 dark:scale-0
        `}
        aria-hidden="true"
      />
      <Moon
        className={`
          absolute size-5 rotate-90 scale-0 transition-all

          dark:rotate-0 dark:scale-100
        `}
        aria-hidden="true"
      />
      <span className="sr-only">{t("ThemeToggle.toggleTheme")}</span>
    </Button>
  );
}
