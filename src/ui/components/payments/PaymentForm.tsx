"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "~/ui/primitives/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/ui/primitives/card";
import { Alert, AlertDescription, AlertTitle } from "~/ui/primitives/alert";

interface PaymentFormProps {
  productSlug?: string;
  productId?: string;
  buttonText?: string;
  title?: string;
  description?: string;
  onSuccess?: () => void;
}

export function PaymentForm({
  productSlug = "pro",
  productId,
  buttonText = "Subscribe",
  title = "Upgrade to Pro",
  description = "Get access to all premium features and support the project.",
  onSuccess,
}: PaymentFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCheckout = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      let url = "/auth/checkout";
      
      if (productSlug) {
        url += `/${productSlug}`;
      } else if (productId) {
        url += `?productId=${productId}`;
      }
      
      router.push(url);
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error("Error initiating checkout:", error);
      setError("Failed to initiate checkout. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
      </CardContent>
      <CardFooter>
        <Button 
          onClick={handleCheckout} 
          disabled={isLoading}
          className="w-full"
        >
          {isLoading ? "Loading..." : buttonText}
        </Button>
      </CardFooter>
    </Card>
  );
}
