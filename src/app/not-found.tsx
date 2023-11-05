"use client";

import Error from "next/error";

/**
 * ### NotFound Page Component
 *
 * Purpose:
 * - This component renders the built-in Next.js 404 page.
 *
 * Behavior:
 * - Triggered when a user navigates to a route that doesn't
 *   have a corresponding locale set by the middleware.
 *
 * Output:
 * - Renders a page with a 404 error message.
 *
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/not-found
 */
export default function NotFound() {
  return (
    <html lang="en">
      <body>
        <Error statusCode={404} />
      </body>
    </html>
  );
}
