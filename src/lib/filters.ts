import "@tanstack/table-core";

import type { AccessorFn, Column, Row, RowData } from "@tanstack/react-table";
import type { ColumnMeta, Table } from "@tanstack/react-table";
import type { LucideIcon } from "lucide-react";

import {
  endOfDay,
  isAfter,
  isBefore,
  isSameDay,
  isWithinInterval,
  startOfDay,
} from "date-fns";

import { getUniqueValues, intersection } from "./array";

export type DeepKeys<T> = Paths<T>;

export type DeepValue<
  T,
  P extends DeepKeys<T>,
> = P extends `${infer K}.${infer Rest}`
  ? K extends keyof T
    ? Rest extends DeepKeys<T[K]>
      ? DeepValue<T[K], Rest>
      : never
    : never
  : P extends keyof T
    ? T[P]
    : never;

export type ElementType<T> = T extends (infer U)[] ? U : T;

type Join<K, P> = K extends number | string
  ? P extends number | string
    ? `${K}${"" extends P ? "" : "."}${P}`
    : never
  : never;

type Paths<T, D extends number = 10> = [D] extends [never]
  ? never
  : T extends object
    ? {
        [K in keyof T]-?: K extends number | string
          ? `${K}` | Join<K, Paths<T[K], Prev[D]>>
          : never;
      }[keyof T]
    : "";

type Prev = [
  never,
  0,
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  16,
  17,
  18,
  19,
  ...0[],
];

declare module "@tanstack/react-table" {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ColumnMeta<TData extends RowData, TValue> {
    displayName: string;
    icon: LucideIcon;

    // an optional "soft" max for the number range slider ('number' type columns).
    max?: number;

    // optional predefined options ('option'/'multiOption' types).
    // if not provided, options are dynamically generated from data.
    options?: ColumnOption[];

    transformOptionFn?: (
      value: ElementType<NonNullable<TValue>>,
    ) => ColumnOption;

    type: ColumnDataType;
  }
}

// column data types
export type ColumnDataType =
  | "date"
  | "multiOption"
  | "number"
  | "option"
  | "text";

// possible value for 'option' or 'multiOption' columns
export interface ColumnOption {
  icon?: React.ElementType | React.ReactElement;
  label: string;
  value: string;
}

// operators for date data
export type DateFilterOperator =
  | "is"
  | "is after"
  | "is before"
  | "is between"
  | "is not"
  | "is not between"
  | "is on or after"
  | "is on or before";

export type FilterDetails<T extends ColumnDataType> = {
  [key in FilterOperators[T]]: FilterOperatorDetails<key, T>;
};

// represents a filter value for a specific column.
export interface FilterModel<T extends ColumnDataType, TData> {
  columnMeta: Column<TData>["columnDef"]["meta"];
  operator: FilterOperators[T];
  values: FilterTypes[T][];
}

// provides details about a filter operator for a specific column data type.
export type FilterOperatorDetails<
  OperatorValue,
  T extends ColumnDataType,
> = FilterOperatorDetailsBase<OperatorValue, T> &
  (
    | { isNegated: false; negation: FilterOperators[T]; negationOf?: never }
    | { isNegated: true; negation?: never; negationOf: FilterOperators[T] }
  ) &
  (
    | { pluralOf: FilterOperators[T]; singularOf?: never; target: "multiple" }
    | { pluralOf?: never; singularOf: FilterOperators[T]; target: "single" }
    | { pluralOf?: never; singularOf?: never }
  );

// maps filter values to their respective data types
export interface FilterTypes {
  date: Date;
  multiOption: string[];
  number: number;
  option: string;
  text: string;
}

// operators for multi-option data
export type MultiOptionFilterOperator =
  | "exclude"
  | "exclude if all"
  | "exclude if any of"
  | "include"
  | "include all of"
  | "include any of";

// operators for number data
export type NumberFilterOperator =
  | "is"
  | "is between"
  | "is greater than"
  | "is greater than or equal to"
  | "is less than"
  | "is less than or equal to"
  | "is not"
  | "is not between";

// operators for option data
export type OptionFilterOperator = "is" | "is any of" | "is none of" | "is not";

