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

export type ElementType<T> = T extends (infer U)[] ? U : T;

declare module "@tanstack/react-table" {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ColumnMeta<TData extends RowData, TValue> {
    /* The display name of the column. */
    displayName: string;

    /* The column icon. */
    icon: LucideIcon;

    /* An optional "soft" max for the number range slider. */
    /* This is used for columns with type 'number'. */
    max?: number;

    /* An optional list of options for the column. */
    /* This is used for columns with type 'option' or 'multiOption'. */
    /* If the options are known ahead of time, they can be defined here. */
    /* Otherwise, they will be dynamically generated based on the data. */
    options?: ColumnOption[];

    /* An optional function to transform columns with type 'option' or 'multiOption'. */
    /* This is used to convert each raw option into a ColumnOption. */
    transformOptionFn?: (
      value: ElementType<NonNullable<TValue>>,
    ) => ColumnOption;

    /* The data type of the column. */
    type: ColumnDataType;
  }
}

/*
 * Represents the data type of a column.
 */
export type ColumnDataType =
  /* The column value is a string that should be searchable. */
  | "date"
  | "multiOption"
  | "number"
  /* The column value can be a single value from a list of options. */
  | "option"
  /* The column value can be zero or more values from a list of options. */
  | "text";

/*
 * Represents a possible value for a column property of type 'option' or 'multiOption'.
 */
export interface ColumnOption {
  /* An optional icon to display next to the label. */
  icon?: React.ElementType | React.ReactElement;
  /* The label to display for the option. */
  label: string;
  /* The internal value of the option. */
  value: string;
}

/* Operators for date data */
export type DateFilterOperator =
  | "is"
  | "is after"
  | "is before"
  | "is between"
  | "is not"
  | "is not between"
  | "is on or after"
  | "is on or before";

/*
 * FilterDetails is a type that represents the details of all the filter operators for a specific column data type.
 */
export type FilterDetails<T extends ColumnDataType> = {
  [key in FilterOperators[T]]: FilterOperatorDetails<key, T>;
};

/*
 *
 * FilterValue is a type that represents a filter value for a specific column.
 *
 * It consists of:
 * - Operator: The operator to be used for the filter.
 * - Values: An array of values to be used for the filter.
 *
 */
export interface FilterModel<T extends ColumnDataType, TData> {
  columnMeta: Column<TData>["columnDef"]["meta"];
  operator: FilterOperators[T];
  values: FilterTypes[T][];
}

/*
 *
 * FilterOperatorDetails is a type that provides details about a filter operator for a specific column data type.
 * It extends FilterOperatorDetailsBase with additional logic and contraints on the defined properties.
 *
 */
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

/* Maps filter values to their respective data types */
export interface FilterTypes {
  date: Date;
  multiOption: string[];
  number: number;
  option: string;
  text: string;
}

/* Operators for multi-option data */
export type MultiOptionFilterOperator =
  | "exclude"
  | "exclude if all"
  | "exclude if any of"
  | "include"
  | "include all of"
  | "include any of";

/* Operators for number data */
export type NumberFilterOperator =
  | "is"
  | "is between"
  | "is greater than"
  | "is greater than or equal to"
  | "is less than"
  | "is less than or equal to"
  | "is not"
  | "is not between";

/* Operators for option data */
export type OptionFilterOperator = "is" | "is any of" | "is none of" | "is not";

/* Operators for text data */
export type TextFilterOperator = "contains" | "does not contain";

interface FilterOperatorDetailsBase<OperatorValue, T extends ColumnDataType> {
  /* Whether the operator is negated. */
  isNegated: boolean;
  /* The label for the operator, to show in the UI. */
  label: string;
  /* If the operator is not negated, this provides the negated equivalent. */
  negation?: FilterOperators[T];
  /* If the operator is negated, this provides the positive equivalent. */
  negationOf?: FilterOperators[T];
  /* The singular form of the operator, if applicable. */
  pluralOf?: FilterOperators[T];
  /* All related operators. Normally, all the operators which share the same target. */
  relativeOf: FilterOperators[T] | FilterOperators[T][];
  /* The plural form of the operator, if applicable. */
  singularOf?: FilterOperators[T];
  /* How much data the operator applies to. */
  target: "multiple" | "single";
  /* The operator value. Usually the string representation of the operator. */
  value: OperatorValue;
}

