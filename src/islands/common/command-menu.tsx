"use client";

import { useCallback, useState } from "react";

import { Circle, File, Laptop, Moon, Search, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";

import { navItems } from "~/utils/server/links";
import { useHotkeys } from "~/hooks/use-hotkeys";
import { useI18n, useScopedI18n } from "~/utils/client/i18n";

import { Button } from "../ui/button";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "../ui/command";

type RouteHref = never;

export function CommandMenu() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const { setTheme } = useTheme();
  const t = useI18n();
  const scopedT = useScopedI18n("islands");

  useHotkeys([
    ["ctrl+K", () => setIsOpen((open) => !open)],
    ["meta+K", () => setIsOpen((open) => !open)],
  ]);

  const runCommand = useCallback(
    (command: () => void) => () => {
      setIsOpen(false);
      command();
    },
    [],
  );

  return (
    <>
      <Button
        variant="outline"
        className="h-9 w-full justify-between text-sm text-muted-foreground sm:pr-4 md:w-40 lg:w-64"
        onClick={() => setIsOpen(true)}
      >
        <div className="flex items-center gap-2">
          <Search className="h-4 w-4" />
          <span>{scopedT("navbar.search")}</span>
        </div>
        <kbd className="pointer-events-none hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>
      <CommandDialog open={isOpen} onOpenChange={setIsOpen}>
        <CommandInput placeholder={scopedT("navbar.search.placeholder")} />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Links">
            {navItems.mainNav
              .filter((item) => !item.external)
              .map((item) => (
                <CommandItem
                  key={item.href}
                  value={scopedT(`navbar.main.${item.id}`)}
                  onSelect={runCommand(() =>
                    router.push(item.href as RouteHref),
                  )}
                  className="capitalize"
                >
                  <File className="mr-2 h-4 w-4" />
                  {scopedT(`navbar.main.${item.id}`)}
                </CommandItem>
              ))}
          </CommandGroup>
          <CommandSeparator />
          {navItems.sidebarNav.map((group) => (
            <CommandGroup
              key={group.title}
              heading={scopedT(`navbar.command.${group.id}`)}
            >
              {group.items.map((item) => (
                <CommandItem
                  key={item.id}
                  value={t(`pages.tools.${item.id}.title`)}
                  onSelect={runCommand(() =>
                    router.push(item.href as RouteHref),
                  )}
                >
                  <div className="mr-2 flex h-4 w-4 items-center justify-center">
                    <Circle className="h-3 w-3" />
                  </div>
                  {t(`pages.tools.${item.id}.title`)}
                </CommandItem>
              ))}
            </CommandGroup>
          ))}
          <CommandSeparator />
          <CommandGroup heading={scopedT("navbar.command.theme")}>
            <CommandItem onSelect={runCommand(() => setTheme("light"))}>
              <Sun className="mr-2 h-4 w-4" />
              <span>{scopedT("navbar.command.light")}</span>
            </CommandItem>
            <CommandItem onSelect={runCommand(() => setTheme("dark"))}>
              <Moon className="mr-2 h-4 w-4" />
              <span>{scopedT("navbar.command.dark")}</span>
            </CommandItem>
            <CommandItem onSelect={runCommand(() => setTheme("system"))}>
              <Laptop className="mr-2 h-4 w-4" />
              <span>{scopedT("navbar.command.system")}</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
