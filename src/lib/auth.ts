import { redirect } from "next/navigation";

import type { UserDbType } from "~/lib/auth-types";

// Static mock user definition
const MOCK_USER: UserDbType = {
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

// Mock `betterAuth` instance
export const auth = {
  api: {
    getSession: async () => {
      // Simulate getting a session
      return { session: { expiresAt: new Date(Date.now() + 86400000), id: "mock-session-123", userId: "mock-user-123" }, user: MOCK_USER };
    }
  }
} as any;

export const getCurrentUser = async (): Promise<null | UserDbType> => {
  return MOCK_USER;
};

export const getCurrentUserOrRedirect = async (
  forbiddenUrl = "/auth/sign-in",
  okUrl = "",
  ignoreForbidden = false,
): Promise<null | UserDbType> => {
  const user = await getCurrentUser();

  if (!user) {
    if (!ignoreForbidden) {
      redirect(forbiddenUrl);
    }
    return user; 
  }

  if (okUrl) {
    redirect(okUrl);
  }

  return user;
};
