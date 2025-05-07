"use client";

import { Shield, User } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { twoFactor, useCurrentUserOrRedirect } from "~/lib/auth-client";
import { Button } from "~/ui/primitives/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/ui/primitives/card";
import { Input } from "~/ui/primitives/input";
import { Label } from "~/ui/primitives/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/ui/primitives/tabs";

export function ProfilePageClient() {
  const { isPending, user } = useCurrentUserOrRedirect();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showQrCode, setShowQrCode] = useState(false);
  const [qrCodeData, setQrCodeData] = useState("");
  const [secret, setSecret] = useState("");

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
        if ("data" in result && result.data) {
          const uri = result.data.totpURI;
          setQrCodeData(uri);

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
    <div
      className={`
        container space-y-6 p-4
        md:p-8
      `}
    >
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">Profile</h2>
        <p className="text-muted-foreground">
          Manage your profile and security settings.
        </p>
      </div>

      <Tabs className="space-y-4" defaultValue="general">
        <TabsList>
          <TabsTrigger className="flex items-center gap-2" value="general">
            <User className="h-4 w-4" />
            General
          </TabsTrigger>
          <TabsTrigger className="flex items-center gap-2" value="security">
            <Shield className="h-4 w-4" />
            Security
          </TabsTrigger>
        </TabsList>

        <TabsContent className="space-y-4" value="general">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  defaultValue={user?.name || ""}
                  id="name"
                  placeholder="Enter your name"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  defaultValue={user?.email || ""}
                  id="email"
                  placeholder="Enter your email"
                  type="email"
                />
              </div>
              <Button>Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent className="space-y-4" value="security">
          {error && (
            <div
              className={`
                rounded-md bg-destructive/10 p-4 text-sm text-destructive
              `}
            >
              {error}
            </div>
          )}

          {message && (
            <div className="rounded-md bg-green-50 p-4 text-sm text-green-700">
              {message}
            </div>
          )}

          {showQrCode && qrCodeData && (
            <Card>
              <CardHeader>
                <CardTitle>Scan QR Code</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col items-center">
                  <img
                    alt="QR Code for Two-Factor Authentication"
                    className="h-48 w-48"
                    src={qrCodeData}
                  />
                  <p className="mt-4 text-center text-sm text-muted-foreground">
                    Scan this QR code with your authenticator app (Google
                    Authenticator, Authy, etc.)
                  </p>
                  {secret && (
                    <div className="mt-6 w-full">
                      <p className="text-sm font-medium">Manual entry code:</p>
                      <p
                        className={`
                          mt-2 rounded-md bg-muted p-4 font-mono text-sm
                          break-all
                        `}
                      >
                        {secret}
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle>Two-Factor Authentication</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="password">Your Password</Label>
                <Input
                  id="password"
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  type="password"
                  value={password}
                />
                <p className="text-sm text-muted-foreground">
                  Required to change your two-factor authentication settings
                </p>
              </div>

              <div className="flex space-x-4">
                <Button disabled={loading} onClick={handleEnableTwoFactor}>
                  {loading ? "Processing..." : "Enable Two-Factor"}
                </Button>

                <Button
                  disabled={loading}
                  onClick={handleDisableTwoFactor}
                  variant="destructive"
                >
                  {loading ? "Processing..." : "Disable Two-Factor"}
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Backup Codes</CardTitle>
            </CardHeader>
            <CardContent>
              <Button asChild>
                <Link href="/auth/mfa">manage backup codes</Link>
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
