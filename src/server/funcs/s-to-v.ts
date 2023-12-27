/** @see https://github.com/raydium-io/raydium-frontend/blob/master/src/functions/shrinkToValue.ts */

type AnyFn = (...args: any[]) => any;
/**
 * get value from input, if input is a function. it will ve invoked
 *
 * @param mayValue maybe a function that will return targetValue
 * @param params the parameters that will be passed in mayValue(if it's function)
 * @returns a pure value which can't be a function
 */
export function shrinkToValue<T>(
  mayValue: T,
  params?: T extends AnyFn ? Parameters<T> : any[],
): Exclude<T, AnyFn> {
  return typeof mayValue === "function" ?
      mayValue(...(params ?? []))
    : mayValue;
}
