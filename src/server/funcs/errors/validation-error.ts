import { ApiError } from "./api-error";

/**
 * HTTP 400 Bad Request (aka Validation Error)
 */
export class ValidationError extends ApiError {
  status = 400;

  constructor(message?: string, ...args: never[]) {
    super(message ?? "Bad Request", ...args);
  }
}

export function validationError(message?: string): never {
  throw new ValidationError(message);
}
