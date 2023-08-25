"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { type z } from "zod";

import { updateEmailPreferencesAction } from "~/utils/server/actions/email";
import { catchClerkError } from "~/utils/server/utils";
import { type EmailPreference } from "~/data/db/schema";
import { updateEmailPreferencesSchema } from "~/data/zod/email";
import { Icons } from "~/islands/icons";
import { Button } from "~/islands/primitives/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "~/islands/primitives/form";
import { Switch } from "~/islands/primitives/switch";

interface UpdateEmailPreferencesFormProps {
  emailPreference: EmailPreference;
}

type Inputs = z.infer<typeof updateEmailPreferencesSchema>;

export function UpdateEmailPreferencesForm({
  emailPreference
}: UpdateEmailPreferencesFormProps) {
  const [isPending, startTransition] = React.useTransition();

  // react-hook-form
  const form = useForm<Inputs>({
    resolver: zodResolver(updateEmailPreferencesSchema),
    defaultValues: {
      token: emailPreference.token,
      newsletter: emailPreference.newsletter,
      transactional: emailPreference.transactional,
      marketing: emailPreference.marketing
    }
  });

  function onSubmit(data: Inputs) {
    console.log(data);
    startTransition(async () => {
      try {
        await updateEmailPreferencesAction({
          token: data.token,
          newsletter: data.newsletter,
          transactional: data.transactional,
          marketing: data.marketing
        });
        toast.success("Email preferences updated.");
      } catch (err) {
        catchClerkError(err);
      }
    });
  }

  return (
    <Form {...form}>
      <form
        className="grid w-full gap-4"
        onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
      >
        <FormField
          control={form.control}
          name="newsletter"
          render={({ field }) => (
            <FormItem className="flex w-full flex-row items-center justify-between space-x-2 rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Newsletter</FormLabel>
                <FormDescription>
                  Receive our monthly newsletter with the latest news and
                  updates.
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="transactional"
          render={({ field }) => (
            <FormItem className="flex w-full flex-row items-center justify-between space-x-2 rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Transactional</FormLabel>
                <FormDescription>
                  Receive transactional emails, order confirmations, and more.
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="marketing"
          render={({ field }) => (
            <FormItem className="flex w-full flex-row items-center justify-between space-x-2 rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Marketing</FormLabel>
                <FormDescription>
                  Receive marketing emails, including promotions, discounts, and
                  more.
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full" disabled={isPending}>
          {isPending && (
            <Icons.spinner
              className="mr-2 h-4 w-4 animate-spin"
              aria-hidden="true"
            />
          )}
          Save preferences
          <span className="sr-only">Save preferences</span>
        </Button>
      </form>
    </Form>
  );
}
