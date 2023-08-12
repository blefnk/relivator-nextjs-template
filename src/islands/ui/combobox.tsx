"use client";

import { forwardRef } from "react";

import { Check, ChevronsUpDown } from "lucide-react";
import { cnBase } from "tailwind-variants";

import { Button, ButtonProps } from "./button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "./command";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

export const Combobox = Popover;

export type ComboboxTriggerProps = ButtonProps & {
  value: string;
  items: readonly string[];
  placeholder: string;
};

export const ComboboxTrigger = forwardRef<
  HTMLButtonElement,
  ComboboxTriggerProps
>(function ComboboxTrigger({ placeholder, value, items, ...props }, ref) {
  return (
    <PopoverTrigger asChild>
      <Button ref={ref} variant="outline" {...props} role="combobox">
        {value
          ? items.find((item) => item.toUpperCase() === value.toUpperCase())
          : placeholder}
        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
      </Button>
    </PopoverTrigger>
  );
});

export type ComboboxContentProps = React.ComponentPropsWithoutRef<
  typeof PopoverContent
> & {
  placeholder: string;
  notFound: string;
};

export const ComboboxContent = forwardRef<HTMLDivElement, ComboboxContentProps>(
  function ComboboxContent(
    { className, children, placeholder, notFound, ...props },
    ref,
  ) {
    return (
      <Command>
        <PopoverContent
          className={cnBase("p-0", className)}
          {...props}
          ref={ref}
        >
          <CommandInput placeholder={placeholder} />
          <CommandEmpty>{notFound}</CommandEmpty>
          {children}
        </PopoverContent>
      </Command>
    );
  },
);

export type ComboboxListProps = Omit<
  React.ComponentPropsWithoutRef<typeof CommandGroup>,
  "onSelect"
> & {
  value: string;
  items: readonly string[];
  onSelect: (value: string) => void;
};

export const ComboboxList = forwardRef<HTMLDivElement, ComboboxListProps>(
  function ComboboxContent(
    { className, value, items, onSelect, ...props },
    ref,
  ) {
    return (
      <CommandGroup
        className={cnBase("overflow-y-auto", className)}
        {...props}
        ref={ref}
      >
        {items.map((item) => (
          <CommandItem key={item} onSelect={onSelect}>
            <Check
              className={cnBase(
                "mr-2 h-4 w-4",
                value.toUpperCase() === item.toUpperCase()
                  ? "animate-in fade-in"
                  : "opacity-0 animate-out fade-out",
              )}
            />
            {item}
          </CommandItem>
        ))}
      </CommandGroup>
    );
  },
);