// operators for text data
export type TextFilterOperator = "contains" | "does not contain";

interface FilterOperatorDetailsBase<OperatorValue, T extends ColumnDataType> {
  isNegated: boolean;
  label: string;
  negation?: FilterOperators[T];
  negationOf?: FilterOperators[T];
  pluralOf?: FilterOperators[T];
  relativeOf: FilterOperators[T] | FilterOperators[T][];
  singularOf?: FilterOperators[T];
  target: "multiple" | "single";
  value: OperatorValue;
}

// maps filter operators to their respective data types
interface FilterOperators {
  date: DateFilterOperator;
  multiOption: MultiOptionFilterOperator;
  number: NumberFilterOperator;
  option: OptionFilterOperator;
  text: TextFilterOperator;
}

// overload 1: accessorFn
export function defineMeta<
  TData extends RowData,
  TAccessor extends AccessorFn<TData>,
  TVal extends ReturnType<TAccessor>,
  TType extends ColumnDataType,
>(
  accessor: TAccessor,
  meta: Omit<ColumnMeta<TData, TVal>, "type"> & {
    type: TType;
  },
): ColumnMeta<TData, TVal>;

// overload 2: accessorKey (string path)
export function defineMeta<
  TData extends RowData,
  TAccessor extends DeepKeys<TData>,
  TVal extends DeepValue<TData, TAccessor>,
  TType extends ColumnDataType,
>(
  accessor: TAccessor,
  meta: Omit<ColumnMeta<TData, TVal>, "type"> & {
    type: TType;
  },
): ColumnMeta<TData, TVal>;

// implementation
export function defineMeta<TData extends RowData, TType extends ColumnDataType>(
  accessor: AccessorFn<TData, unknown> | DeepKeys<TData>,
  meta: Omit<ColumnMeta<TData, any>, "type"> & { type: TType },
): ColumnMeta<TData, any> {
  // the implementation signature needs to be compatible with the overloads.
  // the actual logic/type checking happens at the call site thanks to the overloads.
  // we just return the meta object here.
  return meta;
}

// details for all the filter operators for option data type
export const optionFilterDetails = {
  is: {
    isNegated: false,
    label: "is",
    negation: "is not",
    relativeOf: "is any of",
    singularOf: "is not",
    target: "single",
    value: "is",
  },
  "is any of": {
    isNegated: false,
    label: "is any of",
    negation: "is none of",
    pluralOf: "is",
    relativeOf: "is",
    target: "multiple",
    value: "is any of",
  },
  "is none of": {
    isNegated: true,
    label: "is none of",
    negationOf: "is any of",
    pluralOf: "is not",
    relativeOf: "is not",
    target: "multiple",
    value: "is none of",
  },
  "is not": {
    isNegated: true,
    label: "is not",
    negationOf: "is",
    relativeOf: "is none of",
    singularOf: "is",
    target: "single",
    value: "is not",
  },
} as const satisfies FilterDetails<"option">;

// details for all the filter operators for multi-option data type
export const multiOptionFilterDetails = {
  exclude: {
    isNegated: true,
    label: "exclude",
    negationOf: "include",
    relativeOf: "include",
    singularOf: "exclude if any of",
    target: "single",
    value: "exclude",
  },
  "exclude if all": {
    isNegated: true,
    label: "exclude if all",
    negationOf: "include any of",
    pluralOf: "exclude",
    relativeOf: ["include any of", "include all of", "exclude if any of"],
    target: "multiple",
    value: "exclude if all",
  },
  "exclude if any of": {
    isNegated: true,
    label: "exclude if any of",
    negationOf: "include all of",
    pluralOf: "exclude",
    relativeOf: ["include any of", "exclude if all", "include all of"],
    target: "multiple",
    value: "exclude if any of",
  },
  include: {
    isNegated: false,
    label: "include",
    negation: "exclude",
    relativeOf: "exclude",
    singularOf: "include any of",
    target: "single",
    value: "include",
  },
  "include all of": {
    isNegated: false,
    label: "include all of",
    negation: "exclude if any of",
    pluralOf: "include",
    relativeOf: ["include any of", "exclude if all", "exclude if any of"],
    target: "multiple",
    value: "include all of",
  },
  "include any of": {
    isNegated: false,
    label: "include any of",
    negation: "exclude if all",
    pluralOf: "include",
    relativeOf: ["exclude if all", "include all of", "exclude if any of"],
    target: "multiple",
    value: "include any of",
  },
} as const satisfies FilterDetails<"multiOption">;

