"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import * as React from "react";

import { cn } from "~/lib/cn";
import { Button } from "~/ui/primitives/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/ui/primitives/dropdown-menu";

export function ThemeToggle({ className }: { className?: string }) {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  // Avoid hydration mismatch by rendering only on client-side
  React.useEffect(() => {
    requestAnimationFrame(() => setMounted(true));
  }, []);

  if (!mounted) {
    return (
      <Button
        className={cn("h-9 w-9 rounded-full", className)}
        disabled
        size="icon"
        variant="ghost"
      >
        <Sun className="h-[1.2rem] w-[1.2rem] opacity-70" />
        <span className="sr-only">Loading theme toggle</span>
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className={cn(
            `
              h-9 w-9 rounded-full bg-background transition-colors
              hover:bg-muted
            `,
            className,
          )}
          size="icon"
          variant="ghost"
        >
          <Sun
            className={`
              h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all
              duration-300
              dark:scale-0 dark:-rotate-90
            `}
          />
          <Moon
            className={`
              absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all
              duration-300
              dark:scale-100 dark:rotate-0
            `}
          />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          className={cn(
            "flex cursor-pointer items-center gap-2",
            theme === "light" && "font-medium text-primary",
          )}
          onClick={() => setTheme("light")}
        >
          <Sun className="h-4 w-4" />
          Light
        </DropdownMenuItem>
        <DropdownMenuItem
          className={cn(
            "flex cursor-pointer items-center gap-2",
            theme === "dark" && "font-medium text-primary",
          )}
          onClick={() => setTheme("dark")}
        >
          <Moon className="h-4 w-4" />
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem
          className={cn(
            "flex cursor-pointer items-center gap-2",
            (theme === "system" || !theme) && "font-medium text-primary",
          )}
          onClick={() => setTheme("system")}
        >
          <svg
            aria-hidden="true"
            className="h-4 w-4"
            fill="currentColor"
            role="img"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>System Theme Icon</title>
            <path
              clipRule="evenodd"
              d="M3.5 2A1.5 1.5 0 002 3.5V15a3 3 0 003 3h12a1.5 1.5 0 001.5-1.5V3.5A1.5 1.5 0 0017 2H3.5zM5 5.75c0-.41.334-.75.75-.75h8.5a.75.75 0 010 1.5h-8.5a.75.75 0 01-.75-.75zM5.75 8.25a.75.75 0 00-.75.75v3.25c0 .414.336.75.75.75h8.5a.75.75 0 00.75-.75V9a.75.75 0 00-.75-.75h-8.5z"
              fillRule="evenodd"
            />
          </svg>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
