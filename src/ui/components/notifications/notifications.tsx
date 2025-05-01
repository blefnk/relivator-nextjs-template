import { Bell, Check, X } from "lucide-react";
import type * as React from "react";
import { cn } from "~/lib/cn";
import { Button } from "~/ui/primitives/button";
import {
  DropdownMenuGroup,
  DropdownMenuItem,
} from "~/ui/primitives/dropdown-menu";
import type { Notification } from "./notification-center";

interface NotificationsProps {
  notifications: Notification[];
  onMarkAsRead?: (id: string) => void;
  onDismiss?: (id: string) => void;
}

function formatTimestamp(date: Date) {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  if (diffInSeconds < 60) return "Just now";
  if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return minutes === 1 ? "1 minute ago" : `${minutes} minutes ago`;
  }
  if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return hours === 1 ? "1 hour ago" : `${hours} hours ago`;
  }
  const days = Math.floor(diffInSeconds / 86400);
  return days === 1 ? "1 day ago" : `${days} days ago`;
}

function getNotificationIcon(type: Notification["type"]) {
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
}

export const Notifications: React.FC<NotificationsProps> = ({
  notifications,
  onMarkAsRead,
  onDismiss,
}) => {
  if (notifications.length === 0) {
    return (
      <div
        className={"flex flex-col items-center justify-center py-6 text-center"}
      >
        <Bell className="mb-2 h-10 w-10 text-muted-foreground/50" />
        <p className="text-sm font-medium">No notifications yet</p>
        <p className="text-xs text-muted-foreground">
          When you get notifications, they'll show up here
        </p>
      </div>
    );
  }

  return (
    <DropdownMenuGroup className="max-h-[300px] overflow-y-auto">
      {notifications.map((notification) => (
        <DropdownMenuItem
          key={notification.id}
          onSelect={(e) => e.preventDefault()}
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
                <p className="text-sm leading-none font-medium">
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
                  onClick={() => onMarkAsRead?.(notification.id)}
                >
                  <Check className="h-3 w-3" />
                  <span className="sr-only">Mark as read</span>
                </Button>
              )}
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                onClick={() => onDismiss?.(notification.id)}
              >
                <X className="h-3 w-3" />
                <span className="sr-only">Dismiss</span>
              </Button>
            </div>
          </div>
        </DropdownMenuItem>
      ))}
    </DropdownMenuGroup>
  );
};