// details for all the filter operators for date data type
export const dateFilterDetails = {
  is: {
    isNegated: false,
    label: "is",
    negation: "is before",
    relativeOf: "is after",
    singularOf: "is between",
    target: "single",
    value: "is",
  },
  "is after": {
    isNegated: false,
    label: "is after",
    negation: "is on or before",
    relativeOf: [
      "is",
      "is not",
      "is before",
      "is on or after",
      "is on or before",
    ],
    singularOf: "is between",
    target: "single",
    value: "is after",
  },
  "is before": {
    isNegated: false,
    label: "is before",
    negation: "is on or after",
    relativeOf: [
      "is",
      "is not",
      "is on or after",
      "is after",
      "is on or before",
    ],
    singularOf: "is between",
    target: "single",
    value: "is before",
  },
  "is between": {
    isNegated: false,
    label: "is between",
    negation: "is not between",
    pluralOf: "is",
    relativeOf: "is not between",
    target: "multiple",
    value: "is between",
  },
  "is not": {
    isNegated: true,
    label: "is not",
    negationOf: "is",
    relativeOf: [
      "is",
      "is before",
      "is on or after",
      "is after",
      "is on or before",
    ],
    singularOf: "is not between",
    target: "single",
    value: "is not",
  },
  "is not between": {
    isNegated: true,
    label: "is not between",
    negationOf: "is between",
    pluralOf: "is not",
    relativeOf: "is between",
    target: "multiple",
    value: "is not between",
  },
  "is on or after": {
    isNegated: false,
    label: "is on or after",
    negation: "is before",
    relativeOf: ["is", "is not", "is before", "is after", "is on or before"],
    singularOf: "is between",
    target: "single",
    value: "is on or after",
  },
  "is on or before": {
    isNegated: false,
    label: "is on or before",
    negation: "is after",
    relativeOf: ["is", "is not", "is after", "is on or after", "is before"],
    singularOf: "is between",
    target: "single",
    value: "is on or before",
  },
} as const satisfies FilterDetails<"date">;

// details for all the filter operators for text data type
export const textFilterDetails = {
  contains: {
    isNegated: false,
    label: "contains",
    negation: "does not contain",
    relativeOf: "does not contain",
    target: "single",
    value: "contains",
  },
  "does not contain": {
    isNegated: true,
    label: "does not contain",
    negationOf: "contains",
    relativeOf: "contains",
    target: "single",
    value: "does not contain",
  },
} as const satisfies FilterDetails<"text">;

// details for all the filter operators for number data type
export const numberFilterDetails = {
  is: {
    isNegated: false,
    label: "is",
    negation: "is not",
    relativeOf: [
      "is not",
      "is greater than",
      "is less than or equal to",
      "is less than",
      "is greater than or equal to",
    ],
    target: "single",
    value: "is",
  },
  "is between": {
    isNegated: false,
    label: "is between",
    negation: "is not between",
    relativeOf: "is not between",
    target: "multiple",
    value: "is between",
  },
  "is greater than": {
    isNegated: false,
    label: ">",
    negation: "is less than or equal to",
    relativeOf: [
      "is",
      "is not",
      "is less than or equal to",
      "is less than",
      "is greater than or equal to",
    ],
    target: "single",
    value: "is greater than",
  },
  "is greater than or equal to": {
    isNegated: false,
    label: ">=",
    negation: "is less than or equal to",
    relativeOf: [
      "is",
      "is not",
      "is greater than",
      "is less than or equal to",
      "is less than",
    ],
    target: "single",
    value: "is greater than or equal to",
  },
  "is less than": {
    isNegated: false,
    label: "<",
    negation: "is greater than",
    relativeOf: [
      "is",
      "is not",
      "is greater than",
      "is less than or equal to",
      "is greater than or equal to",
    ],
    target: "single",
    value: "is less than",
  },
  "is less than or equal to": {
    isNegated: false,
    label: "<=",
    negation: "is greater than or equal to",
    relativeOf: [
      "is",
      "is not",
      "is greater than",
      "is less than",
      "is greater than or equal to",
    ],
    target: "single",
    value: "is less than or equal to",
  },
  "is not": {
    isNegated: true,
    label: "is not",
    negationOf: "is",
    relativeOf: [
      "is",
      "is greater than",
      "is less than or equal to",
      "is less than",
      "is greater than or equal to",
    ],
    target: "single",
    value: "is not",
  },
  "is not between": {
    isNegated: true,
    label: "is not between",
    negationOf: "is between",
    relativeOf: "is between",
    target: "multiple",
    value: "is not between",
  },
} as const satisfies FilterDetails<"number">;

