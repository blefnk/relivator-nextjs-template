import type { infer as ZodInfer, ZodIssue, ZodSchema } from "zod";

import { ZodError } from "zod";

export type ErrorType = Record<string, string>;

export const validate = <T>(
  schema: ZodSchema<T>,
  data: FormData,
): {
  data: null | ZodInfer<typeof schema>;
  errors: ErrorType | null;
} => {
  try {
    const validated = schema.parse(Object.fromEntries(data.entries()));

    return {
      data: validated,
      errors: null,
    };
  } catch (error) {
    if (!(error instanceof ZodError)) {
      throw error;
    }

    const errors = error.issues.reduce(
      (o: ErrorType, issue: ZodIssue) => ({
        ...o,
        [issue.path.join(".")]: issue.message,
      }),
      {} as ErrorType,
    );

    return {
      data: null,
      errors,
    };
  }
};

export const updateData = (
  data: any,
  setData: (argument: any) => void,
  keys: (number | string)[],
  value: boolean | number | string,
) => {
  setData(setValue(data, keys, value));
};

export const parsePath = (path: string) =>
  path.split(/["'.[\]]/).filter((p) => p);

export const resolveValue = (object: any, path: string) =>
  parsePath(path).reduce((o, p) => (o ? o[p] : null), object);

// Returns a copy of the provided object with the provided value set at the path specified in keys
export const setValue = (
  data: any,
  keys: (number | string)[],
  value: boolean | number | string,
): any => {
  if (keys.length === 0) {
    return data;
  }

  const [key, ...restKeys] = keys;

  if (restKeys.length === 0) {
    return Array.isArray(data)
      ? Object.assign([], data, { [key as any]: value })
      : { ...data, [key as any]: value };
  }

  const nextData =
    data[key as any] !== undefined
      ? data[key as any]
      : Number.isInteger(key)
        ? []
        : {};

  return Array.isArray(data)
    ? Object.assign([], data, {
        [key as any]: setValue(nextData, restKeys, value),
      })
    : { ...data, [key as any]: setValue(nextData, restKeys, value) };
};
