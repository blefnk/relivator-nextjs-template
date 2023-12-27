/* eslint-disable no-useless-escape */
import { ZodSchema, type ZodIssue } from "zod";
import * as z from "zod";

export type ErrorType = { [key: string]: string };

export const validate = <T>(
  schema: ZodSchema<T>,
  data: FormData,
): { data: z.infer<typeof schema> | null; errors: ErrorType | null } => {
  try {
    const validated = schema.parse(data);
    return { data: validated, errors: null };
  } catch (error: any) {
    const errors = error?.issues?.reduce(
      // biome-ignore lint/performance/noAccumulatingSpread: <explanation>
      (o: any, e: ZodIssue) => ({ ...o, [e.path.join(".")]: e.message }),
      {},
    );
    return { data: null, errors };
  }
};

export const updateData = (
  data: any,
  setData: (arg: any) => void,
  keys: (string | number)[],
  value: string | number | boolean,
) => {
  return setData(setValue(data, keys, value));
};

export const parsePath = (path: string) =>
  path.split(/[\.\[\]'\"]/).filter((p) => p);

export const resolveValue = (object: any, path: string) =>
  parsePath(path).reduce((o, p) => (o ? o[p] : null), object);

//
// Returns a copy of the provided object with the provided value set
// at path specified in keys
export const setValue = (
  data: any,
  keys: any[],
  value: string | number | boolean,
) => {
  const [key, ...restKeys] = keys;

  let children;
  if (restKeys.length > 0) {
    children =
      data[key] && typeof data[key] === "object" ? data[key]
      : Number.isInteger(key) ? []
      : {};

    children = setValue(children, restKeys, value);
  }

  const result = Array.isArray(data) ? [...data] : { ...data };
  result[key] = restKeys.length > 0 ? children : value;

  return result;
};
