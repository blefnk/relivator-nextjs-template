import { Polar } from "@polar-sh/sdk";
import { v4 as uuidv4 } from "uuid";

const polarClient = new Polar({
  accessToken: process.env.POLAR_ACCESS_TOKEN,
  server: (process.env.POLAR_ENVIRONMENT as "production" | "sandbox") || "production",
});

// Mock arrays to store customers and subscriptions
const mockCustomers: any[] = [];
const mockSubscriptions: any[] = [];

/**
 * Create a new customer and save reference (Mocked)
 */
export async function createCustomer(userId: string, email: string, name?: string) {
  try {
    // Attempt Polar API if available
    let customerId = uuidv4();
    if (process.env.POLAR_ACCESS_TOKEN) {
      const customer = await polarClient.customers.create({
        email,
        externalId: userId,
        name: name || email,
      });
      customerId = customer.id;
    }

    const newCustomer = {
      createdAt: new Date(),
      customerId,
      id: uuidv4(),
      updatedAt: new Date(),
      userId,
    };
    
    mockCustomers.push(newCustomer);
    return { email, id: customerId, name: name || email };
  } catch (error) {
    console.error("Error creating customer (Mocked):", error);
    throw error;
  }
}

/**
 * Get checkout URL for a specific product
 */
export async function getCheckoutUrl(customerId: string, productSlug: string): Promise<null | string> {
  try {
    if (!process.env.POLAR_ACCESS_TOKEN) return "https://mock-checkout-url.com";
    
    const checkout = await polarClient.checkouts.create({
      customerId,
      products: [productSlug],
    });
    return checkout.url;
  } catch (error) {
    console.error("Error generating checkout URL (Mocked):", error);
    return "https://mock-checkout-url.com";
  }
}

/**
 * Get a Polar customer by user ID (Mocked)
 */
export async function getCustomerByUserId(userId: string) {
  const customer = mockCustomers.find(c => c.userId === userId);
  return customer || null;
}

/**
 * Get customer state from Polar API (Mocked by returning static state or using polarClient directly)
 */
export async function getCustomerState(userId: string) {
  const customer = await getCustomerByUserId(userId);
  
  if (!customer) {
    return null;
  }

  try {
    const customerState = await polarClient.customers.get({ id: customer.customerId });
    return customerState;
  } catch (error) {
    console.error("Error fetching customer state (Mocked):", error);
    // Return a mock state if polarClient fails due to missing keys
    return { email: "mockuser@example.com", id: customer.customerId };
  }
}

/**
 * Get all subscriptions for a user (Mocked)
 */
export async function getUserSubscriptions(userId: string) {
  return mockSubscriptions.filter(s => s.userId === userId);
}

/**
 * Check if a user has an active subscription (Mocked)
 */
export async function hasActiveSubscription(userId: string): Promise<boolean> {
  const subscriptions = await getUserSubscriptions(userId);
  return subscriptions.some(sub => sub.status === "active");
}

/**
 * Sync subscription data (Mocked)
 */
export async function syncSubscription(
  userId: string,
  customerId: string,
  subscriptionId: string,
  productId: string,
  status: string,
) {
  try {
    const existingIndex = mockSubscriptions.findIndex(s => s.subscriptionId === subscriptionId);

    if (existingIndex !== -1) {
      mockSubscriptions[existingIndex] = {
        ...mockSubscriptions[existingIndex],
        status,
        updatedAt: new Date(),
      };
      return mockSubscriptions[existingIndex];
    }

    const newSubscription = {
      createdAt: new Date(),
      customerId,
      id: uuidv4(),
      productId,
      status,
      subscriptionId,
      updatedAt: new Date(),
      userId,
    };

    mockSubscriptions.push(newSubscription);
    return newSubscription;
  } catch (error) {
    console.error("Error syncing subscription (Mocked):", error);
    throw error;
  }
}
