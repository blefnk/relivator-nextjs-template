"use client";

import { Button } from "@/components/ui/button";
import { Moon, SunMedium } from "lucide-react";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const t = useTranslations();

  const { setTheme, theme } = useTheme();

  return (
    <Button
      onClick={() => {
        setTheme(theme === "light" ? "dark" : "light");
      }}
      size="icon"
      variant="ghost"
    >
      <SunMedium
        aria-hidden="true"
        className={`
          size-5 rotate-0 scale-100 transition-all

          dark:-rotate-90 dark:scale-0
        `}
      />
      <Moon
        aria-hidden="true"
        className={`
          absolute size-5 rotate-90 scale-0 transition-all

          dark:rotate-0 dark:scale-100
        `}
      />
      <span className="sr-only">{t("ThemeToggle.toggleTheme")}</span>
    </Button>
  );
}
