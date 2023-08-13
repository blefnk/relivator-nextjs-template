// lucia.d.ts
/// <reference types="lucia-auth" />
declare namespace Lucia {
  type Auth =
    import("~/utils/server/auth/authentication/src/lib/authentication.ts").Auth;
  type UserAttributes = {
    email: string;
    email_verified?: Date | null;
    name?: string;
    image?: string;
    active_team_id?: number;
    created_at?: string;
  };
}
