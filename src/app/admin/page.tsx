import { desc } from "drizzle-orm";

import { db } from "~/db";
import { userTable } from "~/db/schema/users/tables";

import type { UserWithUploads } from "./columns";

import AdminPageClient from "./page.client";

export default async function AdminPage() {
  const data = await getUsersWithUploads();
  return <AdminPageClient initialData={data} />;
}

// Fetch users and their uploads using relational queries
async function getUsersWithUploads(): Promise<UserWithUploads[]> {
  try {
    const users: UserWithUploads[] = await db.query.userTable.findMany({
      orderBy: [desc(userTable.createdAt)],
      with: {
        uploads: true,
      },
    });
    return users;
  } catch (error) {
    console.error("Failed to fetch users with uploads:", error);
    return [];
  }
}
