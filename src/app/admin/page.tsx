import { desc } from "drizzle-orm";
import { db } from "~/db";
import { userTable } from "~/db/schema/users/tables";
import type { UserWithUploads } from "./columns";
import AdminPageClient from "./page.client";

// Fetch users and their uploads using relational queries
async function getUsersWithUploads(): Promise<UserWithUploads[]> {
  try {
    const users: UserWithUploads[] = await db.query.userTable.findMany({
      with: {
        uploads: true,
      },
      orderBy: [desc(userTable.createdAt)],
    });
    return users;
  } catch (error) {
    console.error("Failed to fetch users with uploads:", error);
    return [];
  }
}

export default async function AdminPage() {
  const data = await getUsersWithUploads();
  return <AdminPageClient initialData={data} />;
}
