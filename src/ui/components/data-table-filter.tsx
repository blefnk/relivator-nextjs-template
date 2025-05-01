"use client";

import type { Column, ColumnMeta, RowData, Table } from "@tanstack/react-table";
import type { DateRange } from "react-day-picker";

import { format, isEqual } from "date-fns";
import { FilterXIcon } from "lucide-react";
import { Ellipsis } from "lucide-react";
import { ArrowRight, Filter } from "lucide-react";
import { X } from "lucide-react";
import {
  isValidElement,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import type { ColumnOption, ElementType } from "~/lib/filters";

import { getFirstNItems, getUniqueValues } from "~/lib/array";
import { cn } from "~/lib/cn";
import {
  type ColumnDataType,
  dateFilterDetails,
  type FilterModel,
  filterTypeOperatorDetails,
  findTableColumnById,
  getNextFilterOperator,
  getTableColumnMeta,
  isColumnFilterable,
  isColumnOptionArray,
  multiOptionFilterDetails,
  normalizeNumberRange,
  numberFilterDetails,
  optionFilterDetails,
  textFilterDetails,
} from "~/lib/filters";
import { useIsMobile } from "~/lib/hooks/use-mobile";
import { Button } from "~/ui/primitives/button";
import { Calendar } from "~/ui/primitives/calendar";
import { Checkbox } from "~/ui/primitives/checkbox";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "~/ui/primitives/command";
import { Input } from "~/ui/primitives/input";
import {
  Popover,
  PopoverAnchor,
  PopoverContent,
  PopoverTrigger,
} from "~/ui/primitives/popover";
import { Separator } from "~/ui/primitives/separator";
import { Slider } from "~/ui/primitives/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/ui/primitives/tabs";

interface FilterOperatorControllerProps<TData> {
  closeControllerAction: () => void;
  column: Column<TData, unknown>;
}

interface FilterValueDisplayProps<TData, TValue> {
  column: Column<TData>;
  columnMeta: ColumnMeta<TData, TValue>;
  id: string;
  table: Table<TData>;
}

interface ProperFilterValueMenuProps<TData, TValue> {
  column: Column<TData>;
  columnMeta: ColumnMeta<TData, TValue>;
  id: string;
  table: Table<TData>;
}

export function ActiveFilters<TData>({ table }: { table: Table<TData> }) {
  const filters = table.getState().columnFilters;

  return (
    <>
      {filters.map((filter) => {
        const { id } = filter;

        const column = findTableColumnById(table, id);
        const meta = getTableColumnMeta(table, id);

        // Skip if no filter value
        if (!filter.value) return null;

        // Narrow the type based on meta.type and cast filter accordingly
        switch (meta.type) {
          case "date":
            return renderActiveFilter<TData, "date">(
              filter as { id: string; value: FilterModel<"date", TData> },
              column,
              meta as ColumnMeta<TData, unknown> & { type: "date" },
              table,
            );
          case "multiOption":
            return renderActiveFilter<TData, "multiOption">(
              filter as {
                id: string;
                value: FilterModel<"multiOption", TData>;
              },
              column,
              meta as ColumnMeta<TData, unknown> & {
                type: "multiOption";
              },
              table,
            );
          case "number":
            return renderActiveFilter<TData, "number">(
              filter as { id: string; value: FilterModel<"number", TData> },
              column,
              meta as ColumnMeta<TData, unknown> & { type: "number" },
              table,
            );
          case "option":
            return renderActiveFilter<TData, "option">(
              filter as { id: string; value: FilterModel<"option", TData> },
              column,
              meta as ColumnMeta<TData, unknown> & { type: "option" },
              table,
            );
          case "text":
            return renderActiveFilter<TData, "text">(
              filter as { id: string; value: FilterModel<"text", TData> },
              column,
              meta as ColumnMeta<TData, unknown> & { type: "text" },
              table,
            );
          default:
            return null; // Handle unknown types gracefully
        }
      })}
    </>
  );
}

export function ActiveFiltersMobileContainer({
  children,
}: { children: React.ReactNode }) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftBlur, setShowLeftBlur] = useState(false);
  const [showRightBlur, setShowRightBlur] = useState(true);

  // Wrap checkScroll in useCallback
  const checkScroll = useCallback(() => {
    if (scrollContainerRef.current) {
      const { clientWidth, scrollLeft, scrollWidth } =
        scrollContainerRef.current;
      setShowLeftBlur(scrollLeft > 0);
      setShowRightBlur(scrollLeft + clientWidth < scrollWidth - 1);
    }
  }, []);

  // Set up ResizeObserver to monitor container size
  useEffect(() => {
    if (scrollContainerRef.current) {
      const resizeObserver = new ResizeObserver(() => {
        checkScroll();
      });
      resizeObserver.observe(scrollContainerRef.current);
      return () => {
        resizeObserver.disconnect();
      };
    }
  }, [checkScroll]);

  // Update blur states when children change
  useEffect(() => {
    checkScroll();
  }, [checkScroll]);

  return (
    <div className="relative w-full overflow-x-hidden">
      {/* Left blur effect */}
      {showLeftBlur && (
        <div
          className={`
            pointer-events-none absolute top-0 bottom-0 left-0 z-10 w-16
            bg-gradient-to-r from-background to-transparent animate-in fade-in-0
          `}
        />
      )}

      {/* Scrollable container */}
      <div
        className="no-scrollbar flex gap-2 overflow-x-scroll"
        onScroll={checkScroll}
        ref={scrollContainerRef}
      >
        {children}
      </div>

      {/* Right blur effect */}
      {showRightBlur && (
        <div
          className={`
            pointer-events-none absolute top-0 right-0 bottom-0 z-10 w-16
            bg-gradient-to-l from-background to-transparent animate-in fade-in-0
          `}
        />
      )}
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function DataTableFilter<TData, TValue>({
  table,
}: { table: Table<TData> }) {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <div className="flex w-full items-start justify-between gap-2">
        <div className="flex gap-1">
          <FilterSelector table={table} />
          <FilterActions table={table} />
        </div>
        <ActiveFiltersMobileContainer>
          <ActiveFilters table={table} />
        </ActiveFiltersMobileContainer>
      </div>
    );
  }

  return (
    <div className="flex w-full items-start justify-between gap-2">
      <div
        className={`
          flex w-full flex-1 gap-2
          md:flex-wrap
        `}
      >
        <FilterSelector table={table} />
        <ActiveFilters table={table} />
      </div>
      <FilterActions table={table} />
    </div>
  );
}

