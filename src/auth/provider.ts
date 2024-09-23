export { authProvider } from "~/../reliverse.config";

// ===================================================
// TODO: try this
// import { authProvider } from "~/../reliverse.config";
// import { auth } from "~/auth/authjs";
// import { clerk } from "~/auth/clerk";
// export async function getUser() {
//     return authProvider === "clerk" ? await clerk() : await auth();
// }

// ===================================================
//
// ?| CURRENT USAGE:
// const user = authProvider === "clerk" ? await clerk() : await auth();
//
// TODO USAGE:
// const user = await auth();
//
// ===================================================
//
// TODO: shared re-export doesn't work unfortunately
// eslint-disable-next-line @stylistic/max-len
// error: 'server-only' cannot be imported from a Client Component module. It should only be used from a Server Component.
//
// import { authProvider } from "~/auth/provider";
// import type { User } from "~/db/schema";
// import { authjs } from "~/auth/authjs";
// import { clerk } from "~/auth/clerk";
// export async function auth(): Promise<User> {
//   return authjs();
// }
//
// ===================================================
