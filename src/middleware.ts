import type {
  MiddlewareConfig,
  NextFetchEvent,
  NextRequest,
} from "next/server";

import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import createMiddleware from "next-intl/middleware";
import { NextResponse } from "next/server";

import { routing } from "~/i18n/routing";

const isProtectedRoute = createRouteMatcher(["/dashboard(.*)"]);

// Define routes to exclude from next-intl and Clerk middleware
const excludedRoutes = ["/api/unkey"];

const shouldUseClerk = true; // TODO: consider `const shouldUseClerk = Boolean(env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY);`
const shouldUseIntl = true;

const createIntlMiddlewareInstance = createMiddleware(routing);

function handleClerkMiddleware(request: NextRequest, event: NextFetchEvent) {
  return clerkMiddleware(async (auth, request) => {
    if (isProtectedRoute(request)) {
      await auth.protect();
    }
    return shouldUseIntl
      ? createIntlMiddlewareInstance(request)
      : NextResponse.next();
  })(request, event);
}

export function middleware(request: NextRequest, event: NextFetchEvent) {
  const pathname = request.nextUrl.pathname;

  // Check if the request path is excluded
  const isExcluded = excludedRoutes.some((route) => pathname.startsWith(route));

  if (isExcluded) {
    return NextResponse.next();
  }

  return shouldUseClerk
    ? handleClerkMiddleware(request, event)
    : NextResponse.next();
}

export const config: MiddlewareConfig = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(de|en|es|fr|hi|it|ms|pl|tr|uk|zh)/:path*",
    "/(api|trpc)(.*)",
  ],
};
