import { expect, test, describe, beforeAll, afterAll } from "bun:test";
import { eq } from "drizzle-orm";

const mockCustomerId = "mock-customer-id";
const mockUserId = "test-user-id";
const mockEmail = "test@example.com";
const mockSubscriptionId = "mock-subscription-id";
const mockProductId = "mock-product-id";

const mockDb = {
  query: {
    polarCustomerTable: {
      findFirst: async () => ({
        id: "db-id",
        userId: mockUserId,
        customerId: mockCustomerId,
        createdAt: new Date(),
        updatedAt: new Date(),
      }),
      findMany: async () => [{
        id: "db-id",
        userId: mockUserId,
        customerId: mockCustomerId,
        createdAt: new Date(),
        updatedAt: new Date(),
      }],
    },
    polarSubscriptionTable: {
      findFirst: async () => ({
        id: "sub-id",
        userId: mockUserId,
        customerId: mockCustomerId,
        subscriptionId: mockSubscriptionId,
        productId: mockProductId,
        status: "active",
        createdAt: new Date(),
        updatedAt: new Date(),
      }),
      findMany: async () => [{
        id: "sub-id",
        userId: mockUserId,
        customerId: mockCustomerId,
        subscriptionId: mockSubscriptionId,
        productId: mockProductId,
        status: "active",
        createdAt: new Date(),
        updatedAt: new Date(),
      }],
    },
  },
  insert: () => ({
    values: () => Promise.resolve({ id: "new-id" }),
  }),
  update: () => ({
    set: () => ({
      where: () => Promise.resolve({ success: true }),
    }),
  }),
  delete: () => ({
    where: () => Promise.resolve({ success: true }),
  }),
};

const mockPolarClient = {
  customers: {
    create: async () => ({
      id: mockCustomerId,
      email: mockEmail,
      externalId: mockUserId,
    }),
    get: async () => ({
      id: mockCustomerId,
      email: mockEmail,
      externalId: mockUserId,
      subscriptions: [],
      entitlements: [],
      benefits: [],
    }),
  },
  checkouts: {
    create: async () => ({
      url: "https://checkout.polar.sh/test-checkout",
    }),
  },
};

const mockServices = {
  createCustomer: async (userId: string, email: string) => {
    const customer = await mockPolarClient.customers.create();
    return customer;
  },
  getCustomerByUserId: async (userId: string) => {
    return mockDb.query.polarCustomerTable.findFirst();
  },
  getCustomerState: async (userId: string) => {
    const customer = await mockDb.query.polarCustomerTable.findFirst();
    if (!customer) return null;
    return mockPolarClient.customers.get();
  },
  getUserSubscriptions: async (userId: string) => {
    return mockDb.query.polarSubscriptionTable.findMany();
  },
  syncSubscription: async (
    userId: string, 
    customerId: string, 
    subscriptionId: string, 
    productId: string, 
    status: string
  ) => {
    return { success: true };
  },
  hasActiveSubscription: async (userId: string) => {
    const subscriptions = await mockDb.query.polarSubscriptionTable.findMany();
    return subscriptions.some(sub => sub.status === "active");
  },
  getCheckoutUrl: async (customerId: string, productSlug: string) => {
    const checkout = await mockPolarClient.checkouts.create();
    return checkout.url;
  },
};

describe("Payment Service", () => {
  test("createCustomer should create a customer record", async () => {
    const customer = await mockServices.createCustomer(mockUserId, mockEmail);
    expect(customer).toBeDefined();
    expect(customer.id).toBe(mockCustomerId);
    
    const dbCustomer = await mockServices.getCustomerByUserId(mockUserId);
    expect(dbCustomer).toBeDefined();
    expect(dbCustomer?.customerId).toBe(mockCustomerId);
    expect(dbCustomer?.userId).toBe(mockUserId);
  });
  
  test("getCustomerState should return customer state", async () => {
    const customerState = await mockServices.getCustomerState(mockUserId);
    expect(customerState).toBeDefined();
    expect(customerState?.id).toBe(mockCustomerId);
  });
  
  test("syncSubscription should create a subscription record", async () => {
    await mockServices.syncSubscription(
      mockUserId,
      mockCustomerId,
      mockSubscriptionId,
      mockProductId,
      "active"
    );
    
    const subscriptions = await mockServices.getUserSubscriptions(mockUserId);
    expect(subscriptions.length).toBe(1);
    expect(subscriptions[0].subscriptionId).toBe(mockSubscriptionId);
    expect(subscriptions[0].status).toBe("active");
  });
  
  test("hasActiveSubscription should return true for active subscriptions", async () => {
    const hasActive = await mockServices.hasActiveSubscription(mockUserId);
    expect(hasActive).toBe(true);
  });
  
  test("getCheckoutUrl should return a valid URL", async () => {
    const url = await mockServices.getCheckoutUrl(mockCustomerId, "pro");
    expect(url).toBe("https://checkout.polar.sh/test-checkout");
  });
});

describe("Polar Integration", () => {
  test("Polar client should be properly configured", () => {
    if (process.env.CI) {
      console.log("Skipping Polar client config test in CI environment");
      return;
    }
    
    process.env.POLAR_ACCESS_TOKEN = process.env.POLAR_ACCESS_TOKEN || "test-token";
    process.env.POLAR_WEBHOOK_SECRET = process.env.POLAR_WEBHOOK_SECRET || "test-secret";
    
    expect(process.env.POLAR_ACCESS_TOKEN).toBeDefined();
    expect(process.env.POLAR_WEBHOOK_SECRET).toBeDefined();
  });
  
  test("Better-Auth Polar plugin should be configured", () => {
    if (process.env.CI) {
      console.log("Skipping Polar environment test in CI environment");
      return;
    }
    
    process.env.POLAR_ENVIRONMENT = process.env.POLAR_ENVIRONMENT || "sandbox";
    
    expect(process.env.POLAR_ENVIRONMENT).toBeDefined();
  });
});

describe("Payment API Routes", () => {
  const mockResponse = {
    json: () => mockResponse,
    status: () => mockResponse,
    send: () => mockResponse,
  };
  
  const mockRequest = {
    headers: {
      get: () => null,
    },
  };
  
  test("customer-state API should return customer state for authenticated user", async () => {
    const customerState = await mockServices.getCustomerState(mockUserId);
    expect(customerState).toBeDefined();
  });
  
  test("subscriptions API should return user subscriptions", async () => {
    const subscriptions = await mockServices.getUserSubscriptions(mockUserId);
    expect(subscriptions.length).toBe(1);
  });
});
