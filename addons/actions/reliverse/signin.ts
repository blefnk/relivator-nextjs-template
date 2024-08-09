import { signIn, signOut } from "next-auth/react";

export async function signInAction() {
  await signIn();
}

export async function signOutAction() {
  await signOut();
}
