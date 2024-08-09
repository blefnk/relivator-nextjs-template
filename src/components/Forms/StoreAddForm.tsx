"use client";

import { useTransition } from "react";
import { useForm } from "react-hook-form";

import type { z } from "zod";

import { addStoreAction } from "@/actions/reliverse/store";
import { storeSchema } from "@/actions/reliverse/validations/store";
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
import { Textarea } from "@/components/ui/text-area";
import { catchError } from "@/server/reliverse/errors/helpers/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import consola from "consola";

import { Icons } from "~/components/Common/Icons";

type AddStoreFormProps = {
  userId: string;
};

type Inputs = z.infer<typeof storeSchema>;

export default function AddStoreForm({ userId }: AddStoreFormProps) {
  const [isPending, startTransition] = useTransition();

  // react-hook-form
  const form = useForm<Inputs>({
    defaultValues: {
      name: "",
      description: "",
    },
    resolver: zodResolver(storeSchema),
  });

  function onSubmit(data: Inputs) {
    startTransition(async () => {
      try {
        const addRes = await addStoreAction({
          ...data,
          userId,
        });

        if (addRes && addRes.status === "error") {
          consola.error(addRes.message);
        }

        consola.success(`Store '${data.name}' created successfully.`);

        // Stop further execution

        return;

        // Workaround for the inconsistency of cache revalidation
      } catch (error) {
        catchError(error);
      }
    });
  }

  return (
    <Form {...form}>
      <form
        className="grid w-full max-w-xl gap-5"
        onSubmit={(...arguments_) =>
          void form.handleSubmit(onSubmit)(...arguments_)
        }
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Type store name here." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Type store description here."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-fit" disabled={isPending}>
          {isPending && (
            <Icons.spinner
              aria-hidden="true"
              className="mr-2 size-4 animate-spin"
            />
          )}
          Add Store
          <span className="sr-only">Add Store</span>
        </Button>
      </form>
    </Form>
  );
}
