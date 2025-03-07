"use client";

import Link from "next/link";
import * as React from "react";

import { Header } from "~/ui/components/header";
import {
  type Notification,
  NotificationCenter,
} from "~/ui/components/notification-center";
import { ProductCard } from "~/ui/components/product-card";
import { TestimonialCarousel } from "~/ui/components/testimonial-carousel";
import { Button } from "~/ui/primitives/button";
import { Separator } from "~/ui/primitives/separator";

export default function ShowcasePage() {
  // Product data for showcase
  const products = [
    {
      id: "1",
      name: "Premium Wireless Headphones",
      price: 199.99,
      originalPrice: 249.99,
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      category: "Audio",
      rating: 4.5,
      inStock: true,
    },
    {
      id: "2",
      name: "Smart Watch Series 5",
      price: 299.99,
      originalPrice: 349.99,
      image:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      category: "Wearables",
      rating: 4.2,
      inStock: true,
    },
    {
      id: "3",
      name: "Professional Camera Kit",
      price: 1299.99,
      originalPrice: 1499.99,
      image:
        "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      category: "Photography",
      rating: 4.8,
      inStock: false,
    },
  ];

  // Testimonial data for showcase
  const testimonials = [
    {
      id: "1",
      content:
        "This platform has completely transformed how I shop online. The user experience is seamless, and the product quality is consistently excellent.",
      author: {
        name: "Sarah Johnson",
        role: "Marketing Director",
        avatar:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      },
      rating: 5,
    },
    {
      id: "2",
      content:
        "I've been using this service for over a year now, and I'm continually impressed by the attention to detail and customer support.",
      author: {
        name: "Michael Chen",
        role: "Software Engineer",
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      },
      rating: 4,
    },
    {
      id: "3",
      content:
        "The product selection is unmatched, and the delivery is always on time. This has become my go-to for all my shopping needs.",
      author: {
        name: "Emily Rodriguez",
        role: "Product Designer",
        avatar:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      },
      rating: 5,
    },
  ];

  // Notification data for showcase
  const [notifications, setNotifications] = React.useState<Notification[]>(
    () => [
      {
        id: "1",
        title: "Order Confirmed",
        description:
          "Your order #12345 has been confirmed and is being processed.",
        timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
        read: false,
        type: "success",
      },
      {
        id: "2",
        title: "New Product Available",
        description: "The item on your wishlist is now back in stock!",
        timestamp: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
        read: true,
        type: "info",
      },
      {
        id: "3",
        title: "Payment Failed",
        description:
          "There was an issue processing your payment. Please update your payment method.",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3), // 3 hours ago
        read: false,
        type: "error",
      },
    ],
  );

  // Handlers for notification actions
  const handleMarkAsRead = (id: string) => {
    setNotifications(
      notifications.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification,
      ),
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications(
      notifications.map((notification) => ({ ...notification, read: true })),
    );
  };

  const handleDismiss = (id: string) => {
    setNotifications(
      notifications.filter((notification) => notification.id !== id),
    );
  };

  const handleClearAll = () => {
    setNotifications([]);
  };

  // Handlers for product actions
  const handleAddToCart = (productId: string) => {
    console.log(`Added product ${productId} to cart`);
    // In a real app, this would add the product to the cart
    // and potentially show a toast notification
  };

  const handleAddToWishlist = (productId: string) => {
    console.log(`Added product ${productId} to wishlist`);
    // In a real app, this would add the product to the wishlist
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="container px-4 py-8 md:px-6">
          <div className="mb-8 flex items-center justify-between">
            <h1 className="text-3xl font-bold">Component Showcase</h1>
            <div className="flex items-center gap-4">
              <NotificationCenter
                notifications={notifications}
                onMarkAsRead={handleMarkAsRead}
                onMarkAllAsRead={handleMarkAllAsRead}
                onDismiss={handleDismiss}
                onClearAll={handleClearAll}
              />
              <Link href="/">
                <Button variant="outline">Back to Home</Button>
              </Link>
            </div>
          </div>

          <section className="mb-12">
            <h2 className="mb-6 text-2xl font-semibold">Product Cards</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={handleAddToCart}
                  onAddToWishlist={handleAddToWishlist}
                />
              ))}
            </div>
          </section>

          <Separator className="my-12" />

          <section className="mb-12">
            <h2 className="mb-6 text-2xl font-semibold">
              Testimonial Carousel
            </h2>
            <TestimonialCarousel testimonials={testimonials} />
          </section>

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
      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © {new Date().getFullYear()} Relivator. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
