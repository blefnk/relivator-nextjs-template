/**
 * We need this file so that we can render internationalized 404 page
 * @see https://next-intl-docs.vercel.app/docs/environments/error-files
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/not-found
 * @see https://next-intl-docs.vercel.app/docs/environments/server-client-components
 */

import { notFound } from "next/navigation";

export default function CatchAllPage() {
  notFound();
}
