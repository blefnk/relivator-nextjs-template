"use client";

import { UserProfile as ClerkUserProfile } from "@clerk/nextjs";
import { dark, neobrutalism, shadesOfPurple } from "@clerk/themes";
import { type Theme } from "@clerk/types";
import { useTheme } from "next-themes";

const appearance: Theme = {
  baseTheme: undefined,
  variables: {
    borderRadius: "0.25rem",
  },
  elements: {
    card: "shadow-none",
    navbar: "hidden",
    navbarMobileMenuButton: "hidden",
    headerTitle: "hidden",
    headerSubtitle: "hidden",
  },
};

export function UserProfileClerk() {
  const { theme, resolvedTheme } = useTheme();

  // Determine the base theme based on the current theme or system preference
  const baseTheme =
    theme === "light"
      ? neobrutalism
      : theme === "dark"
      ? dark
      : theme === "system"
      ? resolvedTheme === "dark"
        ? dark
        : neobrutalism
      : appearance.baseTheme;

  return (
    <ClerkUserProfile
      appearance={{
        ...appearance,
        baseTheme: baseTheme,
        variables: {
          ...appearance.variables,
          colorBackground:
            theme === "light" ||
            (theme === "system" && resolvedTheme === "light")
              ? "#fafafa"
              : undefined,
        },
      }}
    />
  );
}
