/**
 * Generic HTTP error, which falls back to 500
 */
export class ApiError extends Error {
  status = 500;

  constructor(message?: string, ...args: never[]) {
    super(message ?? "Internal Error", ...args);
  }
}

/**
 * Determines if a given object is a handled API error, such as
 * `unauthorized` or `validationError`
 */
export function isApiError(e: unknown): e is ApiError {
  return e instanceof ApiError;
}
