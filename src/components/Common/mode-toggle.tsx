"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown";
import { Laptop, Moon, SunMedium } from "lucide-react";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";

export function ModeToggle() {
  const t = useTranslations();

  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="size-6 px-0" size="sm" variant="ghost">
          <SunMedium
            className={`
              rotate-0 scale-100 transition-all

              dark:-rotate-90 dark:scale-0
            `}
          />
          <Moon
            className={`
              absolute rotate-90 scale-0 transition-all

              dark:rotate-0 dark:scale-100
            `}
          />
          <span className="sr-only">{t("mode-toggle.toggleTheme")}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => {
            setTheme("light");
          }}
        >
          <SunMedium className="mr-2 size-4" />
          <span>{t("mode-toggle.light")}</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            setTheme("dark");
          }}
        >
          <Moon className="mr-2 size-4" />
          <span>{t("mode-toggle.dark")}</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            setTheme("system");
          }}
        >
          <Laptop className="mr-2 size-4" />
          <span>{t("mode-toggle.system")}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
