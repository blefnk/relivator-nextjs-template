"use client";

import type { InputHTMLAttributes } from "react";
import { useEffect, useState } from "react";

import { Input } from "@/components/ui/input";

type InputProps = InputHTMLAttributes<HTMLInputElement>;

type DebounceInputProps = {
  debounce?: number;
} & InputProps;

export function DebounceInput({
  debounce = 500,
  onChange,
  ...props
}: DebounceInputProps) {
  const [value, setValue] = useState(props.value || "");
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    setValue(props.value || "");
  }, [props.value]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(value);
    }, debounce);

    return () => {
      clearTimeout(timeout);
    };
  }, [value, debounce]);

  useEffect(() => {
    if (debouncedValue !== props.value) {
      // @ts-expect-error debouncedValue is not ChangeEvent<HTMLInputElement>
      onChange && onChange(debouncedValue);
    }
  }, [debouncedValue, onChange, props.value]);

  return (
    <Input
      {...props}
      onChange={(event_) => {
        setValue(event_.target.value);
      }}
      value={value}
    />
  );
}