// maps column data types to their respective filter operator details
type FilterTypeOperatorDetails = {
  [key in ColumnDataType]: FilterDetails<key>;
};

export const filterTypeOperatorDetails: FilterTypeOperatorDetails = {
  date: dateFilterDetails,
  multiOption: multiOptionFilterDetails,
  number: numberFilterDetails,
  option: optionFilterDetails,
  text: textFilterDetails,
};

// applies the date filter logic.
export function applyDateFilter<TData>(
  inputData: Date,
  filterValue: FilterModel<"date", TData>,
) {
  if (!filterValue || filterValue.values.length === 0) return true;

  if (
    dateFilterDetails[filterValue.operator].target === "single" &&
    filterValue.values.length > 1
  )
    throw new Error("Singular operators require at most one filter value");

  if (
    filterValue.operator in ["is between", "is not between"] &&
    filterValue.values.length !== 2
  )
    throw new Error("Plural operators require two filter values");

  const filterVals = filterValue.values;
  const d1 = filterVals[0];
  const d2 = filterVals[1];

  const value = inputData;

  switch (filterValue.operator) {
    case "is":
      return isSameDay(value, d1);
    case "is after":
      return isAfter(value, startOfDay(d1));
    case "is before":
      return isBefore(value, startOfDay(d1));
    case "is between":
      return isWithinInterval(value, {
        end: endOfDay(d2),
        start: startOfDay(d1),
      });
    case "is not":
      return !isSameDay(value, d1);
    case "is not between":
      return !isWithinInterval(value, {
        end: endOfDay(filterValue.values[1]),
        start: startOfDay(filterValue.values[0]),
      });
    case "is on or after":
      return isSameDay(value, d1) || isAfter(value, startOfDay(d1));
    case "is on or before":
      return isSameDay(value, d1) || isBefore(value, startOfDay(d1));
  }
}

/**********************************************************************************************************
 * filter functions
 **********************************************************************************************************
 * these functions filter data based on the current filter values, column data type, and operator.
 * there exists a separate filter function for each column data type (e.g., dateFilterFn).
 *
 * each type has two variants:
 * 1. `[type]FilterFn`: takes row, columnid, filtervalue (used directly by the table).
 * 2. `apply[type]Filter`: takes inputdata, filtervalue (internal logic used by the `filterFn`).
 *********************************************************************************************************/

// applies the multi-option filter logic.
export function applyMultiOptionFilter<TData>(
  inputData: string[],
  filterValue: FilterModel<"multiOption", TData>,
) {
  if (!inputData) return false;

  if (
    filterValue.values.length === 0 ||
    !filterValue.values[0] ||
    filterValue.values[0].length === 0
  )
    return true;

  const values = getUniqueValues(inputData);
  const filterValues = getUniqueValues(filterValue.values[0]);

  switch (filterValue.operator) {
    case "exclude":
      return intersection(values, filterValues).length === 0;
    case "exclude if all":
      return !(
        intersection(values, filterValues).length === filterValues.length
      );
    case "exclude if any of":
      return !(intersection(values, filterValues).length > 0);
    case "include":
    case "include any of":
      return intersection(values, filterValues).length > 0;
    case "include all of":
      return intersection(values, filterValues).length === filterValues.length;
  }
}

