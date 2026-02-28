import "server-only";

import type { UserWithUploads } from "~/app/admin/summary/page.types";

// Global in-memory list so tests can add to it and it stays in memory (while the dev server runs)
export const MOCK_USERS_WITH_UPLOADS: UserWithUploads[] = [
  {
    createdAt: new Date(),
    email: "mockuser@example.com",
    emailVerified: true,
    firstName: "Jane",
    id: "mock-user-123",
    lastName: "Doe",
    name: "Jane Doe",
    updatedAt: new Date(),
    uploads: [
      {
        createdAt: new Date(),
        id: "mock-upload-1",
        key: "mock-upload-key-1",
        type: "image",
        updatedAt: new Date(),
        url: "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?q=80&w=2070&auto=format&fit=crop",
        userId: "mock-user-123",
      }
    ]
  }
] as unknown as UserWithUploads[];

// Fetch users and their uploads from memory
export async function getUsersWithUploads(): Promise<UserWithUploads[]> {
  return MOCK_USERS_WITH_UPLOADS;
}
