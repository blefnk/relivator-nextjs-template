import { isFunction } from "radash";

// @see https://github.com/raydium-io/raydium-frontend/blob/master/src/functions/shrinkToValue.ts
type AnyFunction = (...arguments_: unknown[]) => any;

// get value from input, if input is a function. it will ve invoked
// @param mayValue maybe a function that will return targetValue
// @param params the parameters that will be passed in mayValue(if it's function)
// @returns a pure value which can't be a function
export function shrinkToValue<T>(
  mayValue: T,
  parameters?: T extends AnyFunction ? Parameters<T> : unknown[],
): Exclude<T, AnyFunction> {
  return isFunction(mayValue)
    ? (mayValue as AnyFunction)(...(parameters || []))
    : mayValue;
}
