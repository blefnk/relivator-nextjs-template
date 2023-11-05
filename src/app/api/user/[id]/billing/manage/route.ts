/**
 * @api {post} /api/user/[id]/billing/manage Manage billing
 *
 * This file is an example to wrap API routes with withAuth.
 * TODO: Not finished yet and not used anywhere.
 *
 * @see https://github.com/steven-tey/dub/blob/main/apps/web/app/api/projects/%5Bslug%5D/billing/manage/route.ts
 * @see https://github.com/steven-tey/dub/blob/main/apps/web/lib/auth/index.ts
 */

import { NextResponse } from "next/server";

import { withAuth } from "~/utils/with";

// POST /api/projects/[slug]/billing/manage - create a Stripe billing portal session
export const POST = withAuth(async ({ seller }) => {
  return NextResponse.json(null);
});