export function DebouncedInput({
  debounce = 500,
  onChangeAction,
  value: initialValue,
  ...props
}: Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> & {
  debounce?: number;
  onChangeAction: (value: number | string) => void;
  value: number | string;
}) {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChangeAction(value);
    }, debounce);

    return () => clearTimeout(timeout);
  }, [value, onChangeAction, debounce]);

  return (
    <Input
      {...props}
      onChange={(e) => setValue(e.target.value)}
      value={value}
    />
  );
}

export function FilterableColumn<TData>({
  column,
  setPropertyAction,
}: {
  column: Column<TData>;
  setPropertyAction: (value: string) => void;
  table: Table<TData>;
}) {
  const Icon = column.columnDef.meta?.icon;
  return (
    <CommandItem
      className="group"
      onSelect={() => setPropertyAction(column.id)}
    >
      <div className="flex w-full items-center justify-between">
        <div className="inline-flex items-center gap-1.5">
          {Icon && <Icon className="size-4" strokeWidth={2.25} />}
          <span>{column.columnDef.meta?.displayName}</span>
        </div>
        <ArrowRight
          className={`
            size-4 opacity-0
            group-aria-selected:opacity-100
          `}
        />
      </div>
    </CommandItem>
  );
}

/****** Property Filter Subject ******/

export function FilterActions<TData>({ table }: { table: Table<TData> }) {
  const hasFilters = table.getState().columnFilters.length > 0;

  function clearFilters() {
    table.setColumnFilters([]);
    table.setGlobalFilter("");
  }

  return (
    <Button
      className={cn("h-7 !px-2", !hasFilters && "hidden")}
      onClick={clearFilters}
      variant="destructive"
    >
      <FilterXIcon />
      <span
        className={`
          hidden
          md:block
        `}
      >
        Clear
      </span>
    </Button>
  );
}

/****** Property Filter Operator ******/

