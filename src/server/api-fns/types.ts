import type { NextRequest, NextResponse } from "next/server";
import { type ZodIssue } from "zod";

/**
 * The API Error response
 */
export type ApiResponseError = {
  ok: false;
  error: string;
  issues?: ZodIssue[];
};

export type ApiResponseSuccess<T> = {
  ok: true;
  data: T;
};

/**
 *
 */
export type ApiResponse<T> = ApiResponseSuccess<T> | ApiResponseError;

/**
 *
 */
export type NextRequestContext<T> = {
  params: T;
};

/**
 * The Context parameter for route handlers, which is currently an optional
 * `params` object.
 *
 * See: https://nextjs.org/docs/app/api-reference/file-conventions/route#context-optional
 */
export type NextRouteContext<T = undefined> = {
  params: T;
};

/**
 * https://nextjs.org/docs/app/api-reference/file-conventions/route
 */
export type NextRouteHandler<T = void, U = NextRouteContext> = (
  // https://nextjs.org/docs/app/api-reference/file-conventions/route#request-optional
  request: NextRequest,
  context: U
) => NextResponse<T> | Promise<NextResponse<T>>;
