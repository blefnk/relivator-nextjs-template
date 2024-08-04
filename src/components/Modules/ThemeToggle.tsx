"use client";

import { Button } from "@/browser/reliverse/ui/Button";
import { useTheme } from "next-themes";

import { Icons } from "~/components/Common/Icons";

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();

  return (
    <Button
      onClick={() => {
        setTheme(theme === "light" ? "dark" : "light");
      }}
      size="icon"
      variant="ghost"
    >
      <Icons.sun
        aria-hidden="true"
        className={`
          size-5 rotate-0 scale-100 transition-all

          dark:-rotate-90 dark:scale-0
        `}
      />
      <Icons.moon
        aria-hidden="true"
        className={`
          absolute size-5 rotate-90 scale-0 transition-all

          dark:rotate-0 dark:scale-100
        `}
      />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
