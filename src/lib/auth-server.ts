import { APIError } from "better-auth/api";
import { auth } from "~/lib/auth";

/**
 * Server-side sign in with email and password
 */
export async function serverSignInEmail(email: string, password: string) {
  try {
    return await auth.api.signInEmail({
      body: {
        email,
        password,
      },
    });
  } catch (error) {
    if (error instanceof APIError) {
      throw new Error(`Authentication failed: ${error.message}`);
    }
    throw error;
  }
}

/**
 * Server-side sign up with email and password
 */
export async function serverSignUpEmail(userData: {
  email: string;
  password: string;
  name: string;
  firstName?: string;
  lastName?: string;
  age?: number;
}) {
  try {
    return await auth.api.signUpEmail({
      body: userData,
    });
  } catch (error) {
    if (error instanceof APIError) {
      throw new Error(`Registration failed: ${error.message}`);
    }
    throw error;
  }
}
