export type OptionDataTableFilterField = {
  icon?: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  withCount?: boolean;
};

export type DataTableFilterField<TData> = {
  label: string;
  options?: OptionDataTableFilterField[];
  placeholder?: string;
  value: keyof TData;
};
