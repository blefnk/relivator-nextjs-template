"use client";

import React, { useState } from "react";
import { revalidatePath } from "next/cache";
import { zodResolver } from "@hookform/resolvers/zod";
import { setCookie } from "cookies-next";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { contactConfig } from "~/app";
import { Button } from "~/islands/primitives/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/islands/primitives/form";
import { Input } from "~/islands/primitives/input";
import { Textarea } from "~/islands/primitives/textarea";

interface AddToCartGuestFormProps {
  onEmailSubmit: (email: string) => void;
}

const AddToCartGuestForm: React.FC<AddToCartGuestFormProps> = ({
  onEmailSubmit,
}) => {
  const [email, setEmail] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // todo: Add validation for email
    setCookie("GUEST_EMAIL", email);
    onEmailSubmit(email);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <label htmlFor="guest-email" className="text-sm font-medium">
        Enter your email:
      </label>
      <input
        id="guest-email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="rounded-lg border border-gray-300 px-3 py-2"
        placeholder="guest@example.com"
        required
      />
      <button
        type="submit"
        className="mt-2 rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
      >
        Submit
      </button>
    </form>
  );
};

export default AddToCartGuestForm;
