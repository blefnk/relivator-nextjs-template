import { IUser } from "./src/data/routers/handlers/users";

type JwtPayload = {
  userId?: IUser["id"];
};

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    userId?: IUser["id"];
  }
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT extends JwtPayload {
    [k in JwtPayload]: JwtPayload[k];
  }
}
