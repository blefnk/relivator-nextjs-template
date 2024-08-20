import type { userPrivateMetadataSchema } from "@/actions/reliverse/validations/auth";
import type { HandleOAuthCallbackParams } from "@clerk/types";
import type { z } from "zod";

// TODO: Implement
// @see https://fusejs.org/
// type UserSource = {
//   avatar_url: string;
//   id: string;
//   name: string;
// };
export type SSOCallbackPageProps = {
  searchParams: HandleOAuthCallbackParams;
};

// User-Related Types
// export type PlanProps = "enterprise" | "professional" | "starter";
// export type UserProps = {
//   id: string;
//   name?: string;
//   email?: string;
//   image?: string;
//   plan: PlanProps;
//   createdAt?: Date;
//   stripeId?: string;
//   usage?: number; // how many stores the user has created
//   usageLimit?: number; // how many stores the user can create
//   billingCycleStart?: number;
//   stores?: { storeId: string }[];
//   role?: "admin" | "seller" | "buyer";
// };
// export type SellerProps = {
//   createdAt?: Date;
//   domains?: { slug: string }[];
//   id: string;
//   logo?: string;
//   name?: string;
//   slug?: string;
//   users?: { role: "admin" | "buyer" | "seller" }[];
// };
export type UserRole = z.infer<typeof userPrivateMetadataSchema.shape.role>;

// "Nodes" are the core abstraction of Fuse.js. Each node represents
// a resource/entity with multiple fields and has to define two things:
// 1. load(): How to fetch from the underlying data source
// 2. fields: What fields should be exposed and added for clients
// export const UserNode = node<UserSource>({
// name: "User",
// load: async (ids) => getUsers(ids),
// fields: (t) => ({
// name: t.exposeString("name"),
// rename to camel-case
// avatarUrl: t.exposeString("avatar_url"),
// Add an additional firstName field
// firstName: t.string({
// resolve: (user) => user.name.split(" ")[0],
// }),
// }),
// });
// Fake function to fetch users. In real applications, this would
// talk to an underlying REST API/gRPC service/third-party API/…
// export async function getUsers(ids: string[]): Promise<UserSource[]> {
// return ids.map((id) => ({
// id,
// name: `Peter #${id}`,
// avatar_url: `https://i.pravatar.cc/300?u=${id}`,
// }));
// }
