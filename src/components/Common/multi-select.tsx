import type { Dispatch, KeyboardEvent, SetStateAction } from "react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import type { Option } from "@/types/reliverse/store";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Command, CommandGroup, CommandItem } from "@/components/ui/command";
import { Command as CommandPrimitive } from "cmdk";
import { X } from "lucide-react";

type MultiSelectProps = {
  options: Option[];
  placeholder?: string;
  selected: null | Option[];
  setSelected: Dispatch<SetStateAction<null | Option[]>>;
  onChange?: (value: null | Option[]) => void;
};

export function MultiSelect({
  onChange,
  options,
  placeholder = "Select options",
  selected,
  setSelected,
}: MultiSelectProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");

  // Register as input field to be used in react-hook-form
  useEffect(() => {
    if (onChange) {
      onChange(selected && selected.length > 0 ? selected : null);
    }
  }, [onChange, selected]);

  const handleSelect = useCallback(
    (option: Option) => {
      setSelected((previous) => [...(previous || []), option]);
    },
    [setSelected],
  );

  const handleRemove = useCallback(
    (option: Option) => {
      setSelected(
        (previous) =>
          (previous && previous.filter((item) => item !== option)) || [],
      );
    },
    [setSelected],
  );

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      if (!inputRef.current) {
        return;
      }

      if (event.key === "Backspace" || event.key === "Delete") {
        setSelected((previous) => (previous && previous.slice(0, -1)) || []);
      }

      // Blur input on escape
      if (event.key === "Escape") {
        inputRef.current.blur();
      }
    },
    [setSelected],
  );

  // Memoize filtered options to avoid unnecessary re-renders
  const filteredOptions = useMemo(() => {
    return options.filter((option) => {
      if (selected && selected.some((item) => item.value === option.value)) {
        return false;
      }

      if (query.length === 0) {
        return true;
      }

      return option.label.toLowerCase().includes(query.toLowerCase());
    });
  }, [options, query, selected]);

  return (
    <Command
      className="overflow-visible bg-transparent"
      onKeyDown={handleKeyDown}
    >
      <div
        className={`
          group rounded-lg border border-input px-3 py-2 text-sm
          ring-offset-background

          focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2
        `}
      >
        <div className="flex flex-wrap gap-1">
          {selected &&
            selected.map((option) => (
              <Badge
                className={`
                  rounded

                  hover:bg-secondary
                `}
                key={option.value}
                variant="secondary"
              >
                {option.label}
                <Button
                  aria-label="Remove option"
                  className={`
                    ml-2 h-auto bg-transparent p-0 text-primary

                    hover:bg-transparent hover:text-destructive
                  `}
                  onClick={() => {
                    handleRemove(option);
                  }}
                  onKeyDown={(event_) => {
                    if (event_.key === "Enter") {
                      event_.preventDefault();
                      event_.stopPropagation();
                      handleRemove(option);
                    }
                  }}
                  onMouseDown={(event_) => {
                    event_.preventDefault();
                    event_.stopPropagation();
                  }}
                  size="sm"
                >
                  <X aria-hidden="true" className="size-3" />
                </Button>
              </Badge>
            ))}
          <CommandPrimitive.Input
            className={`
              flex-1 bg-transparent px-1 py-0.5 outline-none

              placeholder:text-muted-foreground
            `}
            onBlur={() => {
              setIsOpen(false);
            }}
            onFocus={() => {
              setIsOpen(true);
            }}
            onValueChange={setQuery}
            placeholder={placeholder}
            ref={inputRef}
            value={query}
          />
        </div>
      </div>
      <div className="relative z-50 mt-2">
        {isOpen && filteredOptions.length > 0 ? (
          <div
            className={`
              absolute top-0 w-full rounded-lg border bg-popover
              text-popover-foreground shadow-md outline-none animate-in
            `}
          >
            <CommandGroup className="h-full overflow-auto">
              {filteredOptions.map((option) => (
                <CommandItem
                  className="px-2 py-1.5 text-sm"
                  key={option.value}
                  onMouseDown={(event_) => {
                    event_.preventDefault();
                    event_.stopPropagation();
                  }}
                  onSelect={() => {
                    handleSelect(option);
                    setQuery("");
                  }}
                >
                  {option.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </div>
        ) : null}
      </div>
    </Command>
  );
}
