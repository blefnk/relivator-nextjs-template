export type NextJsError = Error & {
  digest: `NEXT_${string}`;
};

/**
 * Determines if a given object is a Next.js error, such as
 * one thrown from next/navigation in notFound
 */
export function isNextJsError(e: unknown): e is NextJsError {
  return (
    e instanceof Error &&
    "digest" in e &&
    typeof e.digest === "string" &&
    e.digest.startsWith("NEXT_")
  );
}
