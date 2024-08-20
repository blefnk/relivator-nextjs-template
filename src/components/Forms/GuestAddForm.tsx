"use client";

import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { setCookie } from "cookies-next";
import { useTranslations } from "next-intl";
import * as z from "zod";

import { useGuestEmailSubmit } from "~/components/Forms/Context/GuestAddFormContext";

const guestEmailSchema = z.object({
  email: z.string().min(1).email({
    message: "Invalid email address",
  }),
});

export function GuestAddForm() {
  const t = useTranslations();

  const { onEmailSubmit } = useGuestEmailSubmit();

  const form = useForm<z.infer<typeof guestEmailSchema>>({
    defaultValues: {
      email: "",
    },
    resolver: zodResolver(guestEmailSchema),
  });

  const onSubmit = (values: z.infer<typeof guestEmailSchema>) => {
    setCookie("GUEST_EMAIL", values.email);
    onEmailSubmit(values.email);
  };

  return (
    <Form {...form}>
      <form
        className="w-full space-y-4 py-8"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("GuestAddForm.email")}</FormLabel>
              <FormControl>
                <Input placeholder="Enter the email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full" type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
}
