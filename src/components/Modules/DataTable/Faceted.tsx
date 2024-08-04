import type { Column } from "@tanstack/react-table";

import { Badge } from "@/browser/reliverse/ui/Badge";
import { Button } from "@/browser/reliverse/ui/Button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/browser/reliverse/ui/Command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/browser/reliverse/ui/Popover";
import { Separator } from "@/browser/reliverse/ui/Separator";
import { CheckIcon, PlusCircledIcon } from "@radix-ui/react-icons";

import type { Option } from "~/types";

import { cn } from "~/utils";

type DataTableFacetedFilter<TData, TValue> = {
  column?: Column<TData, TValue>;
  options: Option[];
  title?: string;
};

export function DataTableFacetedFilter<TData, TValue>({
  column,
  options,
  title,
}: DataTableFacetedFilter<TData, TValue>) {
  const selectedValues = new Set(
    column && (column.getFilterValue() as string[]),
  );

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          aria-label="Filter rows"
          className="h-8 border-dashed"
          size="sm"
          variant="outline"
        >
          <PlusCircledIcon aria-hidden="true" className="mr-2 size-4" />
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
                        className={`
                          rounded-sm px-1 font-normal
                        `}
                        key={option.value}
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
      <PopoverContent align="start" className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder={title} />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
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

                      column &&
                        column.setFilterValue(
                          filterValues.length > 0 ? filterValues : undefined,
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
                      <CheckIcon aria-hidden="true" className={cn("size-4")} />
                    </div>
                    {}
                    {option.icon && (
                      <option.icon
                        aria-hidden="true"
                        className={`
                          mr-2 size-4 text-muted-foreground
                        `}
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
                    // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
                    onSelect={() => column && column.setFilterValue(undefined)}
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
