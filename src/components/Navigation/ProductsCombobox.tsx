"use client";

import { useCallback, useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import { filterProducts } from "@/actions/reliverse/product";
import { Button } from "@/components/ui/button";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Kbd } from "@/components/ui/kbd";
import { Skeleton } from "@/components/ui/skeleton";
import { useDebounce } from "@/hooks-react/use-debounce";
import { cn } from "@/utils/reliverse/cn";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Package } from "lucide-react";
import { useTranslations } from "next-intl";
import { isMacOS } from "std-env";

type ProductGroup = NonNullable<
  Awaited<ReturnType<typeof filterProducts>>["data"]
>[number];

export function ProductsCombobox() {
  const t = useTranslations();

  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 300);
  const [data, setData] = useState<null | ProductGroup[]>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (debouncedQuery.length <= 0) {
      setData(null);

      return;
    }

    async function fetchData() {
      setLoading(true);
      const { data, error } = await filterProducts({ query: debouncedQuery });

      if (error) {
        setLoading(false);

        return;
      }

      setData(data);
      setLoading(false);
    }

    void fetchData();
  }, [debouncedQuery]);

  useEffect(() => {
    const handleKeyDown = (event_: KeyboardEvent) => {
      if (event_.key === "k" && (event_.metaKey || event_.ctrlKey)) {
        event_.preventDefault();
        setOpen((open) => !open);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const onSelect = useCallback((callback: () => unknown) => {
    setOpen(false);
    callback();
  }, []);

  return (
    <>
      <Button
        variant="outline"
        className={`
          relative size-9 p-0

          xl:h-10 xl:w-60 xl:justify-start xl:px-3 xl:py-2
        `}
        onClick={() => {
          setOpen(true);
        }}
      >
        <MagnifyingGlassIcon
          className={`
            size-4

            xl:mr-2
          `}
          aria-hidden="true"
        />
        <span
          className={`
            hidden

            xl:inline-flex
          `}
        >
          Search products...
        </span>
        <span className="sr-only">{t("ProductsCombobox.searchProducts")}</span>
        <Kbd
          title={isMacOS ? "Command" : "Control"}
          className={`
            pointer-events-none absolute right-1.5 top-1.5 hidden

            xl:block
          `}
        >
          {isMacOS ? "⌘" : "Ctrl"} K
        </Kbd>
      </Button>
      <CommandDialog
        open={open}
        onOpenChange={(open) => {
          setOpen(open);

          if (!open) {
            setQuery("");
          }
        }}
      >
        <CommandInput
          placeholder="Search products..."
          value={query}
          onValueChange={setQuery}
        />
        <CommandList>
          <CommandEmpty
            className={cn(loading ? "hidden" : "py-6 text-center text-sm")}
          >
            No products found.
          </CommandEmpty>
          {loading ? (
            <div className="space-y-1 overflow-hidden px-1 py-2">
              <Skeleton className="h-4 w-10 rounded" />
              <Skeleton className="h-8 rounded-sm" />
              <Skeleton className="h-8 rounded-sm" />
            </div>
          ) : (
            data?.map((group) => (
              <CommandGroup
                key={group.name}
                className="capitalize"
                heading={group.name}
              >
                {group.products.map(
                  // @ts-expect-error TODO: fix
                  (item) => {
                    return (
                      <CommandItem
                        key={item.id}
                        className="h-9"
                        value={item.name}
                        onSelect={() => {
                          onSelect(() => {
                            router.push(`/product/${item.id}`);
                          });
                        }}
                      >
                        <Package
                          className="mr-2.5 size-3 text-muted-foreground"
                          aria-hidden="true"
                        />
                        <span className="truncate">{item.name}</span>
                      </CommandItem>
                    );
                  },
                )}
              </CommandGroup>
            ))
          )}
        </CommandList>
      </CommandDialog>
    </>
  );
}
