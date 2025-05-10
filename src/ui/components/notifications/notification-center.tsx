"use client";

import type React from "react";

import { Bell } from "lucide-react";
import { useCallback, useState } from "react";

import { cn } from "~/lib/cn";
import { Badge } from "~/ui/primitives/badge";
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
  description: string;
  id: string;
  read: boolean;
  timestamp: Date;
  title: string;
  type: "error" | "info" | "success" | "warning";
}

type NotificationCenterProps = React.HTMLAttributes<HTMLDivElement> & {
  notifications: Notification[];
  onClearAll?: () => void;
  onDismiss?: (id: string) => void;
  onMarkAllAsRead?: () => void;
  onMarkAsRead?: (id: string) => void;
};

export function NotificationCenter({
  className,
  notifications,
  onClearAll,
  onDismiss,
  onMarkAllAsRead,
  onMarkAsRead,
  ...props
}: NotificationCenterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleMarkAsRead = useCallback(
    (id: string) => onMarkAsRead?.(id),
    [onMarkAsRead]
  );

  const handleMarkAllAsRead = useCallback(
    () => onMarkAllAsRead?.(),
    [onMarkAllAsRead]
  );

  const handleDismiss = useCallback(
    (id: string) => onDismiss?.(id),
    [onDismiss]
  );

  const handleClearAll = useCallback(() => onClearAll?.(), [onClearAll]);

  return (
    <div className={cn("relative", className)} {...props}>
      <DropdownMenu onOpenChange={setIsOpen} open={isOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            aria-label="Notification"
            className="relative h-9 w-9 rounded-full"
            size="icon"
            variant="outline"
          >
            <Bell className="h-4 w-4" />
            {unreadCount > 0 && (
              <Badge
                className={`
                  absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-[10px]
                `}
                variant="destructive"
              >
                {unreadCount > 99 ? "99+" : String(unreadCount)}
              </Badge>
            )}
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-80">
          <DropdownMenuLabel className="flex items-center justify-between">
            <span>Notifications</span>
            {unreadCount > 0 && (
              <Button
                className="h-auto p-0 text-xs font-normal text-primary"
                onClick={handleMarkAllAsRead}
                size="sm"
                variant="ghost"
              >
                Mark all as read
              </Button>
            )}
          </DropdownMenuLabel>

          <DropdownMenuSeparator />

          <Notifications
            notifications={notifications}
            onDismiss={handleDismiss}
            onMarkAsRead={handleMarkAsRead}
          />

          {notifications.length > 0 && (
            <>
              <DropdownMenuSeparator />
              <CardFooter className="p-2">
                <Button
                  className="w-full"
                  onClick={handleClearAll}
                  size="sm"
                  variant="outline"
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
