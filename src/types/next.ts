import type { NextRequest, NextResponse } from "next/server";

// Next.js Context and Route Handler Types
// type NextRequestContext<T> = {
//   params: T;
// };
export type NextRouteContext<T> = {
  params: T;
};

export type NextRouteHandler<T, U> = (
  request: NextRequest,
  context: U,
) => NextResponse<T> | Promise<NextResponse<T>>;
