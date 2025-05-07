import type { MediaUpload } from "~/db/schema/uploads/types";
import type { User } from "~/db/schema/users/types";

// The shape of the data expected by the table
// Includes user details and their uploads
export type UserWithUploads = User & {
  uploads: MediaUpload[];
};
