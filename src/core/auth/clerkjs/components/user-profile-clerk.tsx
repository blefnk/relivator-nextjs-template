"use client";

import type { Theme } from "@clerk/types";

import { UserProfile as ClerkUserProfile } from "@clerk/nextjs";
import { dark, neobrutalism } from "@clerk/themes";
import { useTheme } from "next-themes";

const appearance: Theme = {
  baseTheme: undefined,
  elements: {
    card: "shadow-none",
    headerSubtitle: "hidden",
    headerTitle: "hidden",
    navbar: "hidden",
    navbarMobileMenuButton: "hidden",
  },
  variables: {
    borderRadius: "0.25rem",
  },
};

export function UserProfileClerk() {
  const { resolvedTheme, theme } = useTheme();

  // Determine the base theme based on the current theme or system pref
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
        baseTheme,
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
