"use client";

import { Bell, Check, X } from "lucide-react";
import * as React from "react";

import { cn } from "~/lib/utils";
import { Button } from "~/ui/primitives/button";
import { CardFooter } from "~/ui/primitives/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/ui/primitives/dropdown-menu";
import { Separator } from "~/ui/primitives/separator";

export type Notification = {
  id: string;
  title: string;
  description: string;
  timestamp: Date;
  read: boolean;
  type: "info" | "success" | "warning" | "error";
};

type NotificationCenterProps = {
  notifications: Notification[];
  onMarkAsRead?: (id: string) => void;
  onMarkAllAsRead?: () => void;
  onDismiss?: (id: string) => void;
  onClearAll?: () => void;
} & React.HTMLAttributes<HTMLDivElement>;

export function NotificationCenter({
  notifications,
  onMarkAsRead,
  onMarkAllAsRead,
  onDismiss,
  onClearAll,
  className,
  ...props
}: NotificationCenterProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleMarkAsRead = (id: string) => {
    if (onMarkAsRead) {
      onMarkAsRead(id);
    }
  };

  const handleMarkAllAsRead = () => {
    if (onMarkAllAsRead) {
      onMarkAllAsRead();
    }
  };

  const handleDismiss = (id: string) => {
    if (onDismiss) {
      onDismiss(id);
    }
  };

  const handleClearAll = () => {
    if (onClearAll) {
      onClearAll();
    }
  };

  const formatTimestamp = (date: Date) => {
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) {
      return "Just now";
    }

    if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return minutes === 1
        ? "1 minute ago"
        : `${minutes.toString()} minutes ago`;
    }

    if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600);
      return hours === 1 ? "1 hour ago" : `${hours.toString()} hours ago`;
    }

    const days = Math.floor(diffInSeconds / 86400);
    return days === 1 ? "1 day ago" : `${days.toString()} days ago`;
  };

  const getNotificationIcon = (type: Notification["type"]) => {
    switch (type) {
      case "info":
        return <div className="h-2 w-2 rounded-full bg-blue-500" />;
      case "success":
        return <div className="h-2 w-2 rounded-full bg-green-500" />;
      case "warning":
        return <div className="h-2 w-2 rounded-full bg-yellow-500" />;
      case "error":
        return <div className="h-2 w-2 rounded-full bg-red-500" />;
      default:
        return null;
    }
  };

  return (
    <div className={cn("relative", className)} {...props}>
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            {unreadCount > 0 && (
              <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-medium text-white">
                {unreadCount > 99 ? "99+" : unreadCount.toString()}
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
          <DropdownMenuGroup className="max-h-[300px] overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-6 text-center">
                <Bell className="mb-2 h-10 w-10 text-muted-foreground/50" />
                <p className="text-sm font-medium">No notifications yet</p>
                <p className="text-xs text-muted-foreground">
                  When you get notifications, they'll show up here
                </p>
              </div>
            ) : (
              notifications.map((notification) => (
                <DropdownMenuItem
                  key={notification.id}
                  className={cn(
                    "flex cursor-default flex-col items-start p-0",
                    !notification.read && "bg-muted/50",
                  )}
                >
                  <div className="flex w-full items-start gap-2 p-2">
                    <div className="mt-1 flex-shrink-0">
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium leading-none">
                          {notification.title}
                        </p>
                        <span className="text-xs text-muted-foreground">
                          {formatTimestamp(notification.timestamp)}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {notification.description}
                      </p>
                    </div>
                    <div className="flex flex-shrink-0 gap-1">
                      {!notification.read && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => {
                            handleMarkAsRead(notification.id);
                          }}
                        >
                          <Check className="h-3 w-3" />
                          <span className="sr-only">Mark as read</span>
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => {
                          handleDismiss(notification.id);
                        }}
                      >
                        <X className="h-3 w-3" />
                        <span className="sr-only">Dismiss</span>
                      </Button>
                    </div>
                  </div>
                  <Separator />
                </DropdownMenuItem>
              ))
            )}
          </DropdownMenuGroup>
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
