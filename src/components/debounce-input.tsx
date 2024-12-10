"use client";

import * as React from "react";

import { Input } from "~/components/ui/input";

type InputProps = React.ComponentProps<typeof Input>;

type DebounceInputProps = {
  debounce?: number;
} & InputProps;

export function DebounceInput({
  onChange,
  debounce = 500,
  ...props
}: DebounceInputProps) {
  const [value, setValue] = React.useState(props.value ?? "");
  const [debouncedValue, setDebouncedValue] = React.useState(value);

  React.useEffect(() => {
    setValue(props.value ?? "");
  }, [props.value]);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(value);
    }, debounce);

    return () => {
      clearTimeout(timeout);
    };
  }, [value, debounce]);

  React.useEffect(() => {
    if (debouncedValue !== props.value) {
      // @ts-expect-error debouncedValue is not React.ChangeEvent<HTMLInputElement>
      onChange?.(debouncedValue);
    }
  }, [debouncedValue, onChange, props.value]);

  return (
    <Input
      {...props}
      value={value}
      onChange={(e) => {
        setValue(e.target.value);
      }}
    />
  );
}
