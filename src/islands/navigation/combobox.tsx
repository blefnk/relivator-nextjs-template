"use client";

import { useCallback, useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { cn } from "~/utils";
import { Circle, File, Laptop, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { type Product } from "~/data/db/schema";
import { useDebounce } from "~/hooks/use-debounce";
import { useHotkeys } from "~/hooks/use-hotkeys";
import { Icons } from "~/islands/icons";
import { Button } from "~/islands/primitives/button";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "~/islands/primitives/command";
import { Skeleton } from "~/islands/primitives/skeleton";
import { filterProductsAction } from "~/server/actions/product";
import { navItems } from "~/server/links";

type RouteHref = never;

export function Combobox({
  tSearchTitle = "Search...",
  tPlaceholder = "Type a command or search",
  tCmdTheme = "Theme",
  tCmdLight = "Light",
  tCmdDark = "Dark",
  tCmdSystem = "System",
}: {
  tSearchTitle?: string;
  tPlaceholder?: string;
  tCmdTheme?: string;
  tCmdLight?: string;
  tCmdDark?: string;
  tCmdSystem?: string;
}) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 300);
  const [data, setData] = useState<
    | {
        category: Product["category"];
        products: Pick<Product, "id" | "name" | "category">[];
      }[]
    | null
  >(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (debouncedQuery.length === 0) setData(null);

    if (debouncedQuery.length > 0) {
      startTransition(async () => {
        const data = await filterProductsAction(debouncedQuery);
        setData(data);
      });
    }
  }, [debouncedQuery]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen((isOpen) => !isOpen);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleSelect = useCallback((callback: () => unknown) => {
    setIsOpen(false);
    callback();
  }, []);

  useEffect(() => {
    if (!isOpen) {
      setQuery("");
    }
  }, [isOpen]);

  const { setTheme } = useTheme();

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
        className="relative h-9 w-9 p-0 xl:h-10 xl:w-60 xl:justify-start xl:px-3 xl:py-2"
        onClick={() => setIsOpen(true)}
      >
        <Icons.search className="h-4 w-4 xl:mr-2" aria-hidden="true" />
        <span className="hidden xl:inline-flex">{tSearchTitle}</span>
        <span className="sr-only">Search products</span>
        <kbd className="pointer-events-none absolute right-1.5 top-2 hidden h-6 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 xl:flex">
          <abbr title="Control">⌘</abbr>K
        </kbd>
      </Button>
      <CommandDialog position="top" open={isOpen} onOpenChange={setIsOpen}>
        <CommandInput
          placeholder={tPlaceholder}
          value={query}
          onValueChange={setQuery}
        />
        <CommandList>
          <CommandEmpty
            className={cn(isPending ? "hidden" : "py-6 text-center text-sm")}
          >
            No product, page, or command found.
            <br className="my-2" />
            Try find something in another ways.
          </CommandEmpty>
          {isPending ?
            <div className="space-y-1 overflow-hidden px-1 py-2">
              <Skeleton className="h-4 w-10 rounded" />
              <Skeleton className="h-8 rounded-sm" />
              <Skeleton className="h-8 rounded-sm" />
            </div>
          : data?.map((group) => (
              <CommandGroup
                key={group.category}
                className="capitalize"
                heading={group.category}
              >
                {group.products.map((item) => (
                  <CommandItem
                    key={item.id}
                    onSelect={() =>
                      handleSelect(() => router.push(`/product/${item.id}`))
                    }
                  >
                    {item.name}
                  </CommandItem>
                ))}
              </CommandGroup>
            ))
          }
          <CommandSeparator />
          {/* {navItems.sidebarNav.map((group) => (
            <CommandGroup key={group.title} heading={group.id}>
              {group.items.map((item) => (
                <CommandItem
                  key={item.id}
                  value={item.id}
                  onSelect={runCommand(() =>
                    router.push(item.href as RouteHref),
                  )}
                >
                  <div className="mr-2 flex h-4 w-4 items-center justify-center">
                    <Circle className="h-3 w-3" />
                  </div>
                  {item.id}
                </CommandItem>
              ))}
            </CommandGroup>
          ))} */}
          {/* <CommandSeparator />
          <CommandGroup heading="Links">
            {navItems.mainNav
              .filter((item) => !item.external)
              .map((item) => (
                <CommandItem
                  key={item.href}
                  value={item.id}
                  onSelect={runCommand(() =>
                    router.push(item.href as RouteHref),
                  )}
                  className="capitalize"
                >
                  <File className="mr-2 h-4 w-4" />
                  {item.id}
                </CommandItem>
              ))}
          </CommandGroup> */}
          <CommandGroup heading={tCmdTheme}>
            <CommandItem onSelect={runCommand(() => setTheme("light"))}>
              <Sun className="mr-2 h-4 w-4" />
              <span>{tCmdLight}</span>
            </CommandItem>
            <CommandItem onSelect={runCommand(() => setTheme("dark"))}>
              <Moon className="mr-2 h-4 w-4" />
              <span>{tCmdDark}</span>
            </CommandItem>
            <CommandItem onSelect={runCommand(() => setTheme("system"))}>
              <Laptop className="mr-2 h-4 w-4" />
              <span>{tCmdSystem}</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
