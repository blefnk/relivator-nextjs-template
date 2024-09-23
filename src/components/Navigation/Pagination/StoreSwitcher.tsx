"use client";

import type { Store } from "~/db/schema";

import type { ComponentPropsWithoutRef } from "react";
import { useState } from "react";

import { useRouter } from "next/navigation";

import {
  CaretSortIcon,
  CheckIcon,
  PlusCircledIcon,
} from "@radix-ui/react-icons";
import { useTranslations } from "next-intl";

import { Button } from "~/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "~/components/ui/command";
import { Dialog, DialogTrigger } from "~/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { getRandomPatternStyle } from "~/server/helpers/pattern";
import { cn } from "~/utils/cn";

type StoreSwitcherProperties = {
  currentStore: Pick<Store, "id" | "name">;
  dashboardRedirectPath: string;
  stores: Pick<Store, "id" | "name">[];
} & ComponentPropsWithoutRef<typeof PopoverTrigger>;

export function StoreSwitcher({
  className,
  currentStore,
  dashboardRedirectPath,
  stores,
  ...properties
}: StoreSwitcherProperties) {
  const t = useTranslations();

  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            className={cn(
              `
                w-[140px] justify-between px-3

                sm:w-[180px]
              `,
              className,
            )}
            aria-expanded={isOpen}
            aria-label="Select a store"
            role="combobox"
            variant="outline"
            {...properties}
          >
            <div
              className="mr-2 aspect-square size-4 rounded-full"
              style={getRandomPatternStyle(String(currentStore.id))}
            />
            <span className="line-clamp-1">{currentStore.name}</span>
            <CaretSortIcon
              className="ml-auto size-4 shrink-0 opacity-50"
              aria-hidden="true"
            />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className={`
            w-[140px] p-0

            sm:w-[180px]
          `}
        >
          <Command>
            <CommandList>
              <CommandInput placeholder="Search store..." />
              <CommandEmpty>{t("StoreSwitcher.noStoresFound")}</CommandEmpty>
              <CommandGroup>
                {stores.map((store) => (
                  <CommandItem
                    key={store.id}
                    className="text-sm"
                    onSelect={() => {
                      router.push(`/dashboard/stores/${store.id}`);
                      setIsOpen(false);
                    }}
                  >
                    <div
                      className="mr-2 aspect-square size-4 rounded-full"
                      style={getRandomPatternStyle(String(store.id))}
                    />
                    <span className="line-clamp-1">{store.name}</span>
                    <CheckIcon
                      className={cn(
                        "ml-auto size-4",
                        currentStore.id === store.id
                          ? "opacity-100"
                          : "opacity-0",
                      )}
                      aria-hidden="true"
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
            <CommandSeparator />
            <CommandList>
              <CommandGroup>
                <DialogTrigger asChild>
                  <CommandItem
                    onSelect={() => {
                      router.push(dashboardRedirectPath);
                      setIsOpen(false);
                      setIsDialogOpen(true);
                    }}
                  >
                    <PlusCircledIcon
                      className="mr-2 size-4"
                      aria-hidden="true"
                    />
                    Create store
                  </CommandItem>
                </DialogTrigger>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </Dialog>
  );
}
