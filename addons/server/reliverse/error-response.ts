import { NextResponse } from "next/server";

import type { ApiResponseError } from "@/types/reliverse/api";

import { isApiError } from "@/server/reliverse/api-error";
import { isNextJsError } from "@/server/reliverse/nextjs-error";
import { ZodError } from "zod";

import { env } from "~/env";

const noop = () => {};

// A basic logger, which does not output anything in test mode.
const logger =
  env.NODE_ENV === "test"
    ? {
        error: noop,
        info: noop,
        log: noop,
        warn: noop,
      }
    : console;

export function buildErrorResponse(
  error: unknown,
): NextResponse<ApiResponseError> {
  //
  // Let Next.js handle its own errors
  //
  if (isNextJsError(error)) {
    throw error;
  }

  //
  // `ZodError` types occur when the request body is invalid, so we
  // treat these the same as a `ValidationError`
  //
  if (error instanceof ZodError) {
    return NextResponse.json(
      {
        error: "Validation Error",
        issues: error.issues,
        ok: false,
      },
      {
        status: 400,
      },
    );
  }

  //
  // If this is a known API error, such as from calling `unauthorized()` or
  // `validationError()`, handle it here.
  //
  if (isApiError(error)) {
    return NextResponse.json(
      {
        error: error.message,
        ok: false,
      },
      {
        status: error.status,
      },
    );
  }

  //
  // If we're unsure what error occurred, respond with a generic Internal
  // Server Error
  //
  logger.error("Unhandled API Error", error);

  return NextResponse.json(
    {
      error: "Internal server error",
      ok: false,
    },
    {
      status: 500,
    },
  );
}
