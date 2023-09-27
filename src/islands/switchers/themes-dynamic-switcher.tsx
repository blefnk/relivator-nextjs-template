"use client";

import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { Laptop, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { useIsClient } from "~/hooks/use-is-client";
import { Button, type ButtonProps } from "~/islands/primitives/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/islands/primitives/dropdown";

/**
 * todo: implement (with adding UI from `general`):
 * @see https://michaelangelo.io/blog/darkmode-rsc
 */

export type ThemesDynamicSwitcherProps = ButtonProps & {
  theme: "light" | "dark";
  iconClassName?: string;
};

export function ThemesDynamicSwitcher({
  theme,
  className,
  iconClassName = "mr-2 h-4 w-4",
  ...props
}: ThemesDynamicSwitcherProps) {
  const router = useRouter();

  return (
    <div>
      <button
        onClick={() => {
          Cookies.set("x-theme", theme === "dark" ? "light" : "dark");
          router.refresh();
        }}
        aria-label="switch theme"
        className="rounded bg-indigo-600 px-2 py-1 text-xs font-semibold
         text-white shadow-sm hover:bg-indigo-500 focus-visible:outline
         focus-visible:outline-2 focus-visible:outline-offset-2
         focus-visible:outline-indigo-600"
      >
        {theme === "dark" ? "Light Mode" : "Dark Mode"}
      </button>
    </div>
  );
}
