"use client";

import { Bell, Lock, User } from "lucide-react";

import { useCurrentUser } from "~/lib/auth-client";
import { Button } from "~/ui/primitives/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/ui/primitives/card";
import { Input } from "~/ui/primitives/input";
import { Label } from "~/ui/primitives/label";
import { Switch } from "~/ui/primitives/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/ui/primitives/tabs";

export function SettingsPageClient() {
  const { user } = useCurrentUser();

  return (
    <div
      className={`
        container space-y-6 p-4
        md:p-8
      `}
    >
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground">
          Manage your account settings and preferences.
        </p>
      </div>

      <Tabs className="space-y-4" defaultValue="profile">
        <TabsList>
          <TabsTrigger className="flex items-center gap-2" value="profile">
            <User className="h-4 w-4" />
            Profile
          </TabsTrigger>
          <TabsTrigger
            className="flex items-center gap-2"
            value="notifications"
          >
            <Bell className="h-4 w-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger className="flex items-center gap-2" value="security">
            <Lock className="h-4 w-4" />
            Security
          </TabsTrigger>
        </TabsList>

        <TabsContent className="space-y-4" value="profile">
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

        <TabsContent className="space-y-4" value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="email-notifications">Email Notifications</Label>
                <Switch id="email-notifications" />
              </div>
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="marketing-emails">Marketing Emails</Label>
                <Switch id="marketing-emails" />
              </div>
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="order-updates">Order Updates</Label>
                <Switch defaultChecked id="order-updates" />
              </div>
              <Button>Save Preferences</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent className="space-y-4" value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="current-password">Current Password</Label>
                <Input
                  id="current-password"
                  placeholder="Enter current password"
                  type="password"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input
                  id="new-password"
                  placeholder="Enter new password"
                  type="password"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="confirm-password">Confirm New Password</Label>
                <Input
                  id="confirm-password"
                  placeholder="Confirm new password"
                  type="password"
                />
              </div>
              <Button>Update Password</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Two-Factor Authentication</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between space-x-2">
                <div className="space-y-0.5">
                  <Label>Two-Factor Authentication</Label>
                  <p className="text-sm text-muted-foreground">
                    Add an extra layer of security to your account
                  </p>
                </div>
                <Switch id="2fa" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
