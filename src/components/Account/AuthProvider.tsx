"use client";

import type { Session } from "next-auth";

import type { FC, PropsWithChildren } from "react";

import { SessionProvider } from "next-auth/react";

type AuthProviderProps = PropsWithChildren<{
  session?: null | Session;
}>;

export const AuthProvider: FC<AuthProviderProps> = ({ children, session }) => (
  <SessionProvider basePath="/api/auth" session={session}>
    {children}
  </SessionProvider>
);
