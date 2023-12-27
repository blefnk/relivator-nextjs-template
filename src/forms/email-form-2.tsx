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

const guestEmailSchema = z.object({
  email: z
    .string()
    .email({ message: "Invalid email address" })
    .nonempty({ message: "Email is required" }),
});

export default function AddToCartGuestForm({
  onEmailSubmit,
}: {
  onEmailSubmit: (email: string) => void;
}) {
  const form = useForm<z.infer<typeof guestEmailSchema>>({
    resolver: zodResolver(guestEmailSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (values: z.infer<typeof guestEmailSchema>) => {
    setCookie("GUEST_EMAIL", values.email);
    onEmailSubmit(values.email);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full space-y-4 py-8"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Enter your email" {...field} />
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
