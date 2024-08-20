import type { NextRequest, NextResponse } from "next/server";

import type { ApiResponse } from "@/types/reliverse/api";
import type { NextRouteHandler } from "@/types/reliverse/next";

import { buildErrorResponse } from "@/server/reliverse/error-response";

// Wrap an API handler with additional logging, error handling, etc.
// @example
// type ResponseData = { name: string }
// type Context = NextRouteContext<{ id: string }>
// export const GET = handler<ResponseData, Context>((req, context) => {
// if (!context.params.userId) {
// unauthorized()
// }
// if (!req.query.name) {
// validationError("name is required")
// }
// return NextResponse.json({ name: request.query.name })
// })
// @param routeHandler the api handler
// @returns a wrapped api handler
export const handler = <T, U>(
  routeHandler: NextRouteHandler<ApiResponse<T>, U>,
): NextRouteHandler<ApiResponse<T>, U> => {
  // const startTime = new Date();
  return async (request: unknown, context: unknown) => {
    // const method = request.method;
    // const url = request.nextUrl.pathname;
    //
    // Log the HTTP request
    //
    // logger.info(`➡️  ${method} ${url} ...`);
    let res: NextResponse<ApiResponse<T>>;

    try {
      res = await routeHandler(
        request as unknown as NextRequest,
        context as unknown as never,
      );
    } catch (error) {
      res = buildErrorResponse(error);
    }

    // const responseTime = new Date().getTime() - startTime.getTime();
    //
    // Log the HTTP res status
    //
    // logger.info(
    //   `⬅️  ${method} ${url} (${res.status}) took ${responseTime}ms`,
    // );

    return res;
  };
};
