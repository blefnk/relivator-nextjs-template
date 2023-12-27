"use client";

import type { FC, PropsWithChildren } from "react";
import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

type AuthProviderProps = PropsWithChildren<{ session?: Session | null }>;

export const AuthProvider: FC<AuthProviderProps> = ({ session, children }) => {
  return <SessionProvider session={session}>{children}</SessionProvider>;
};
