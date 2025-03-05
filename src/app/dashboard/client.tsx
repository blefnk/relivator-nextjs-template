"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { signOut, useSession } from "~/lib/auth-client";

// Define a type for the custom user metadata
type UserMetadata = {
  firstName?: string;
  lastName?: string;
  age?: number;
};

export function DashboardPageClient() {
  const { data, isPending } = useSession();
  const router = useRouter();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isPending && !data) {
      router.push("/auth/sign-in");
    }
  }, [data, isPending, router]);

  const handleSignOut = () => {
    void signOut().then(() => {
      router.push("/auth/sign-in");
    });
  };

  if (isPending) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Loading...</h1>
        </div>
      </div>
    );
  }

  if (!data) {
    return null; // Will redirect in the useEffect
  }

  const { user } = data;
  // Access metadata if it exists (for custom fields)
  // Cast to unknown first, then to our specific type for type safety
  const metadata =
    (user as unknown as { metadata?: UserMetadata }).metadata ?? {};

  return (
    <div className="flex min-h-screen flex-col p-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <div className="flex space-x-4">
          <button
            type="button"
            onClick={() => {
              router.push("/profile");
            }}
            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Profile Settings
          </button>
          <button
            type="button"
            onClick={handleSignOut}
            className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            Sign Out
          </button>
        </div>
      </div>

      <div className="rounded-lg border p-6 shadow-md">
        <h2 className="mb-4 text-xl font-semibold">Your Profile</h2>
        <div className="space-y-4">
          <div className="flex items-center">
            {user.image ? (
              <img
                src={user.image}
                alt="Profile"
                className="mr-4 h-16 w-16 rounded-full"
              />
            ) : (
              <div className="mr-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-xl font-semibold text-blue-600">
                {user.name.charAt(0) || "U"}
              </div>
            )}
            <div>
              <h3 className="text-lg font-medium">{user.name}</h3>
              <p className="text-gray-600">{user.email}</p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4">
            <div className="rounded-md bg-gray-50 p-4">
              <h4 className="text-sm font-medium text-gray-500">First Name</h4>
              <p className="mt-1">{metadata.firstName ?? "Not provided"}</p>
            </div>
            <div className="rounded-md bg-gray-50 p-4">
              <h4 className="text-sm font-medium text-gray-500">Last Name</h4>
              <p className="mt-1">{metadata.lastName ?? "Not provided"}</p>
            </div>
            <div className="rounded-md bg-gray-50 p-4">
              <h4 className="text-sm font-medium text-gray-500">Age</h4>
              <p className="mt-1">{metadata.age ?? "Not provided"}</p>
            </div>
            <div className="rounded-md bg-gray-50 p-4">
              <h4 className="text-sm font-medium text-gray-500">
                Email Verified
              </h4>
              <p className="mt-1">{user.emailVerified ? "Yes" : "No"}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
