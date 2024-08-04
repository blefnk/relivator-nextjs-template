"use client";

import type { FC, PropsWithChildren, ReactNode } from "react";

import { useSession } from "next-auth/react";

type AuthRequiredProps = PropsWithChildren<{
  fallback?: ReactNode;
}>;

export const AuthRequired: FC<AuthRequiredProps> = ({ children, fallback }) => {
  const { data: session } = useSession();

  if (!session) {
    return fallback;
  }

  return children;
};
