"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { twoFactor, useSession } from "~/lib/auth-client";

export default function BackupCodesPage() {
  const router = useRouter();
  const { data, isPending } = useSession();
  const [backupCodes, setBackupCodes] = useState<string[]>([]);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch backup codes on component mount
  useEffect(() => {
    if (!isPending && !data) {
      router.push("/auth/sign-in");
      return;
    }

    if (!isPending && data) {
      void fetchBackupCodes();
    }
  }, [isPending, data, router]);

  const fetchBackupCodes = async () => {
    try {
      const result = await twoFactor.enable({
        password: "", // Note: This will fail if 2FA is not already enabled
      });

      if (
        "data" in result &&
        result.data &&
        Array.isArray(result.data.backupCodes)
      ) {
        setBackupCodes(result.data.backupCodes);
      } else {
        setError(
          "Failed to retrieve backup codes. You may need to enable 2FA first.",
        );
      }
    } catch (err) {
      setError(
        "Failed to retrieve backup codes. You may need to enable 2FA first.",
      );
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const generateNewCodes = async () => {
    setLoading(true);
    setError("");
    setMessage("");

    try {
      // Generate new codes by enabling 2FA again (which regenerates backup codes)
      const result = await twoFactor.enable({
        password: "", // TODO: implement passwork providing
      });

      if (
        "data" in result &&
        result.data &&
        Array.isArray(result.data.backupCodes)
      ) {
        setBackupCodes(result.data.backupCodes);
        setMessage("New backup codes have been generated");
      } else {
        setError("Failed to generate new backup codes.");
      }
    } catch (err) {
      setError("Failed to generate new backup codes.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (isPending || loading) {
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

  return (
    <div className="flex min-h-screen flex-col p-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Backup Codes</h1>
        <div className="flex space-x-4">
          <Link
            href="/dashboard/profile"
            className="rounded-md bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            Back to Profile
          </Link>
        </div>
      </div>

      <div className="rounded-lg border p-6 shadow-md">
        <h2 className="mb-4 text-xl font-semibold">
          Two-Factor Authentication Backup Codes
        </h2>

        {error && (
          <div className="mb-4 rounded-md bg-red-50 p-4 text-sm text-red-700">
            {error}
          </div>
        )}

        {message && (
          <div className="mb-4 rounded-md bg-green-50 p-4 text-sm text-green-700">
            {message}
          </div>
        )}

        <div className="mb-6">
          <p className="text-gray-600">
            Backup codes can be used to access your account if you lose your
            phone or can't receive two-factor authentication codes. Each code
            can only be used once.
          </p>
          <p className="mt-2 font-medium text-red-600">
            Keep these codes in a safe place. They won't be shown again!
          </p>
        </div>

        {backupCodes.length > 0 ? (
          <div className="mb-6">
            <h3 className="mb-2 text-lg font-medium">Your Backup Codes</h3>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {backupCodes.map((code) => (
                <div
                  key={code}
                  className="rounded-md bg-gray-100 p-2 font-mono text-center"
                >
                  {code}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="mb-6 rounded-md bg-yellow-50 p-4 text-sm text-yellow-700">
            No backup codes available. Generate new codes below.
          </div>
        )}

        <div className="flex justify-center">
          <button
            type="button"
            onClick={() => {
              void generateNewCodes();
            }}
            disabled={loading}
            className="flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
          >
            Generate New Backup Codes
          </button>
        </div>
      </div>
    </div>
  );
}
