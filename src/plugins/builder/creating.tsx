/**
 * Reliverse CMS v0.3.0 - Page Creation API
 * ========================================
 *
 * @see https://github.com/blefnk/reliverse
 */

"use client";

import React, { useState } from "react";
import { isDevEnv } from "~/utils";
import toast from "react-hot-toast";

import { Button } from "~/islands/primitives/button";
import { Input } from "~/islands/primitives/input";

interface ApiResponse {
  message: string;
}

interface CreatingProps {
  type: "page" | "component";
}

export default function Creating({ type }: CreatingProps) {
  const [title, setTitle] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Trim and allow only letters, numbers, and spaces
    const trimmedValue = value.trimStart().replace(/[^a-zA-Z0-9 ]/g, "");

    // Check if the first character is a number
    if (trimmedValue.length > 0 && /^\d/.test(trimmedValue)) {
      toast.error("Title cannot start with a number.");
      return; // Prevent updating the title state
    }

    setTitle(trimmedValue);
  };

  const handleSubmit = async () => {
    if (!isDevEnv()) {
      toast.error(
        `${
          type.charAt(0).toUpperCase() + type.slice(1)
        } creation is only available in development mode.`,
      );
      return;
    }

    // Trim and validate the title
    const trimmedTitle = title.trim();
    if (!trimmedTitle || trimmedTitle.length < 2) {
      toast.error("Please specify a valid title.");
      return;
    }

    // Replace spaces with hyphens and convert to lowercase for the file name
    const formattedTitle = trimmedTitle.toLowerCase().replace(/\s+/g, "-");

    // Convert title to PascalCase for the function name
    const functionName = trimmedTitle
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join("");

    const apiEndpoint =
      type === "page" ?
        "/api/cms/create/page/route"
      : "/api/cms/create/island/route";

    const response = await fetch(apiEndpoint, {
      body: JSON.stringify({ title: formattedTitle, functionName }),
      headers: { "Content-Type": "application/json" },
      method: "POST",
    });

    const data = (await response.json()) as ApiResponse;

    // Check the response status
    if (response.ok) {
      // If a page was created, add a link to the toast message
      if (type === "page") {
        const pageUrl = `/${formattedTitle}`;
        const successMessagePage = `${
          type.charAt(0).toUpperCase() + type.slice(1)
        } created successfully! Click to check it out.`;

        toast(
          (t) => (
            <span>
              {/* biome-ignore lint/a11y/useValidAnchor: <explanation> */}
              <a href={pageUrl} onClick={() => toast.dismiss(t.id)}>
                {successMessagePage}
              </a>
            </span>
          ),
          {
            duration: 8000,
            style: {
              cursor: "pointer",
            },
          },
        );
      } else {
        // For non-page types
        toast.success(
          `${
            type.charAt(0).toUpperCase() + type.slice(1)
          } created successfully!`,
        );
      }
    } else {
      // If there was an error, show an error toast with the message from the server
      toast.error(data.message || "An error occurred while creating.");
    }

    console.log(data.message);
  };

  return (
    <div>
      <Input
        type="text"
        value={title}
        onChange={handleInputChange}
        placeholder={`Enter ${type} title`}
      />
      {isDevEnv() && (
        <Button onClick={handleSubmit} className="mt-4" variant="secondary">
          Create {type.charAt(0).toUpperCase() + type.slice(1)}
        </Button>
      )}
    </div>
  );
}
