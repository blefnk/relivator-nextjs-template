import type { Notification } from "./notification-center";

export const mockNotifications: Notification[] = [
  {
    id: "1",
    title: "Welcome to Relivator!",
    description: "Thank you for signing up. Explore our features.",
    timestamp: new Date(Date.now() - 60 * 1000), // 1 minute ago
    read: false,
    type: "success",
  },
  {
    id: "2",
    title: "Payment Failed",
    description: "There was an issue with your payment method.",
    timestamp: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
    read: false,
    type: "error",
  },
  {
    id: "3",
    title: "Order Shipped",
    description: "Your order #1234 has shipped.",
    timestamp: new Date(Date.now() - 3600 * 1000), // 1 hour ago
    read: false,
    type: "info",
  },
  {
    id: "4",
    title: "New Product Available",
    description: "The item on your wishlist is now back in stock!",
    timestamp: new Date(Date.now() - 3600 * 1000), // 1 hour ago
    read: true,
    type: "info",
  },
  {
    id: "5",
    title: "Discount Available!",
    description: "Get 10% off your next purchase.",
    timestamp: new Date(Date.now() - 2 * 86400 * 1000), // 2 days ago
    read: true,
    type: "warning",
  },
];
