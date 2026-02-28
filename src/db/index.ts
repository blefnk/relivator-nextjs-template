import "dotenv/config";

// Mock Database connection instance to prevent import errors in other files
// that we haven't updated yet.
export const conn = {};

// We expose a dummy db object with methods that might be called.
// We will replace actual calls to `db` in queries with arrays.
export const db = {
  delete: () => ({ where: async () => ({}) }),
  insert: () => ({ values: async () => ({}) }),
  query: {
    polarCustomerTable: {
      findFirst: async () => null,
      findMany: async () => [],
    },
    polarSubscriptionTable: {
      findFirst: async () => null,
      findMany: async () => [],
    },
    uploadsTable: {
      findFirst: async () => null,
      findMany: async () => [],
    },
    userTable: {
      findFirst: async () => null,
      findMany: async () => [],
    }
  },
  select: () => ({ from: () => ({ where: () => ({ orderBy: async () => [] }) }) }),
  update: () => ({ set: () => ({ where: async () => ({}) }) }),
};

export default db;
