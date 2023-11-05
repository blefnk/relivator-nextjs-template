/**
 * This file is used to wrap API routes with auth.
 * TODO: Not finished yet and not used anywhere.
 * @see https://github.com/steven-tey/dub/blob/main/apps/web/lib/auth/index.ts
 */

import { PlanProps, SellerProps } from "~/types";

export type Session = {
  user: {
    id: string;
    email: string;
    name: string;
    image?: string;
  };
};

export function getSearchParams(url: string) {
  const params = {} as Record<string, string>;
  new URL(url).searchParams.forEach(function (val, key) {
    params[key] = val;
  });
  return params;
}

type WithAuthHandler = ({
  req,
  params,
  searchParams,
  headers,
  session,
  seller,
  domain,
}: {
  req?: Request;
  params?: Record<string, string>;
  searchParams?: Record<string, string>;
  headers?: Record<string, string>;
  session?: Session | undefined;
  seller?: SellerProps;
  domain?: string;
}) => Promise<Response>;

export const withAuth =
  (
    handler: WithAuthHandler,
    {
      requiredPlan = ["starter", "professional", "enterprise"], // if the action needs a specific plan
      requiredRole = ["owner", "member"],
      needNotExceededUsage, // if the action needs the user to not have exceeded their usage
    }: {
      requiredPlan?: Array<PlanProps>;
      requiredRole?: Array<"owner" | "member">;
      needNotExceededUsage?: boolean;
    } = {},
  ) =>
  async (
    req: Request,
    { params }: { params: Record<string, string> | undefined },
  ) => {
    const searchParams = getSearchParams(req.url);
    const { slug, domain, linkId } = params || {};
    let session: Session | undefined;
    const seller: SellerProps | undefined = undefined;

    return handler({
      req,
      params: params || {},
      searchParams,
      session,
      seller,
    });
  };
