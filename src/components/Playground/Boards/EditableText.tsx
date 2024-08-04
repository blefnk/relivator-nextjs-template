import type { ReactNode } from "react";
import { useOptimistic, useRef, useState } from "react";
import { flushSync } from "react-dom";

type EditableTextProps = {
  buttonClassName: string;
  buttonLabel: string;
  children: ReactNode;
  fieldName: string;
  inputClassName: string;
  inputLabel: string;
  value: string;
  onSubmit: () => void;
};

export function EditableText(props: EditableTextProps) {
  const [value, updateValue] = useOptimistic(
    props.value,
    (_, next: string) => next,
  );

  const [edit, setEdit] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const submit = (form: FormData | HTMLFormElement) => {
    const fd = form instanceof FormData ? form : new FormData(form);
    const value = fd.get(props.fieldName) as string;

    if (value && value !== props.value) {
      props.onSubmit();
      updateValue(value);
    }

    flushSync(() => {
      setEdit(false);
    });
    buttonRef.current && buttonRef.current.focus();
  };

  return edit ? (
    <form action={submit} className="w-full">
      {props.children}
      <input
        aria-label={props.inputLabel}
        className={props.inputClassName}
        defaultValue={value}
        name={props.fieldName}
        onBlur={(event) => {
          if (
            inputRef.current &&
            inputRef.current.value !== value &&
            inputRef.current.value.trim() !== ""
          ) {
            submit(event.currentTarget.form!);
          }

          setEdit(false);
        }}
        onKeyDown={(event) => {
          if (event.key === "Escape") {
            flushSync(() => {
              setEdit(false);
            });
            buttonRef.current && buttonRef.current.focus();
          }
        }}
        ref={inputRef}
        required
        type="text"
      />
    </form>
  ) : (
    <button
      aria-label={props.buttonLabel}
      className={props.buttonClassName}
      onClick={() => {
        flushSync(() => {
          setEdit(true);
        });
        inputRef.current && inputRef.current.select();
      }}
      ref={buttonRef}
      type="button"
    >
      {value || <span className="italic text-slate-400">Edit</span>}
    </button>
  );
}
