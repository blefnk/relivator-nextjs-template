"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

// Mock User Data
const MOCK_USER = {
  age: null,
  createdAt: new Date(),
  email: "mockuser@example.com",
  emailVerified: true,
  firstName: "Jane",
  id: "mock-user-123",
  image: null,
  lastName: "Doe",
  name: "Jane Doe",
  twoFactorEnabled: false,
  updatedAt: new Date(),
};

const MOCK_SESSION = {
  expiresAt: new Date(Date.now() + 86400000),
  id: "mock-session-123",
  userId: "mock-user-123",
};

const defaultSuccessResponse = async (..._args: any[]): Promise<any> => ({ data: { session: MOCK_SESSION, user: MOCK_USER }, error: null });
const defaultResponse = async (..._args: any[]): Promise<any> => ({ data: null, error: null });

// Mock Auth Client
export const authClient = {
  signIn: Object.assign(defaultSuccessResponse, {
    email: defaultSuccessResponse,
    social: defaultSuccessResponse,
  }),
  signOut: defaultResponse,
  signUp: Object.assign(defaultSuccessResponse, {
    email: defaultSuccessResponse,
  }),
  // eslint-disable-next-line @eslint-react/hooks-extra/no-unnecessary-use-prefix
  useSession: (): any => ({ data: { session: MOCK_SESSION, user: MOCK_USER }, isPending: false }),
};

export const { signIn, signOut, signUp, useSession } = authClient;

// Two-factor methods (mocked)
export const twoFactor = {
  disable: defaultResponse,
  enable: defaultResponse,
  verify: defaultResponse,
  verifyBackupCode: async (..._args: any[]): Promise<any> => ({ data: { backupCodes: ["mock-code-1", "mock-code-2"] }, error: null }),
  verifyTotp: async (..._args: any[]): Promise<any> => ({ data: { backupCodes: ["mock-code-1", "mock-code-2"] }, error: null }),
};

export const useCurrentUser = () => {
  const { data, isPending } = useSession();
  return {
    isPending,
    session: data?.session,
    user: data?.user,
  };
};

export const useCurrentUserOrRedirect = (
  forbiddenUrl = "/auth/sign-in",
  okUrl = "",
  ignoreForbidden = false,
) => {
  const { data, isPending } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!isPending && router) {
      if (!data?.user) {
        if (!ignoreForbidden) {
          router.push(forbiddenUrl);
        }
      } else if (okUrl) {
        router.push(okUrl);
      }
    }
  }, [isPending, data?.user, router, forbiddenUrl, okUrl, ignoreForbidden]);

  return {
    isPending,
    session: data?.session,
    user: data?.user,
  };
};
