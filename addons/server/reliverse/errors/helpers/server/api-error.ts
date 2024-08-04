export function createApiError(message = "Internal Error", status = 500) {
  return {
    name: "ApiError",
    message,
    status,
  } as const;
}

// Determines if a given object is a handled API error.
export function isApiError(
  event_: unknown,
): event_ is ReturnType<typeof createApiError> {
  return (
    typeof event_ === "object" &&
    event_ !== null &&
    "name" in event_ &&
    (event_ as any).name === "ApiError"
  );
}
