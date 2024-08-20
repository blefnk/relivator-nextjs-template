"use client";

import type {
  ComponentPropsWithoutRef,
  ComponentRef,
  HTMLAttributes,
} from "react";
import { createContext, forwardRef, useContext, useId } from "react";
import type { ControllerProps, FieldPath, FieldValues } from "react-hook-form";
import { Controller, FormProvider, useFormContext } from "react-hook-form";

import type * as LabelPrimitive from "@radix-ui/react-label";

import { Label } from "@/components/ui/label";
import { cn } from "@/utils/reliverse/cn";
import { Slot } from "@radix-ui/react-slot";

const Form = FormProvider;

type FormFieldContextValue<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
> = {
  name: TName;
};

const FormFieldContext = createContext<
  FormFieldContextValue<FieldValues, string>
>({} as FormFieldContextValue<FieldValues, string>);

const FormField = <
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => (
  // @ts-expect-error TODO: fix
  <FormFieldContext
    value={{
      name: props.name,
    }}
  >
    <Controller {...props} />
  </FormFieldContext>
);

const useFormField = () => {
  const fieldContext = useContext(FormFieldContext);

  const { formState, getFieldState } = useFormContext();

  const fieldState = getFieldState(fieldContext.name, formState);

  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>");
  }

  const { id } = useContext(FormItemContext);

  return {
    id,
    name: fieldContext.name,
    formDescriptionId: `${id}-form-item-description`,
    formItemId: `${id}-form-item`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  };
};

type FormItemContextValue = {
  id: string;
};

const FormItemContext = createContext<FormItemContextValue>({
  //
} as FormItemContextValue);

const FormItem = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const id = useId();

    return (
      // @ts-expect-error TODO: fix
      <FormItemContext
        value={{
          id,
        }}
      >
        <div className={cn("space-y-2", className)} ref={ref} {...props} />
      </FormItemContext>
    );
  },
);

FormItem.displayName = "FormItem";

const FormLabel = forwardRef<
  ComponentRef<typeof LabelPrimitive.Root>,
  ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className, ...props }, ref) => {
  const { error, formItemId } = useFormField();

  return (
    <Label
      className={cn(error && "text-destructive", className)}
      htmlFor={formItemId}
      ref={ref}
      {...props}
    />
  );
});

FormLabel.displayName = "FormLabel";

const FormControl = forwardRef<
  ComponentRef<typeof Slot>,
  ComponentPropsWithoutRef<typeof Slot>
>(({ ...props }, ref) => {
  const { error, formDescriptionId, formItemId, formMessageId } =
    useFormField();

  return (
    <Slot
      aria-describedby={
        !error
          ? String(formDescriptionId)
          : `${formDescriptionId} ${formMessageId}`
      }
      aria-invalid={!!error}
      id={formItemId}
      ref={ref}
      {...props}
    />
  );
});

FormControl.displayName = "FormControl";

const FormDescription = forwardRef<
  HTMLParagraphElement,
  HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  const { formDescriptionId } = useFormField();

  return (
    <p
      className={cn("text-[0.8rem] text-muted-foreground", className)}
      id={formDescriptionId}
      ref={ref}
      {...props}
    />
  );
});

FormDescription.displayName = "FormDescription";

const FormMessage = forwardRef<
  HTMLParagraphElement,
  HTMLAttributes<HTMLParagraphElement>
>(({ children, className, ...props }, ref) => {
  const { error, formMessageId } = useFormField();
  const body = error ? String(error?.message) : children;

  if (!body) {
    return null;
  }

  return (
    <p
      className={cn("text-[0.8rem] font-medium text-destructive", className)}
      id={formMessageId}
      ref={ref}
      {...props}
    >
      {body}
    </p>
  );
});

FormMessage.displayName = "FormMessage";

const UncontrolledFormMessage = forwardRef<
  HTMLParagraphElement,
  {
    message?: string;
  } & HTMLAttributes<HTMLParagraphElement>
>(({ children, className, message, ...props }, ref) => {
  const { formMessageId } = useFormField();
  const body = message ? String(message) : children;

  if (!body) {
    return null;
  }

  return (
    <p
      className={cn("text-sm font-medium text-destructive", className)}
      id={formMessageId}
      ref={ref}
      {...props}
    >
      {body}
    </p>
  );
});

UncontrolledFormMessage.displayName = "UncontrolledFormMessage";

export {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  UncontrolledFormMessage,
  useFormField,
};
