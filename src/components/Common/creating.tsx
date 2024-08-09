"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Reliverse CMS v0.4.0 - Page Creation API
// ========================================
// @see https://github.com/blefnk/reliverse
import { useState } from "react";
import type { ChangeEvent } from "react";

import consola from "consola";
import { isDevelopment } from "std-env";

type CreatingProps = {
  type: "component" | "page";
};

export default function Creating({ type }: CreatingProps) {
  const [title, setTitle] = useState("");

  const handleInputChange = (event_: ChangeEvent<HTMLInputElement>) => {
    const { value } = event_.target;

    // Trim and allow only letters, numbers, and spaces
    const trimmedValue = value.trimStart().replace(/[^\d a-z]/gi, "");

    // Check if the first character is a number
    if (trimmedValue.length > 0 && trimmedValue.startsWith("d")) {
      consola.error("Title cannot start with a number.");

      return;
    }

    // Update the title state
    setTitle(trimmedValue);
  };

  const handleSubmit = () => {
    if (!isDevelopment) {
      consola.error(
        `${
          type.charAt(0).toUpperCase() + type.slice(1)
        } creation is only available in development mode.`,
      );

      return;
    }

    // Trim and validate the title
    const trimmedTitle = title.trim();

    if (!trimmedTitle || trimmedTitle.length < 2) {
      consola.error("Please specify a valid title.");
    }

    // TODO: Add logic here for creating the component or page
    // Example: Replace spaces with hyphens and convert to lowercase for the file name
    // Convert title to PascalCase for the function name
  };

  return (
    <div>
      <Input
        onChange={handleInputChange}
        placeholder={`Enter ${type} title`}
        type="text"
        value={title}
      />
      {isDevelopment && (
        <Button className="mt-4" onClick={handleSubmit} variant="secondary">
          Create {type.charAt(0).toUpperCase() + type.slice(1)}
        </Button>
      )}
    </div>
  );
}
