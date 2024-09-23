import type { Option } from "~/types/store";

import type { Dispatch, SetStateAction } from "react";
import { useMemo } from "react";

import { CheckIcon, PlusCircledIcon } from "@radix-ui/react-icons";
import { useTranslations } from "next-intl";

import { Badge } from "~/components/ui/badge";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { Separator } from "~/components/ui/separator";
import { cn } from "~/utils/cn";

type FacetedFilterProps = {
  filterValues: string[];
  options: Option[];
  setFilterValues: Dispatch<SetStateAction<string[]>>;
  title?: string;
};

export function FacetedFilter({
  filterValues,
  options,
  setFilterValues,
  title,
}: FacetedFilterProps) {
  const t = useTranslations();

  const selectedValues = useMemo(() => new Set(filterValues), [filterValues]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          className="h-8 border-dashed"
          aria-label="Filter data"
          size="sm"
          variant="outline"
        >
          <PlusCircledIcon className="mr-2 size-4" aria-hidden="true" />
          {title}
          {selectedValues && selectedValues.size > 0 && (
            <>
              <Separator className="mx-2 h-4" orientation="vertical" />
              <Badge
                className={`
                  rounded-sm px-1 font-normal

                  lg:hidden
                `}
                variant="secondary"
              >
                {selectedValues.size}
              </Badge>
              <div
                className={`
                  hidden space-x-1

                  lg:flex
                `}
              >
                {selectedValues.size > 2 ? (
                  <Badge
                    className="rounded-sm px-1 font-normal"
                    variant="secondary"
                  >
                    {selectedValues.size} selected
                  </Badge>
                ) : (
                  options
                    .filter((option) => selectedValues.has(option.value))
                    .map((option) => (
                      <Badge
                        key={option.value}
                        className="rounded-sm px-1 font-normal"
                        variant="secondary"
                      >
                        {option.label}
                      </Badge>
                    ))
                )}
              </div>
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" align="start">
        <Command>
          <CommandInput placeholder={title} />
          <CommandList>
            <CommandEmpty>{t("faceted-filter.noResultsFound")}</CommandEmpty>
            <CommandGroup>
              {options.map((option) => {
                const isSelected = selectedValues.has(option.value);

                return (
                  <CommandItem
                    key={option.value}
                    onSelect={() => {
                      if (isSelected) {
                        selectedValues.delete(option.value);
                      } else {
                        selectedValues.add(option.value);
                      }

                      const filterValues = [...selectedValues];

                      setFilterValues(
                        filterValues.length > 0 ? filterValues : [],
                      );
                    }}
                  >
                    <div
                      className={cn(
                        `
                          mr-2 flex size-4 items-center justify-center
                          rounded-sm border border-primary
                        `,
                        isSelected
                          ? "bg-primary text-primary-foreground"
                          : `
                            opacity-50

                            [&_svg]:invisible
                          `,
                      )}
                    >
                      <CheckIcon className={cn("size-4")} aria-hidden="true" />
                    </div>
                    {}
                    {option.icon && (
                      <option.icon
                        className="mr-2 size-4 text-muted-foreground"
                        aria-hidden="true"
                      />
                    )}
                    <span>{option.label}</span>
                  </CommandItem>
                );
              })}
            </CommandGroup>
            {selectedValues.size > 0 && (
              <>
                <CommandSeparator />
                <CommandGroup>
                  <CommandItem
                    className="justify-center text-center"
                    onSelect={() => {
                      setFilterValues([]);
                    }}
                  >
                    Clear filters
                  </CommandItem>
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
