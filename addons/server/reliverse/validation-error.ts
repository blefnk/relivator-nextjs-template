import { createApiError } from "@/server/reliverse/api-error";

// Factory function for creating an HTTP 400 Bad Request (Validation Error).
export function createValidationError(message = "Bad Request") {
  return createApiError(message, 400);
}

export function validationError(message?: string): never {
  throw createValidationError(message);
}