// applies the number filter logic.
export function applyNumberFilter<TData>(
  inputData: number,
  filterValue: FilterModel<"number", TData>,
) {
  if (!filterValue || !filterValue.values || filterValue.values.length === 0) {
    return true;
  }

  const value = inputData;
  const filterVal = filterValue.values[0];

  switch (filterValue.operator) {
    case "is":
      return value === filterVal;
    case "is between": {
      const lowerBound = filterValue.values[0];
      const upperBound = filterValue.values[1];
      return value >= lowerBound && value <= upperBound;
    }
    case "is greater than":
      return value > filterVal;
    case "is greater than or equal to":
      return value >= filterVal;
    case "is less than":
      return value < filterVal;
    case "is less than or equal to":
      return value <= filterVal;
    case "is not":
      return value !== filterVal;
    case "is not between": {
      const lowerBound = filterValue.values[0];
      const upperBound = filterValue.values[1];
      return value < lowerBound || value > upperBound;
    }
    default:
      return true;
  }
}

// applies the option filter logic.
export function applyOptionFilter<TData>(
  inputData: string,
  filterValue: FilterModel<"option", TData>,
) {
  if (!inputData) return false;
  if (filterValue.values.length === 0) return true;

  const value = inputData.toString().toLowerCase();

  const found = !!filterValue.values.find((v) => v.toLowerCase() === value);

  switch (filterValue.operator) {
    case "is":
    case "is any of":
      return found;
    case "is none of":
    case "is not":
      return !found;
  }
}

// applies the text filter logic.
export function applyTextFilter<TData>(
  inputData: string,
  filterValue: FilterModel<"text", TData>,
) {
  if (!filterValue || filterValue.values.length === 0) return true;

  const value = inputData.toLowerCase().trim();
  const filterStr = filterValue.values[0].toLowerCase().trim();

  if (filterStr === "") return true;

  const found = value.includes(filterStr);

  switch (filterValue.operator) {
    case "contains":
      return found;
    case "does not contain":
      return !found;
  }
}

export function F<TData>(
  row: Row<TData>,
  columnId: string,
  filterValue: FilterModel<"date", TData>,
) {
  const valueStr = row.getValue<Date>(columnId);

  return applyDateFilter(valueStr, filterValue);
}

// returns the appropriate filter function for a given column data type.
export function filterFn(dataType: ColumnDataType) {
  switch (dataType) {
    case "date":
      return F;
    case "multiOption":
      return multiOptionFilterFn;
    case "number":
      return numberFilterFn;
    case "option":
      return optionFilterFn;
    case "text":
      return textFilterFn;
    default:
      throw new Error("Invalid column data type");
  }
}

export function findTableColumnById<TData>(table: Table<TData>, id: string) {
  const column = table.getColumn(id);
  if (!column) {
    throw new Error(`Column with id ${id} not found`);
  }
  return column;
}

// determines the new operator when filter values change between single/multiple items.
//
// this transitions the operator to its plural/singular form if needed.
// e.g., if the operator is 'is' and filter values go from 1 to 2 items,
// the new operator becomes 'is any of'.
export function getNextFilterOperator<T extends ColumnDataType>(
  type: T,
  oldVals: FilterTypes[T][],
  nextVals: FilterTypes[T][],
  currentOperator: FilterOperators[T],
): FilterOperators[T] {
  const a =
    Array.isArray(oldVals) && Array.isArray(oldVals[0])
      ? oldVals[0].length
      : oldVals.length;
  const b =
    Array.isArray(nextVals) && Array.isArray(nextVals[0])
      ? nextVals[0].length
      : nextVals.length;

  // If filter size has not transitioned from single to multiple (or vice versa)
  // or is unchanged, return the current operator.
  if (a === b || (a >= 2 && b >= 2) || (a <= 1 && b <= 1))
    return currentOperator;

  const opDetails = filterTypeOperatorDetails[type][currentOperator];

  // Handle transition from SINGLE to MULTIPLE filter values.
  if (a < b && b >= 2) return opDetails.singularOf ?? currentOperator;
  // Handle transition from MULTIPLE to SINGLE filter values.
  if (a > b && b <= 1) return opDetails.pluralOf ?? currentOperator;
  return currentOperator;
}