/* Maps filter operators to their respective data types */
interface FilterOperators {
  date: DateFilterOperator;
  multiOption: MultiOptionFilterOperator;
  number: NumberFilterOperator;
  option: OptionFilterOperator;
  text: TextFilterOperator;
}

/* TODO: Allow both accessorFn and accessorKey */
export function defineMeta<
  TData,
  /* Only accessorFn - WORKS */
  TAccessor extends AccessorFn<TData>,
  TVal extends ReturnType<TAccessor>,
  /* Only accessorKey - WORKS */
  // TAccessor extends DeepKeys<TData>,
  // TVal extends DeepValue<TData, TAccessor>,

  /* Both accessorKey and accessorFn - BROKEN */
  /* ISSUE: Won't infer transformOptionFn input type correctly. */
  // TAccessor extends AccessorFn<TData> | DeepKeys<TData>,
  // TVal extends TAccessor extends AccessorFn<TData>
  // ? ReturnType<TAccessor>
  // : TAccessor extends DeepKeys<TData>
  // ? DeepValue<TData, TAccessor>
  // : never,
  TType extends ColumnDataType,
>(
  accessor: TAccessor,
  meta: Omit<ColumnMeta<TData, TVal>, "type"> & {
    type: TType;
  },
): ColumnMeta<TData, TVal> {
  return meta;
}

/* Details for all the filter operators for option data type */
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

/* Details for all the filter operators for multi-option data type */
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

/* Details for all the filter operators for date data type */
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

/* Details for all the filter operators for text data type */
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

/* Details for all the filter operators for number data type */
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

/* Maps column data types to their respective filter operator details */
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

/*
 * Applies the date filter logic to the input data.
 * Used internally by `dateFilterFn`.
 */
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
 ***** Filter Functions ******
 **********************************************************************************************************
 * These are functions that filter data based on the current filter values, column data type, and operator.
 * There exists a separate filter function for each column data type.
 *
 * Two variants of the filter functions are provided - as an example, we will take the optionFilterFn:
 * 1. optionFilterFn: takes in a row, columnId, and filterValue.
 * 2. applyOptionFilter: takes in an inputData and filterValue.
 *
 * applyOptionFilter is a private function that is used by filterFn to perform the actual filtering.
 * *********************************************************************************************************/

/*
 * Applies the multi-option filter logic to the input data.
 * Used internally by `multiOptionFilterFn`.
 */
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

/*
 * Applies the number filter logic to the input data.
 * Used internally by `numberFilterFn`.
 */
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

/*
 * Applies the option filter logic to the input data.
 * Used internally by `optionFilterFn`.
 */
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

/*
 * Applies the text filter logic to the input data.
 * Used internally by `textFilterFn`.
 */
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

export function dateFilterFn<TData>(
  row: Row<TData>,
  columnId: string,
  filterValue: FilterModel<"date", TData>,
) {
  const valueStr = row.getValue<Date>(columnId);

  return applyDateFilter(valueStr, filterValue);
}

/*
 * Returns a filter function for a given column data type.
 * This function is used to determine the appropriate filter function to use based on the column data type.
 */
export function filterFn(dataType: ColumnDataType) {
  switch (dataType) {
    case "date":
      return dateFilterFn;
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

/*
 *
 * Determines the new operator for a filter based on the current operator, old and new filter values.
 *
 * This handles cases where the filter values have transitioned from a single value to multiple values (or vice versa),
 * and the current operator needs to be transitioned to its plural form (or singular form).
 *
 * For example, if the current operator is 'is', and the new filter values have a length of 2, the
 * new operator would be 'is any of'.
 *
 */
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

  // Handle transition from single to multiple filter values.
  if (a < b && b >= 2) return opDetails.singularOf ?? currentOperator;
  // Handle transition from multiple to single filter values.
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
