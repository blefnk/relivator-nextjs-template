/**
 * This file contains the subscription plans that are available for purchase.
 * TODO: Merge with ./subscriptions.ts
 * @see https://github.com/apestein/nextflix/blob/main/src/lib/configs.ts
 */

export const PLANS = [
  {
    id: "starter",
    name: "Starter",
    price: 0,
    description: "Kickstart Your Online Sales",
  },
  {
    id: "basic",
    name: "Basic",
    price: 10,
    description: "Expand Your Online Presence",
  },
  {
    id: "advanced",
    name: "Advanced",
    price: 20,
    description: "Scale Your Online Business",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: 0,
    description: "Crafted for High-Volume Sales",
  },
] as const;

/**
 * Define a generic function called tupleMap
 * T is a generic type that represents an array of objects. Each object should be a Record with string keys and unknown values.
 * Key is another generic type that represents a key that exists on the objects in the array T.
 */
const tupleMap = <
  T extends readonly Record<string, unknown>[], // Constrain T to be an array of objects with string keys and unknown values
  Key extends keyof T[number], // Constrain Key to be one of the keys that exist on the objects in the array T
>(
  input: T, // The array of objects we're going to map over
  key: Key, // The specific key we want to extract from each object in the array
): { [k in keyof T]: T[k][Key] } => {
  // The return type is an object that has the same keys as T, but each value is of type T[k][Key]
  // Use map to go through each object (row) in the input array and extract the value of the given key.
  // We use "as never" to bypass TypeScript's type checking, which is not recommended but used here for demonstration.
  return input.map((row) => row[key as never]) as never;
};
// Use the tupleMap function to create a new array that contains only the "name" property from each object in the PLANS array.
export const planTuple = tupleMap(PLANS, "name");