// Renders the filter operator display and menu for a given column filter
// The filter operator display is the label and icon for the filter operator
// The filter operator menu is the dropdown menu for the filter operator
export function FilterOperator<TData, T extends ColumnDataType>({
  column,
  columnMeta,
  filter,
}: {
  column: Column<TData, unknown>;
  columnMeta: ColumnMeta<TData, unknown>;
  filter: FilterModel<T, TData>;
}) {
  const [open, setOpen] = useState<boolean>(false);

  const close = () => setOpen(false);

  return (
    <Popover onOpenChange={setOpen} open={open}>
      <PopoverTrigger asChild>
        <Button
          className={`
            m-0 h-full w-fit rounded-none p-0 px-2 text-xs whitespace-nowrap
          `}
          variant="ghost"
        >
          <FilterOperatorDisplay filter={filter} filterType={columnMeta.type} />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className="w-fit origin-(--radix-popover-content-transform-origin) p-0"
      >
        <Command loop>
          <CommandInput placeholder="Search..." />
          <CommandEmpty>No results.</CommandEmpty>
          <CommandList className="max-h-fit">
            <FilterOperatorController
              closeControllerAction={close}
              column={column}
            />
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export function FilterOperatorController<TData>({
  closeControllerAction,
  column,
}: FilterOperatorControllerProps<TData>) {
  const type = column.columnDef.meta?.type;

  switch (type) {
    case "date":
      return (
        <FilterOperatorDateController
          closeControllerAction={closeControllerAction}
          column={column}
        />
      );
    case "multiOption":
      return (
        <FilterOperatorMultiOptionController
          closeControllerAction={closeControllerAction}
          column={column}
        />
      );
    case "number":
      return (
        <FilterOperatorNumberController
          closeControllerAction={closeControllerAction}
          column={column}
        />
      );
    case "option":
      return (
        <FilterOperatorOptionController
          closeControllerAction={closeControllerAction}
          column={column}
        />
      );
    case "text":
      return (
        <FilterOperatorTextController
          closeControllerAction={closeControllerAction}
          column={column}
        />
      );
    default:
      return null;
  }
}

export function FilterOperatorDisplay<TData, T extends ColumnDataType>({
  filter,
  filterType,
}: {
  filter: FilterModel<T, TData>;
  filterType: T;
}) {
  const details = filterTypeOperatorDetails[filterType][filter.operator];

  return <span>{details.label}</span>;
}

export function FilterOperatorTextController<TData>({
  closeControllerAction,
  column,
}: FilterOperatorControllerProps<TData>) {
  const filter = column.getFilterValue() as FilterModel<"text", TData>;
  const filterDetails = textFilterDetails[filter.operator];

  const relatedFilters = Object.values(textFilterDetails).filter(
    (o) => o.target === filterDetails.target,
  );

  const changeOperator = (value: string) => {
    column.setFilterValue((old: typeof filter) => ({
      ...old,
      operator: value,
    }));
    closeControllerAction();
  };

  return (
    <CommandGroup heading="Operators">
      {relatedFilters.map((r) => {
        return (
          <CommandItem key={r.value} onSelect={changeOperator} value={r.value}>
            {r.label}
          </CommandItem>
        );
      })}
    </CommandGroup>
  );
}

export function FilterSelector<TData>({ table }: { table: Table<TData> }) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [property, setProperty] = useState<string | undefined>(undefined);
  const inputRef = useRef<HTMLInputElement>(null);

  const column = property ? findTableColumnById(table, property) : undefined;
  const columnMeta = property ? getTableColumnMeta(table, property) : undefined;

  const properties = table.getAllColumns().filter(isColumnFilterable);

  const hasFilters = table.getState().columnFilters.length > 0;

  useEffect(() => {
    if (property && inputRef) {
      inputRef.current?.focus();
      setValue("");
    }
  }, [property]);

  useEffect(() => {
    if (!open) {
      const timeout = setTimeout(() => setValue(""), 150);
      return () => clearTimeout(timeout);
    }
  }, [open]);

  const content = useMemo(
    () =>
      property && column && columnMeta ? (
        <FilterValueController
          column={column}
          columnMeta={columnMeta}
          id={property}
          table={table}
        />
      ) : (
        <Command loop>
          <CommandInput
            onValueChange={setValue}
            placeholder="Search..."
            ref={inputRef}
            value={value}
          />
          <CommandEmpty>No results.</CommandEmpty>
          <CommandList className="max-h-fit">
            <CommandGroup>
              {properties.map((column) => (
                <FilterableColumn
                  column={column}
                  key={column.id}
                  setPropertyAction={setProperty}
                  table={table}
                />
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      ),
    [property, column, columnMeta, value, table, properties],
  );

  return (
    <Popover
      onOpenChange={async (value) => {
        setOpen(value);
        if (!value) setTimeout(() => setProperty(undefined), 100);
      }}
      open={open}
    >
      <PopoverTrigger asChild>
        <Button
          className={cn("h-7", hasFilters && "w-fit !px-2")}
          variant="outline"
        >
          <Filter className="size-4" />
          {!hasFilters && <span>Filter</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className="w-fit origin-(--radix-popover-content-transform-origin) p-0"
        side="bottom"
      >
        {content}
      </PopoverContent>
    </Popover>
  );
}

export function FilterSubject<TData>({
  meta,
}: {
  meta: ColumnMeta<TData, string>;
}) {
  const hasIcon = !!meta?.icon;
  return (
    <span
      className={`
        flex items-center gap-1 px-2 font-medium whitespace-nowrap select-none
      `}
    >
      {hasIcon && <meta.icon className="size-4 stroke-[2.25px]" />}
      <span>{meta.displayName}</span>
    </span>
  );
}

export function FilterValue<TData, TValue>({
  column,
  columnMeta,
  id,
  table,
}: {
  column: Column<TData>;
  columnMeta: ColumnMeta<TData, TValue>;
  id: string;
  table: Table<TData>;
}) {
  return (
    <Popover>
      <PopoverAnchor className="h-full" />
      <PopoverTrigger asChild>
        <Button
          className={`
            m-0 h-full w-fit rounded-none p-0 px-2 text-xs whitespace-nowrap
          `}
          variant="ghost"
        >
          <FilterValueDisplay
            column={column}
            columnMeta={columnMeta}
            id={id}
            table={table}
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className="w-fit origin-(--radix-popover-content-transform-origin) p-0"
        side="bottom"
      >
        <FilterValueController
          column={column}
          columnMeta={columnMeta}
          id={id}
          table={table}
        />
      </PopoverContent>
    </Popover>
  );
}

export function FilterValueController<TData, TValue>({
  column,
  columnMeta,
  id,
  table,
}: {
  column: Column<TData>;
  columnMeta: ColumnMeta<TData, TValue>;
  id: string;
  table: Table<TData>;
}) {
  switch (columnMeta.type) {
    case "date":
      return (
        <FilterValueDateController
          column={column}
          columnMeta={columnMeta}
          id={id}
          table={table}
        />
      );
    case "multiOption":
      return (
        <FilterValueMultiOptionController
          column={column}
          columnMeta={columnMeta}
          id={id}
          table={table}
        />
      );
    case "number":
      return (
        <FilterValueNumberController
          column={column}
          columnMeta={columnMeta}
          id={id}
          table={table}
        />
      );
    case "option":
      return (
        <FilterValueOptionController
          column={column}
          columnMeta={columnMeta}
          id={id}
          table={table}
        />
      );
    case "text":
      return (
        <FilterValueTextController
          column={column}
          columnMeta={columnMeta}
          id={id}
          table={table}
        />
      );
    default:
      return null;
  }
}

export function FilterValueDateController<TData, TValue>({
  column,
}: ProperFilterValueMenuProps<TData, TValue>) {
  const filter = column.getFilterValue()
    ? (column.getFilterValue() as FilterModel<"date", TData>)
    : undefined;

  const [date, setDate] = useState<DateRange | undefined>(() => ({
    from: filter?.values[0] ?? new Date(),
    to: filter?.values[1] ?? undefined,
  }));

  function changeDateRange(value: DateRange | undefined) {
    const start = value?.from;
    const end =
      start && value && value.to && !isEqual(start, value.to)
        ? value.to
        : undefined;

    setDate({ from: start, to: end });

    const isRange = start && end;

    const newValues = isRange ? [start, end] : start ? [start] : [];

    column.setFilterValue((old: FilterModel<"date", TData> | undefined) => {
      if (!old || old.values.length === 0)
        return {
          columnMeta: column.columnDef.meta,
          operator: newValues.length > 1 ? "is between" : "is",
          values: newValues,
        } satisfies FilterModel<"date", TData>;

      return {
        columnMeta: column.columnDef.meta,
        operator:
          old.values.length < newValues.length
            ? "is between"
            : old.values.length > newValues.length
              ? "is"
              : old.operator,
        values: newValues,
      } satisfies FilterModel<"date", TData>;
    });
  }

  return (
    <Command>
      {/* <CommandInput placeholder="Search..." /> */}
      {/* <CommandEmpty>No results.</CommandEmpty> */}
      <CommandList className="max-h-fit">
        <CommandGroup>
          <div>
            <Calendar
              defaultMonth={date?.from}
              initialFocus
              mode="range"
              numberOfMonths={1}
              onSelect={changeDateRange}
              selected={date}
            />
          </div>
        </CommandGroup>
      </CommandList>
    </Command>
  );
}

/****** Property Filter Value ******/

export function FilterValueDateDisplay<TData, TValue>({
  column,
}: FilterValueDisplayProps<TData, TValue>) {
  const filter = column.getFilterValue()
    ? (column.getFilterValue() as FilterModel<"date", TData>)
    : undefined;

  if (!filter) return null;
  if (filter.values.length === 0) return <Ellipsis className="size-4" />;
  if (filter.values.length === 1) {
    const value = filter.values[0];

    const formattedDateStr = format(value, "MMM d, yyyy");

    return <span>{formattedDateStr}</span>;
  }

  const formattedRangeStr = formatDateRange(filter.values[0], filter.values[1]);

  return <span>{formattedRangeStr}</span>;
}

export function FilterValueDisplay<TData, TValue>({
  column,
  columnMeta,
  id,
  table,
}: FilterValueDisplayProps<TData, TValue>) {
  switch (columnMeta.type) {
    case "date":
      return (
        <FilterValueDateDisplay
          column={column}
          columnMeta={columnMeta}
          id={id}
          table={table}
        />
      );
    case "multiOption":
      return (
        <FilterValueMultiOptionDisplay
          column={column}
          columnMeta={columnMeta}
          id={id}
          table={table}
        />
      );
    case "number":
      return (
        <FilterValueNumberDisplay
          column={column}
          columnMeta={columnMeta}
          id={id}
          table={table}
        />
      );
    case "option":
      return (
        <FilterValueOptionDisplay
          column={column}
          columnMeta={columnMeta}
          id={id}
          table={table}
        />
      );
    case "text":
      return (
        <FilterValueTextDisplay
          column={column}
          columnMeta={columnMeta}
          id={id}
          table={table}
        />
      );
    default:
      return null;
  }
}

export function FilterValueMultiOptionController<
  TData extends RowData,
  TValue,
>({
  column,
  columnMeta,
  id,
  table,
}: ProperFilterValueMenuProps<TData, TValue>) {
  const filter = column.getFilterValue() as
    | FilterModel<"multiOption", TData>
    | undefined;

  let options: ColumnOption[];
  const columnVals = table
    .getCoreRowModel()
    .rows.flatMap((r) => r.getValue<TValue>(id))
    .filter((v): v is NonNullable<TValue> => v !== undefined && v !== null);
  const uniqueVals = getUniqueValues(columnVals);

  // Only assign uniqueVals if isColumnOptionArray(uniqueVals) is true
  if (columnMeta.options) {
    options = columnMeta.options;
  } else if (columnMeta.transformOptionFn) {
    const transformOptionFn = columnMeta.transformOptionFn;
    options = uniqueVals.map((v) =>
      transformOptionFn(v as ElementType<NonNullable<TValue>>),
    );
  } else if (isColumnOptionArray(uniqueVals)) {
    options = uniqueVals;
  } else {
    options = [];
  }

  const optionsCount: Record<ColumnOption["value"], number> = columnVals.reduce(
    (acc, curr) => {
      let optionValue: string | undefined = undefined;
      const rawColumnValue = curr as unknown; // Using unknown for safer type checks

      if (columnMeta.options) {
        optionValue = rawColumnValue as string;
      } else if (columnMeta.transformOptionFn) {
        // transformOptionFn handles the type conversion
        optionValue = columnMeta.transformOptionFn(
          rawColumnValue as ElementType<NonNullable<TValue>>,
        )?.value;
      } else if (
        typeof rawColumnValue === "object" &&
        rawColumnValue !== null &&
        "value" in rawColumnValue
      ) {
        // Check if it's an object with a 'value' property
        optionValue = String((rawColumnValue as { value: unknown }).value);
      } else if (typeof rawColumnValue === "string") {
        // Handle if curr is just a string value
        optionValue = rawColumnValue;
      }

      if (typeof optionValue === "string") {
        acc[optionValue] = (acc[optionValue] ?? 0) + 1;
      }
      return acc;
    },
    {} as Record<ColumnOption["value"], number>,
  );

  // Handles the selection/deselection of an option
  function handleOptionSelect(value: string, check: boolean) {
    if (check) {
      column.setFilterValue(
        (old: FilterModel<"multiOption", TData> | undefined) => {
          if (
            !old ||
            old.values.length === 0 ||
            !old.values[0] ||
            old.values[0].length === 0
          )
            return {
              columnMeta: column.columnDef.meta,
              operator: "include",
              values: [[value]],
            } satisfies FilterModel<"multiOption", TData>;

          const newValues = [getUniqueValues([...old.values[0], value])];

          return {
            columnMeta: column.columnDef.meta,
            operator: getNextFilterOperator(
              "multiOption",
              old.values,
              newValues,
              old.operator,
            ),
            values: newValues,
          } satisfies FilterModel<"multiOption", TData>;
        },
      );
    } else
      column.setFilterValue(
        (old: FilterModel<"multiOption", TData> | undefined) => {
          if (!old?.values[0] || old.values[0].length <= 1) return undefined;

          const newValues = [
            getUniqueValues([...old.values[0], value]).filter(
              (v: string) => v !== value,
            ),
          ];

          return {
            columnMeta: column.columnDef.meta,
            operator: getNextFilterOperator(
              "multiOption",
              old.values,
              newValues,
              old.operator,
            ),
            values: newValues,
          } satisfies FilterModel<"multiOption", TData>;
        },
      );
  }

  return (
    <Command loop>
      <CommandInput autoFocus placeholder="Search..." />
      <CommandEmpty>No results.</CommandEmpty>
      <CommandList>
        <CommandGroup>
          {options.map((v) => {
            const checked = Boolean(filter?.values[0]?.includes(v.value));
            const count = optionsCount[v.value] ?? 0;

            return (
              <CommandItem
                className="group flex items-center justify-between gap-1.5"
                key={v.value}
                onSelect={() => {
                  handleOptionSelect(v.value, !checked);
                }}
              >
                <div className="flex items-center gap-1.5">
                  <Checkbox
                    checked={checked}
                    className={`
                      opacity-0
                      group-hover:opacity-100
                      data-[state=checked]:opacity-100
                    `}
                  />
                  {v.icon &&
                    (isValidElement(v.icon) ? (
                      v.icon
                    ) : (
                      <v.icon className="size-4 text-primary" />
                    ))}
                  <span>
                    {v.label}
                    <sup
                      className={cn(
                        `
                          ml-0.5 tracking-tight text-muted-foreground
                          tabular-nums
                        `,
                        count === 0 && "slashed-zero",
                      )}
                    >
                      {count < 100 ? count : "100+"}
                    </sup>
                  </span>
                </div>
              </CommandItem>
            );
          })}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}

export function FilterValueMultiOptionDisplay<TData, TValue>({
  column,
  columnMeta,
  id,
  table,
}: FilterValueDisplayProps<TData, TValue>) {
  let options: ColumnOption[];
  const columnVals = table
    .getCoreRowModel()
    .rows.flatMap((r) => r.getValue<TValue>(id))
    .filter((v): v is NonNullable<TValue> => v !== undefined && v !== null);
  const uniqueVals = getUniqueValues(columnVals);

  // Only assign uniqueVals if isColumnOptionArray(uniqueVals) is true
  if (columnMeta.options) {
    options = columnMeta.options;
  } else if (columnMeta.transformOptionFn) {
    const transformOptionFn = columnMeta.transformOptionFn;
    options = uniqueVals.map((v) =>
      transformOptionFn(v as ElementType<NonNullable<TValue>>),
    );
  } else if (isColumnOptionArray(uniqueVals)) {
    options = uniqueVals;
  } else {
    options = [];
  }

  const filter = column.getFilterValue() as FilterModel<"multiOption", TData>;
  const selected = options.filter((o) => filter?.values[0].includes(o.value));

  if (selected.length === 1) {
    const { icon: Icon, label } = selected[0];
    const hasIcon = !!Icon;
    return (
      <span className="inline-flex items-center gap-1.5">
        {hasIcon &&
          (isValidElement(Icon) ? (
            Icon
          ) : (
            <Icon className="size-4 text-primary" key={label} />
          ))}

        <span>{label}</span>
      </span>
    );
  }

  const name = columnMeta.displayName.toLowerCase();

  const hasOptionIcons = !columnMeta.options?.some((o) => !o.icon);

  return (
    <div className="inline-flex items-center gap-1.5">
      {hasOptionIcons && (
        <div className="inline-flex items-center gap-0.5" key="icons">
          {getFirstNItems(selected, 3).map(({ icon: Icon, value }) => {
            // Render conditionally based on Icon existence
            return Icon ? (
              isValidElement(Icon) ? (
                Icon
              ) : (
                <Icon className="size-4" key={value} />
              )
            ) : null; // Return null if icon is undefined
          })}
        </div>
      )}
      <span>
        {selected.length} {name}
      </span>
    </div>
  );
}

export function FilterValueNumberController<TData, TValue>({
  column,
  columnMeta,
}: ProperFilterValueMenuProps<TData, TValue>) {
  const maxFromMeta = columnMeta.max;
  const cappedMax = maxFromMeta ?? Number.MAX_SAFE_INTEGER;

  const filter = column.getFilterValue()
    ? (column.getFilterValue() as FilterModel<"number", TData>)
    : undefined;

  const isNumberRange =
    !!filter && numberFilterDetails[filter.operator].target === "multiple";

  const [datasetMin] = column.getFacetedMinMaxValues() ?? [0, 0];

  const initialValues = () => {
    if (filter?.values) {
      return filter.values.map((val) =>
        val >= cappedMax ? `${cappedMax}+` : val.toString(),
      );
    }
    return [datasetMin.toString()];
  };

  const [inputValues, setInputValues] = useState<string[]>(initialValues);

  const changeNumber = (value: number[]) => {
    const sortedValues = [...value].sort((a, b) => a - b);

    column.setFilterValue((old: FilterModel<"number", TData> | undefined) => {
      if (!old || old.values.length === 0) {
        return {
          operator: "is",
          values: sortedValues,
        };
      }

      const operator = numberFilterDetails[old.operator];
      let newValues: number[];

      if (operator.target === "single") {
        newValues = [sortedValues[0]];
      } else {
        newValues = [
          sortedValues[0] >= cappedMax ? cappedMax : sortedValues[0],
          sortedValues[1] >= cappedMax
            ? Number.POSITIVE_INFINITY
            : sortedValues[1],
        ];
      }

      return {
        operator: old.operator,
        values: newValues,
      };
    });
  };

  const handleInputChange = (index: number, value: string) => {
    const newValues = [...inputValues];
    if (isNumberRange && Number.parseInt(value, 10) >= cappedMax) {
      newValues[index] = `${cappedMax}+`;
    } else {
      newValues[index] = value;
    }

    setInputValues(newValues);

    const parsedValues = newValues.map((val) => {
      if (val.trim() === "") return 0;
      if (val === `${cappedMax}+`) return cappedMax;
      return Number.parseInt(val, 10);
    });

    changeNumber(parsedValues);
  };

  const changeType = (type: "range" | "single") => {
    column.setFilterValue((old: FilterModel<"number", TData> | undefined) => {
      if (type === "single") {
        return {
          operator: "is",
          values: [old?.values[0] ?? 0],
        };
      }
      const newMaxValue = old?.values[0] ?? cappedMax;
      return {
        operator: "is between",
        values: [0, newMaxValue],
      };
    });

    if (type === "single") {
      setInputValues([inputValues[0]]);
    } else {
      const maxValue = inputValues[0] || cappedMax.toString();
      setInputValues(["0", maxValue]);
    }
  };

  const slider = {
    onValueChange: (value: number[]) => {
      const values = value.map((val) => (val >= cappedMax ? cappedMax : val));
      setInputValues(
        values.map((v) => (v >= cappedMax ? `${cappedMax}+` : v.toString())),
      );
      changeNumber(values);
    },
    value: inputValues.map((val) =>
      val === "" || val === `${cappedMax}+`
        ? cappedMax
        : Number.parseInt(val, 10),
    ),
  };

  return (
    <Command>
      <CommandList className="w-[300px] px-2 py-2">
        <CommandGroup>
          <div className="flex w-full flex-col">
            <Tabs
              onValueChange={(v) =>
                changeType(v === "range" ? "range" : "single")
              }
              value={isNumberRange ? "range" : "single"}
            >
              <TabsList
                className={`
                  w-full
                  *:text-xs
                `}
              >
                <TabsTrigger value="single">Single</TabsTrigger>
                <TabsTrigger value="range">Range</TabsTrigger>
              </TabsList>
              <TabsContent className="mt-4 flex flex-col gap-4" value="single">
                <Slider
                  aria-orientation="horizontal"
                  max={cappedMax}
                  min={datasetMin}
                  onValueChange={(value) => {
                    handleInputChange(0, value[0].toString());
                  }}
                  step={1}
                  value={[Number(inputValues[0])]}
                />
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium">Value</span>
                  <Input
                    id="single"
                    max={cappedMax}
                    onChange={(e) => handleInputChange(0, e.target.value)}
                    type="number"
                    value={inputValues[0]}
                  />
                </div>
              </TabsContent>
              <TabsContent className="mt-4 flex flex-col gap-4" value="range">
                <Slider
                  aria-orientation="horizontal"
                  max={cappedMax}
                  min={datasetMin}
                  onValueChange={slider.onValueChange}
                  step={1}
                  value={slider.value}
                />
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium">Min</span>
                    <Input
                      max={cappedMax}
                      onChange={(e) => handleInputChange(0, e.target.value)}
                      type="number"
                      value={inputValues[0]}
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium">Max</span>
                    <Input
                      max={cappedMax}
                      onChange={(e) => handleInputChange(1, e.target.value)}
                      placeholder={`${cappedMax}+`}
                      type="text"
                      value={inputValues[1]}
                    />
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </CommandGroup>
      </CommandList>
    </Command>
  );
}

export function FilterValueNumberDisplay<TData, TValue>({
  column,
  columnMeta,
}: FilterValueDisplayProps<TData, TValue>) {
  const maxFromMeta = columnMeta.max;
  const cappedMax = maxFromMeta ?? 2147483647;

  const filter = column.getFilterValue()
    ? (column.getFilterValue() as FilterModel<"number", TData>)
    : undefined;

  if (!filter) return null;

  if (
    filter.operator === "is between" ||
    filter.operator === "is not between"
  ) {
    const minValue = filter.values[0];
    const maxValue =
      filter.values[1] === Number.POSITIVE_INFINITY ||
      filter.values[1] >= cappedMax
        ? `${cappedMax}+`
        : filter.values[1];

    return (
      <span className="tracking-tight tabular-nums">
        {minValue} and {maxValue}
      </span>
    );
  }

  if (!filter.values || filter.values.length === 0) {
    return null;
  }

  const value = filter.values[0];
  return <span className="tracking-tight tabular-nums">{value}</span>;
}

export function FilterValueOptionController<TData, TValue>({
  column,
  columnMeta,
  id,
  table,
}: ProperFilterValueMenuProps<TData, TValue>) {
  const filter = column.getFilterValue()
    ? (column.getFilterValue() as FilterModel<"option", TData>)
    : undefined;

  let options: ColumnOption[];
  const columnVals = table
    .getCoreRowModel()
    .rows.flatMap((r) => r.getValue<TValue>(id))
    .filter((v): v is NonNullable<TValue> => v !== undefined && v !== null);
  const uniqueVals = getUniqueValues(columnVals);

  // Only assign uniqueVals if isColumnOptionArray(uniqueVals) is true
  if (columnMeta.options) {
    options = columnMeta.options;
  } else if (columnMeta.transformOptionFn) {
    const transformOptionFn = columnMeta.transformOptionFn;
    options = uniqueVals.map((v) =>
      transformOptionFn(v as ElementType<NonNullable<TValue>>),
    );
  } else if (isColumnOptionArray(uniqueVals)) {
    options = uniqueVals;
  } else {
    options = [];
  }

  const optionsCount: Record<ColumnOption["value"], number> = columnVals.reduce(
    (acc, curr) => {
      let optionValue: string | undefined = undefined;
      const rawColumnValue = curr as unknown; // Using unknown for safer type checks

      if (columnMeta.options) {
        optionValue = rawColumnValue as string;
      } else if (columnMeta.transformOptionFn) {
        // transformOptionFn handles the type conversion
        optionValue = columnMeta.transformOptionFn(
          rawColumnValue as ElementType<NonNullable<TValue>>,
        )?.value;
      } else if (
        typeof rawColumnValue === "object" &&
        rawColumnValue !== null &&
        "value" in rawColumnValue
      ) {
        // Check if it's an object with a 'value' property
        optionValue = String((rawColumnValue as { value: unknown }).value);
      } else if (typeof rawColumnValue === "string") {
        // Handle if curr is just a string value
        optionValue = rawColumnValue;
      }

      if (typeof optionValue === "string") {
        acc[optionValue] = (acc[optionValue] ?? 0) + 1;
      }
      return acc;
    },
    {} as Record<ColumnOption["value"], number>,
  );

  function handleOptionSelect(value: string, check: boolean) {
    if (check)
      column?.setFilterValue(
        (old: FilterModel<"option", TData> | undefined) => {
          if (!old || old.values.length === 0)
            return {
              columnMeta: column.columnDef.meta,
              operator: "is",
              values: [value],
            } satisfies FilterModel<"option", TData>;

          const newValues = [...old.values, value];

          return {
            columnMeta: column.columnDef.meta,
            operator: "is any of",
            values: newValues,
          } satisfies FilterModel<"option", TData>;
        },
      );
    else
      column?.setFilterValue(
        (old: FilterModel<"option", TData> | undefined) => {
          if (!old || old.values.length <= 1) return undefined;

          const newValues = old.values.filter((v) => v !== value);
          return {
            columnMeta: column.columnDef.meta,
            operator: newValues.length > 1 ? "is any of" : "is",
            values: newValues,
          } satisfies FilterModel<"option", TData>;
        },
      );
  }

  return (
    <Command loop>
      <CommandInput autoFocus placeholder="Search..." />
      <CommandEmpty>No results.</CommandEmpty>
      <CommandList className="max-h-fit">
        <CommandGroup>
          {options.map((v) => {
            const checked = Boolean(filter?.values.includes(v.value));
            const count = optionsCount[v.value] ?? 0;

            return (
              <CommandItem
                className="group flex items-center justify-between gap-1.5"
                key={v.value}
                onSelect={() => {
                  handleOptionSelect(v.value, !checked);
                }}
              >
                <div className="flex items-center gap-1.5">
                  <Checkbox
                    checked={checked}
                    className={`
                      opacity-0
                      group-hover:opacity-100
                      data-[state=checked]:opacity-100
                    `}
                  />
                  {v.icon &&
                    (isValidElement(v.icon) ? (
                      v.icon
                    ) : (
                      <v.icon className="size-4 text-primary" />
                    ))}
                  <span>
                    {v.label}
                    <sup
                      className={cn(
                        `
                          ml-0.5 tracking-tight text-muted-foreground
                          tabular-nums
                        `,
                        count === 0 && "slashed-zero",
                      )}
                    >
                      {count < 100 ? count : "100+"}
                    </sup>
                  </span>
                </div>
              </CommandItem>
            );
          })}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}

export function FilterValueOptionDisplay<TData, TValue>({
  column,
  columnMeta,
  id,
  table,
}: FilterValueDisplayProps<TData, TValue>) {
  let options: ColumnOption[];
  const columnVals = table
    .getCoreRowModel()
    .rows.flatMap((r) => r.getValue<TValue>(id))
    .filter((v): v is NonNullable<TValue> => v !== undefined && v !== null);
  const uniqueVals = getUniqueValues(columnVals);

  // Only assign uniqueVals if isColumnOptionArray(uniqueVals) is true
  if (columnMeta.options) {
    options = columnMeta.options;
  } else if (columnMeta.transformOptionFn) {
    const transformOptionFn = columnMeta.transformOptionFn;
    options = uniqueVals.map((v) =>
      transformOptionFn(v as ElementType<NonNullable<TValue>>),
    );
  } else if (isColumnOptionArray(uniqueVals)) {
    options = uniqueVals;
  } else {
    options = [];
  }

  const filter = column.getFilterValue() as FilterModel<"option", TData>;
  const selected = options.filter((o) => filter?.values.includes(o.value));

  // We display the selected options based on how many are selected
  //
  // If there is only one option selected, we display its icon and label
  //
  // If there are multiple options selected, we display:
  // 1) up to 3 icons of the selected options
  // 2) the number of selected options
  if (selected.length === 1) {
    const { icon: Icon, label } = selected[0];
    const hasIcon = !!Icon;
    return (
      <span className="inline-flex items-center gap-1">
        {hasIcon &&
          (isValidElement(Icon) ? (
            Icon
          ) : (
            <Icon className="size-4 text-primary" key={label} />
          ))}
        <span>{label}</span>
      </span>
    );
  }
  const name = columnMeta.displayName.toLowerCase();
  const pluralName = name.endsWith("s") ? `${name}es` : `${name}s`;

  const hasOptionIcons = !options?.some((o) => !o.icon);

  return (
    <div className="inline-flex items-center gap-0.5">
      {hasOptionIcons &&
        getFirstNItems(selected, 3).map(({ icon: Icon, value }) => {
          // Render conditionally based on Icon existence
          return Icon ? (
            isValidElement(Icon) ? (
              Icon
            ) : (
              <Icon className="size-4" key={value} />
            )
          ) : null; // Return null if icon is undefined
        })}
      <span className={cn(hasOptionIcons && "ml-1.5")}>
        {selected.length} {pluralName}
      </span>
    </div>
  );
}

export function FilterValueTextController<TData, TValue>({
  column,
}: ProperFilterValueMenuProps<TData, TValue>) {
  const filter = column.getFilterValue()
    ? (column.getFilterValue() as FilterModel<"text", TData>)
    : undefined;

  const changeText = (value: number | string) => {
    column.setFilterValue((old: FilterModel<"text", TData> | undefined) => {
      if (!old || old.values.length === 0)
        return {
          columnMeta: column.columnDef.meta,
          operator: "contains",
          values: [String(value)],
        } satisfies FilterModel<"text", TData>;
      return { operator: old.operator, values: [String(value)] };
    });
  };

  return (
    <Command>
      <CommandList className="max-h-fit">
        <CommandGroup>
          <CommandItem>
            <DebouncedInput
              autoFocus
              onChangeAction={changeText}
              placeholder="Search..."
              value={filter?.values[0] ?? ""}
            />
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  );
}

export function FilterValueTextDisplay<TData, TValue>({
  column,
}: FilterValueDisplayProps<TData, TValue>) {
  const filter = column.getFilterValue()
    ? (column.getFilterValue() as FilterModel<"text", TData>)
    : undefined;

  if (!filter) return null;
  if (filter.values.length === 0 || filter.values[0].trim() === "")
    return <Ellipsis className="size-4" />;

  const value = filter.values[0];

  return <span>{value}</span>;
}

function FilterOperatorDateController<TData>({
  closeControllerAction,
  column,
}: FilterOperatorControllerProps<TData>) {
  const filter = column.getFilterValue() as FilterModel<"date", TData>;
  const filterDetails = dateFilterDetails[filter.operator];

  const relatedFilters = Object.values(dateFilterDetails).filter(
    (o) => o.target === filterDetails.target,
  );

  const changeOperator = (value: string) => {
    column.setFilterValue((old: typeof filter) => ({
      ...old,
      operator: value,
    }));
    closeControllerAction();
  };

  return (
    <CommandGroup>
      {relatedFilters.map((r) => {
        return (
          <CommandItem key={r.value} onSelect={changeOperator} value={r.value}>
            {r.label}
          </CommandItem>
        );
      })}
    </CommandGroup>
  );
}

function FilterOperatorMultiOptionController<TData>({
  closeControllerAction,
  column,
}: FilterOperatorControllerProps<TData>) {
  const filter = column.getFilterValue() as FilterModel<"multiOption", TData>;
  const filterDetails = multiOptionFilterDetails[filter.operator];

  const relatedFilters = Object.values(multiOptionFilterDetails).filter(
    (o) => o.target === filterDetails.target,
  );

  const changeOperator = (value: string) => {
    column.setFilterValue((old: typeof filter) => ({
      ...old,
      operator: value,
    }));
    closeControllerAction();
  };

  return (
    <CommandGroup heading="Operators">
      {relatedFilters.map((r) => {
        return (
          <CommandItem key={r.value} onSelect={changeOperator} value={r.value}>
            {r.label}
          </CommandItem>
        );
      })}
    </CommandGroup>
  );
}

function FilterOperatorNumberController<TData>({
  closeControllerAction,
  column,
}: FilterOperatorControllerProps<TData>) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const filterTypeCheck = column.getFilterValue() as FilterModel<
    "number",
    TData
  >;

  // Show all related operators
  const relatedFilters = Object.values(numberFilterDetails);

  const changeOperator = (value: (typeof relatedFilters)[number]["value"]) => {
    column.setFilterValue((old: typeof filterTypeCheck | undefined) => {
      // Handle potentially undefined 'old'
      if (!old) {
        // If no previous filter, create a new one based on the operator type
        const target = numberFilterDetails[value].target;
        const initialValue = 0;
        const newValues =
          target === "single" ? [initialValue] : [initialValue, initialValue];
        return { operator: value, values: newValues };
      }

      // Clear out the second value when switching to single-input operators
      const target = numberFilterDetails[value].target;

      // Handle potentially undefined old.values
      const currentValues = old.values ?? [];
      const firstValue = currentValues[0] ?? 0;

      const newValues =
        target === "single"
          ? [firstValue]
          : normalizeNumberRange([firstValue, currentValues[1] ?? firstValue]);

      return { ...old, operator: value, values: newValues };
    });
    closeControllerAction();
  };

  return (
    <div>
      <CommandGroup heading="Operators">
        {relatedFilters.map((r) => (
          <CommandItem
            key={r.value}
            onSelect={() => changeOperator(r.value)}
            value={r.value}
          >
            {r.label}
          </CommandItem>
        ))}
      </CommandGroup>
    </div>
  );
}

function FilterOperatorOptionController<TData>({
  closeControllerAction,
  column,
}: FilterOperatorControllerProps<TData>) {
  const filter = column.getFilterValue() as FilterModel<"option", TData>;
  const filterDetails = optionFilterDetails[filter.operator];

  const relatedFilters = Object.values(optionFilterDetails).filter(
    (o) => o.target === filterDetails.target,
  );

  const changeOperator = (value: string) => {
    column.setFilterValue((old: typeof filter) => ({
      ...old,
      operator: value,
    }));
    closeControllerAction();
  };

  return (
    <CommandGroup heading="Operators">
      {relatedFilters.map((r) => {
        return (
          <CommandItem key={r.value} onSelect={changeOperator} value={r.value}>
            {r.label}
          </CommandItem>
        );
      })}
    </CommandGroup>
  );
}

function formatDateRange(start: Date, end: Date) {
  const sameMonth = start.getMonth() === end.getMonth();
  const sameYear = start.getFullYear() === end.getFullYear();

  if (sameMonth && sameYear) {
    return `${format(start, "MMM d")} - ${format(end, "d, yyyy")}`;
  }

  if (sameYear) {
    return `${format(start, "MMM d")} - ${format(end, "MMM d, yyyy")}`;
  }

  return `${format(start, "MMM d, yyyy")} - ${format(end, "MMM d, yyyy")}`;
}

// Generic render function for a filter with type-safe value
function renderActiveFilter<TData, T extends ColumnDataType>(
  filter: { id: string; value: FilterModel<T, TData> },
  column: Column<TData, unknown>,
  meta: ColumnMeta<TData, unknown> & { type: T },
  table: Table<TData>,
) {
  const { value } = filter;

  return (
    <div
      className={`
        flex h-7 items-center rounded-2xl border border-border bg-background
        text-xs shadow-xs
      `}
      key={`filter-${filter.id}`}
    >
      <FilterSubject meta={meta} />
      <Separator orientation="vertical" />
      <FilterOperator
        column={column}
        columnMeta={meta}
        filter={value} // Typed as FilterValue<T>
      />
      <Separator orientation="vertical" />
      <FilterValue
        column={column}
        columnMeta={meta}
        id={filter.id}
        table={table}
      />
      <Separator orientation="vertical" />
      <Button
        className="h-full w-7 rounded-none rounded-r-2xl text-xs"
        onClick={() => table.getColumn(filter.id)?.setFilterValue(undefined)}
        variant="ghost"
      >
        <X className="size-4 -translate-x-0.5" />
      </Button>
    </div>
  );
}
