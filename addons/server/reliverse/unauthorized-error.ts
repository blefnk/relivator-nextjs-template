import { createApiError } from "@/server/reliverse/api-error";

// Factory function for creating an HTTP 401 Unauthorized error.
export function createUnauthorizedError(message = "Unauthorized") {
  return createApiError(message, 401);
}

export function unauthorized(message?: string): never {
  throw createUnauthorizedError(message);
}
