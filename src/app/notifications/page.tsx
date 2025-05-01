"use client";

import * as React from "react";

import type { Notification } from "~/ui/components/notifications/notification-center";
import { mockNotifications } from "~/ui/components/notifications/notifications.mock";
import { Button } from "~/ui/primitives/button";
import { Separator } from "~/ui/primitives/separator";

export default function NotificationsPage() {
  const [notifications, setNotifications] = React.useState<Notification[]>(
    () => mockNotifications,
  );

  const handleMarkAllAsRead = () => {
    setNotifications(
      notifications.map((notification) => ({ ...notification, read: true })),
    );
  };

  const handleClearAll = () => {
    setNotifications([]);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <div
          className={`
            container px-4 py-8
            md:px-6
          `}
        >
          <div className="mb-8 flex items-center justify-between">
            <h1 className="text-3xl font-bold">Notifications Center</h1>
          </div>

          <Separator className="my-12" />

          <section className="mb-12">
            <h2 className="mb-6 text-2xl font-semibold">Notification Center</h2>
            <div className="rounded-lg border p-6">
              <p className="mb-4">
                The notification center is displayed in the top-right corner of
                this page. Click the bell icon to see your notifications.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button
                  onClick={() => {
                    const newId = (notifications.length + 1).toString();
                    const newNotification: Notification = {
                      id: newId,
                      title: "New Notification",
                      description:
                        "This is a new notification that was just created.",
                      timestamp: new Date(),
                      read: false,
                      type: Math.random() > 0.5 ? "info" : "success",
                    };
                    setNotifications([newNotification, ...notifications]);
                  }}
                >
                  Add New Notification
                </Button>
                <Button variant="outline" onClick={handleMarkAllAsRead}>
                  Mark All as Read
                </Button>
                <Button variant="outline" onClick={handleClearAll}>
                  Clear All Notifications
                </Button>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
