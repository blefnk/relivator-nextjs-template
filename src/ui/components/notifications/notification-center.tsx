"use client";

import { Bell } from "lucide-react";
import type React from "react";
import { useCallback, useState } from "react";

import { cn } from "~/lib/cn";
import { Button } from "~/ui/primitives/button";
import { CardFooter } from "~/ui/primitives/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/ui/primitives/dropdown-menu";
import { Notifications } from "./notifications";

export interface Notification {
  id: string;
  title: string;
  description: string;
  timestamp: Date;
  read: boolean;
  type: "info" | "success" | "warning" | "error";
}

type NotificationCenterProps = React.HTMLAttributes<HTMLDivElement> & {
  notifications: Notification[];
  onMarkAsRead?: (id: string) => void;
  onMarkAllAsRead?: () => void;
  onDismiss?: (id: string) => void;
  onClearAll?: () => void;
};

export function NotificationCenter({
  notifications,
  onMarkAsRead,
  onMarkAllAsRead,
  onDismiss,
  onClearAll,
  className,
  ...props
}: NotificationCenterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleMarkAsRead = useCallback(
    (id: string) => onMarkAsRead?.(id),
    [onMarkAsRead],
  );

  const handleMarkAllAsRead = useCallback(
    () => onMarkAllAsRead?.(),
    [onMarkAllAsRead],
  );

  const handleDismiss = useCallback(
    (id: string) => onDismiss?.(id),
    [onDismiss],
  );

  const handleClearAll = useCallback(() => onClearAll?.(), [onClearAll]);

  return (
    <div className={cn("relative", className)} {...props}>
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            {unreadCount > 0 && (
              <span
                className={`
                  absolute top-1 right-1 flex h-4 min-w-4 items-center
                  justify-center rounded-full bg-red-500 px-1 text-[10px]
                  font-medium text-white
                `}
              >
                {unreadCount > 99 ? "99+" : String(unreadCount)}
              </span>
            )}
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-80">
          <DropdownMenuLabel className="flex items-center justify-between">
            <span>Notifications</span>
            {unreadCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                className="h-auto p-0 text-xs font-normal text-primary"
                onClick={handleMarkAllAsRead}
              >
                Mark all as read
              </Button>
            )}
          </DropdownMenuLabel>

          <DropdownMenuSeparator />

          <Notifications
            notifications={notifications}
            onMarkAsRead={handleMarkAsRead}
            onDismiss={handleDismiss}
          />

          {notifications.length > 0 && (
            <>
              <DropdownMenuSeparator />
              <CardFooter className="p-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={handleClearAll}
                >
                  Clear all notifications
                </Button>
              </CardFooter>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
