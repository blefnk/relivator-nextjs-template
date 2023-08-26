import { ApiError } from "./api-error";

/**
 * HTTP 401 Unauthorized
 */
export class UnauthorizedError extends ApiError {
  status = 401;

  constructor(message?: string, ...args: never[]) {
    super(message ?? "Unauthorized", ...args);
  }
}

export function unauthorized(message?: string): never {
  throw new UnauthorizedError(message);
}
