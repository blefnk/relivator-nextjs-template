import "server-only";

import type { User } from "~/db/schema/users/types";

// Static mock user definition
const MOCK_USER: User = {
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

/**
 * Fetches a mock user by their ID.
 * @param userId - The ID of the user to fetch.
 * @returns The user object or null if not found.
 */
export async function getUserById(_userId: string): Promise<null | User> {
  // Return the mock user for any ID request to keep the mockup working
  return MOCK_USER;
}
