"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  linkSocial,
  twoFactor,
  unlinkAccount,
  useSession,
} from "~/lib/auth-client";

// Define a type for the account
type UserAccount = {
  id: string;
  providerId: string;
  accountId: string;
};

// Define an extended user type that includes accounts
type ExtendedUser = {
  id: string;
  email: string;
  emailVerified: boolean;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  image?: string | null;
  twoFactorEnabled?: boolean | null;
  accounts?: UserAccount[];
};

// Define an extended session type
type ExtendedSession = {
  user: ExtendedUser;
};

export function ProfilePageClient() {
  const router = useRouter();
  const { data, isPending } = useSession() as {
    data: ExtendedSession | null | undefined;
    isPending: boolean;
  };
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showQrCode, setShowQrCode] = useState(false);
  const [qrCodeData, setQrCodeData] = useState("");
  const [secret, setSecret] = useState("");

  // Redirect to login if not authenticated
  if (!isPending && !data) {
    router.push("/auth/sign-in");
    return null;
  }

  if (isPending) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Loading...</h1>
        </div>
      </div>
    );
  }

  const handleEnableTwoFactor = () => {
    if (!password) {
      setError("Password is required");
      return;
    }

    setError("");
    setLoading(true);

    twoFactor
      .enable({
        password,
      })
      .then((result) => {
        // Check if the result is an error or has the expected data
        if ("data" in result && result.data) {
          // Show the QR code and backup codes
          const uri = result.data.totpURI;
          setQrCodeData(uri);

          // Extract the secret from the URI if available
          if (typeof uri === "string" && uri.includes("secret=")) {
            const secretMatch = uri.split("secret=")[1];
            if (secretMatch) {
              const extractedSecret = secretMatch.split("&")[0];
              if (extractedSecret) {
                setSecret(extractedSecret);
              }
            }
          }

          setShowQrCode(true);
          setMessage("Scan the QR code with your authenticator app");
        } else {
          // Handle unexpected response format
          setError(
            "Failed to enable two-factor authentication. Unexpected response format.",
          );
        }
      })
      .catch((err: unknown) => {
        setError(
          "Failed to enable two-factor authentication. Please try again.",
        );
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleDisableTwoFactor = () => {
    if (!password) {
      setError("Password is required");
      return;
    }

    setError("");
    setLoading(true);

    twoFactor
      .disable({
        password,
      })
      .then(() => {
        setMessage("Two-factor authentication has been disabled");
        setShowQrCode(false);
      })
      .catch((err: unknown) => {
        setError(
          "Failed to disable two-factor authentication. Please try again.",
        );
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="flex min-h-screen flex-col p-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Profile Settings</h1>
        <Link
          href="/dashboard"
          className="rounded-md bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
        >
          Back to Dashboard
        </Link>
      </div>

      <div className="rounded-lg border p-6 shadow-md">
        <h2 className="mb-4 text-xl font-semibold">
          Two-Factor Authentication
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

        {showQrCode && qrCodeData && (
          <div className="mb-6 rounded-md bg-gray-50 p-4">
            <h3 className="mb-2 text-lg font-medium">Scan QR Code</h3>
            <div className="flex flex-col items-center">
              {/* Display QR code image */}
              <img
                src={qrCodeData}
                alt="QR Code for Two-Factor Authentication"
                className="h-48 w-48"
              />
              <p className="mt-2 text-center text-sm text-gray-600">
                Scan this QR code with your authenticator app (Google
                Authenticator, Authy, etc.)
              </p>
              {secret && (
                <div className="mt-4 w-full">
                  <p className="text-sm font-medium text-gray-700">
                    Manual entry code:
                  </p>
                  <p className="mt-1 break-all rounded-md bg-gray-100 p-2 text-center font-mono text-sm">
                    {secret}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label htmlFor="password" className="block text-sm font-medium">
              Your Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
              placeholder="Enter your password"
            />
            <p className="mt-1 text-sm text-gray-500">
              Required to change your two-factor authentication settings
            </p>
          </div>

          <div className="flex space-x-4">
            <button
              type="button"
              onClick={handleEnableTwoFactor}
              disabled={loading}
              className="flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
            >
              {loading ? "Processing..." : "Enable Two-Factor"}
            </button>

            <button
              type="button"
              onClick={handleDisableTwoFactor}
              disabled={loading}
              className="flex items-center justify-center rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50"
            >
              {loading ? "Processing..." : "Disable Two-Factor"}
            </button>
          </div>

          <div className="mt-4">
            <Link
              href="/auth/backup-codes"
              className="flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              View Backup Codes
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-lg border p-6 shadow-md">
        <h2 className="mb-4 text-xl font-semibold">Linked Accounts</h2>

        <div className="space-y-4">
          <p className="text-gray-600">
            Link your account with social providers for easier sign-in.
          </p>

          {data?.user.accounts && data.user.accounts.length > 0 ? (
            <div className="space-y-2">
              <h3 className="text-md font-medium">Your linked accounts:</h3>
              <div className="space-y-2">
                {data.user.accounts.map((account: UserAccount) => (
                  <div
                    key={account.providerId}
                    className="flex items-center justify-between rounded-md bg-gray-50 p-3"
                  >
                    <div>
                      <span className="font-medium">{account.providerId}</span>
                    </div>
                    {data.user.accounts && data.user.accounts.length > 1 && (
                      <button
                        type="button"
                        onClick={() => {
                          unlinkAccount({
                            providerId: account.providerId,
                          })
                            .then(() => {
                              // Refresh the session to update the UI
                              router.refresh();
                            })
                            .catch((err: unknown) => {
                              console.error(err);
                              setError(
                                "Failed to unlink account. Make sure you have at least one login method.",
                              );
                            });
                        }}
                        className="text-sm text-red-600 hover:text-red-800"
                      >
                        Unlink
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p className="italic text-gray-500">No linked accounts</p>
          )}

          <div className="mt-4 space-y-2">
            <h3 className="text-md font-medium">Link a new account:</h3>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => {
                  linkSocial({
                    provider: "github",
                    callbackURL: "/profile",
                  }).catch((err: unknown) => {
                    console.error(err);
                    setError("Failed to link GitHub account.");
                  });
                }}
                className="rounded-md bg-gray-800 px-4 py-2 text-sm font-medium text-white hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                Link GitHub
              </button>
              <button
                type="button"
                onClick={() => {
                  linkSocial({
                    provider: "google",
                    callbackURL: "/profile",
                  }).catch((err: unknown) => {
                    console.error(err);
                    setError("Failed to link Google account.");
                  });
                }}
                className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Link Google
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
