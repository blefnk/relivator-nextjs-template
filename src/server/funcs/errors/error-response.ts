import { NextResponse } from "next/server";
import { type ApiResponseError } from "~/types";
import { ZodError } from "zod";

import { logger } from "~/server/logger";

import { isApiError } from "./api-error";
import { isNextJsError } from "./nextjs-error";

export function buildErrorResponse(
  err: unknown,
): NextResponse<ApiResponseError> {
  /**
   * Let Next.js handle its own errors
   */
  if (isNextJsError(err)) {
    throw err;
  }

  /**
   * `ZodError` types occur when the request body is invalid, so we
   * treat these the same as a `ValidationError`
   */
  if (err instanceof ZodError) {
    return NextResponse.json(
      {
        ok: false,
        error: "Validation Error",
        issues: err.issues,
      },
      {
        status: 400,
      },
    );
  }

  /**
   * If this is a known API error, such as from calling `unauthorized()` or
   * `validationError()`, handle it here.
   */
  if (isApiError(err)) {
    return NextResponse.json(
      {
        ok: false,
        error: err.message,
      },
      {
        status: err.status,
      },
    );
  }

  /**
   * If we're unsure what error occurred, respond with a generic Internal
   * Server Error
   */
  logger.error("Unhandled API Error", err);
  return NextResponse.json(
    { ok: false, error: "Internal server error" },
    {
      status: 500,
    },
  );
}
