"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import type { User } from "~/db/schema/users/types";
import type { PolarSubscription } from "~/db/schema/payments/types";

import { PaymentForm } from "~/ui/components/payments/PaymentForm";
import { Button } from "~/ui/primitives/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/ui/primitives/card";
import { Alert, AlertDescription, AlertTitle } from "~/ui/primitives/alert";
import { Skeleton } from "~/ui/primitives/skeleton";
import { Badge } from "~/ui/primitives/badge";

interface SubscriptionsResponse {
  subscriptions: PolarSubscription[];
}

interface CustomerStateResponse {
  id: string;
  email: string;
  subscriptions: any[];
  [key: string]: any;
}

interface BillingPageClientProps {
  user: User | null;
}

export function BillingPageClient({ user }: BillingPageClientProps) {
  const router = useRouter();
  const [subscriptions, setSubscriptions] = useState<PolarSubscription[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [customerState, setCustomerState] = useState<any | null>(null);

  useEffect(() => {
    if (!user) {
      router.push("/auth/sign-in");
      return;
    }

    const fetchSubscriptions = async () => {
      try {
        const response = await fetch("/api/payments/subscriptions");
        if (!response.ok) {
          throw new Error("Failed to fetch subscriptions");
        }
        const data = await response.json() as SubscriptionsResponse;
        setSubscriptions(data.subscriptions || []);
      } catch (err) {
        console.error("Error fetching subscriptions:", err);
        setError("Failed to load subscription data. Please try again.");
      }
    };

    const fetchCustomerState = async () => {
      try {
        const response = await fetch("/api/payments/customer-state");
        if (response.ok) {
          const data = await response.json() as CustomerStateResponse;
          setCustomerState(data);
        }
      } catch (err) {
        console.error("Error fetching customer state:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSubscriptions();
    fetchCustomerState();
  }, [user, router]);

  const hasActiveSubscription = subscriptions.some(sub => sub.status === "active");

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const checkoutSuccess = urlParams.get("checkout_success");
    
    if (checkoutSuccess === "true") {
      const newUrl = window.location.pathname;
      window.history.replaceState({}, document.title, newUrl);
      
      router.refresh();
    }
  }, [router]);

  if (loading) {
    return (
      <div className="container mx-auto py-10">
        <h1 className="text-3xl font-bold mb-6">Billing</h1>
        <Card>
          <CardHeader>
            <Skeleton className="h-8 w-1/3" />
            <Skeleton className="h-4 w-2/3" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-20 w-full" />
          </CardContent>
          <CardFooter>
            <Skeleton className="h-10 w-full" />
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Billing</h1>
      
      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Subscription Status */}
      <div className="grid gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Subscription Status</CardTitle>
            <CardDescription>
              Your current subscription plan and status
            </CardDescription>
          </CardHeader>
          <CardContent>
            {subscriptions.length > 0 ? (
              <div className="space-y-4">
                {subscriptions.map((subscription) => (
                  <div key={subscription.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-medium">{subscription.productId}</h3>
                      <p className="text-sm text-muted-foreground">
                        ID: {subscription.subscriptionId}
                      </p>
                    </div>
                    <Badge variant={subscription.status === "active" ? "default" : "outline"}>
                      {subscription.status}
                    </Badge>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">You don't have any active subscriptions.</p>
            )}
          </CardContent>
          <CardFooter>
            {hasActiveSubscription && (
              <Button variant="outline" onClick={() => router.push("/auth/customer-portal")}>
                Manage Subscription
              </Button>
            )}
          </CardFooter>
        </Card>
      </div>

      {/* Payment Plans */}
      {!hasActiveSubscription && (
        <div className="grid gap-6 md:grid-cols-2">
          <PaymentForm 
            productSlug="pro" 
            title="Pro Plan"
            description="Get access to all premium features and priority support."
            buttonText="Subscribe to Pro"
          />
          <PaymentForm 
            productSlug="premium" 
            title="Premium Plan"
            description="Everything in Pro plus exclusive content and early access to new features."
            buttonText="Subscribe to Premium"
          />
        </div>
      )}
    </div>
  );
}
