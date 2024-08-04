"use client";

import Error from "next/error";

// @see https://nextjs.org/docs/app/api-reference/file-conventions/not-found
export default function NotFound() {
  return (
    <html lang="en">
      <body>
        <Error statusCode={404} />
      </body>
    </html>
  );
}
