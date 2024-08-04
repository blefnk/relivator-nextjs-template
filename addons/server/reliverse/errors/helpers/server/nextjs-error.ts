const isString = (a: unknown): a is string => typeof a === "string";

type NextJsError = {
  digest: `NEXT_${string}`;
} & Error;

// Determines if a given object is a Next.js error, such as
// one thrown from next/navigation in notFound
export function isNextJsError(event_: unknown): event_ is NextJsError {
  return (
    event_ instanceof Error &&
    "digest" in event_ &&
    isString(event_.digest) &&
    event_.digest.startsWith("NEXT_")
  );
}
