"use client";

import { Button } from "@/browser/reliverse/ui/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/browser/reliverse/ui/Dropdown";
import { useTheme } from "next-themes";

import { Icons } from "~/components/Common/Icons";

export function ModeToggle() {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="size-6 px-0" size="sm" variant="ghost">
          <Icons.sun
            className={`
              rotate-0 scale-100 transition-all

              dark:-rotate-90 dark:scale-0
            `}
          />
          <Icons.moon
            className={`
              absolute rotate-90 scale-0 transition-all

              dark:rotate-0 dark:scale-100
            `}
          />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => {
            setTheme("light");
          }}
        >
          <Icons.sun className="mr-2 size-4" />
          <span>Light</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            setTheme("dark");
          }}
        >
          <Icons.moon className="mr-2 size-4" />
          <span>Dark</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            setTheme("system");
          }}
        >
          <Icons.laptop className="mr-2 size-4" />
          <span>System</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