export function getTableColumnMeta<TData>(table: Table<TData>, id: string) {
  const column = findTableColumnById(table, id);
  if (!column.columnDef.meta) {
    throw new Error(`Column meta not found for column ${id}`);
  }
  return column.columnDef.meta;
}

export function isColumnFilterable<TData>(column: Column<TData>) {
  const hasFilterFn =
    column.columnDef.filterFn && column.columnDef.filterFn !== "auto";
  if (
    column.getCanFilter() &&
    column.accessorFn &&
    hasFilterFn &&
    column.columnDef.meta
  )
    return true;
  if (!column.accessorFn || !column.columnDef.meta) {
    return false;
  }
  if (!column.accessorFn) {
    warn(`Column "${column.id}" ignored - no accessor function`);
  }
  if (!column.getCanFilter()) {
    warn(`Column "${column.id}" ignored - not filterable`);
  }
  if (!hasFilterFn) {
    warn(
      `Column "${column.id}" ignored - no filter function. use the provided filterFn() helper function`,
    );
  }
  return false;
}

export function isColumnOption(value: unknown): value is ColumnOption {
  return (
    typeof value === "object" &&
    value !== null &&
    "value" in value &&
    "label" in value
  );
}

export function isColumnOptionArray(value: unknown): value is ColumnOption[] {
  return Array.isArray(value) && value.every(isColumnOption);
}

export function multiOptionFilterFn<TData>(
  row: Row<TData>,
  columnId: string,
  filterValue: FilterModel<"multiOption", TData>,
) {
  const value = row.getValue(columnId);

  if (!value) return false;

  const columnMeta = filterValue.columnMeta!;

  if (isStringArray(value)) {
    return applyMultiOptionFilter(value, filterValue);
  }

  if (isColumnOptionArray(value)) {
    return applyMultiOptionFilter(
      value.map((v) => v.value),
      filterValue,
    );
  }

  const sanitizedValue = (value as never[]).map((v) =>
    columnMeta.transformOptionFn!(v),
  );

  return applyMultiOptionFilter(
    sanitizedValue.map((v) => v.value),
    filterValue,
  );
}

// ensures a number range always has [min, max] order.
export function normalizeNumberRange(values: number[] | undefined) {
  let a = 0;
  let b = 0;

  if (!values || values.length === 0) return [a, b];
  if (values.length === 1) {
    a = values[0];
  } else {
    a = values[0];
    b = values[1];
  }

  const [min, max] = a < b ? [a, b] : [b, a];

  return [min, max];
}

export function numberFilterFn<TData>(
  row: Row<TData>,
  columnId: string,
  filterValue: FilterModel<"number", TData>,
) {
  const value = row.getValue<number>(columnId);

  return applyNumberFilter(value, filterValue);
}

/*** Table helpers ***/

export function optionFilterFn<TData>(
  row: Row<TData>,
  columnId: string,
  filterValue: FilterModel<"option", TData>,
) {
  const value = row.getValue(columnId);

  if (!value) return false;

  const columnMeta = filterValue.columnMeta!;

  if (typeof value === "string") {
    return applyOptionFilter(value, filterValue);
  }

  if (isColumnOption(value)) {
    return applyOptionFilter(value.value, filterValue);
  }

  const sanitizedValue = columnMeta.transformOptionFn!(value as never);
  return applyOptionFilter(sanitizedValue.value, filterValue);
}

export function textFilterFn<TData>(
  row: Row<TData>,
  columnId: string,
  filterValue: FilterModel<"text", TData>,
) {
  const value = row.getValue<string>(columnId) ?? "";

  return applyTextFilter(value, filterValue);
}

/*** Table Filter Helpers ***/

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((v) => typeof v === "string");
}

function warn(...messages: string[]) {
  if (process.env.NODE_ENV !== "production") {
    console.warn("[◐] [filters]", ...messages);
  }
}
