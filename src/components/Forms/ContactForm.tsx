"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/text-area";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import * as z from "zod";

import { siteConfig } from "~/app";

const formSchema = z.object({
  msg: z.string().min(1, {
    message: "Message is required",
  }),
  subject: z.string().min(1, {
    message: "Subject is required",
  }),
});

type ContactFormProps = {
  tSubmit: string;
};

export function ContactForm({ tSubmit }: ContactFormProps) {
  const t = useTranslations();

  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      msg: "",
      subject: "",
    },
    resolver: zodResolver(formSchema),
  });

  const [mailtoLink, setMailtoLink] = useState("");

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const link = `mailto:${siteConfig.author.email}?subject=${values.subject}&body=${values.msg}`;

    setMailtoLink(link);
  };

  useEffect(() => {
    if (mailtoLink) {
      window.location.href = mailtoLink;
      form.reset();
    }
  }, [mailtoLink]);

  return (
    <Form {...form}>
      <form
        className={`
          w-full space-y-4 py-8

          sm:w-96
        `}
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("ContactForm.subject")}</FormLabel>
              <FormControl>
                <Input placeholder="Enter the subject" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="msg"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("ContactForm.message")}</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter the message" {...field} />
              </FormControl>
              <FormDescription>
                the message will be sent through email
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div />
        <Button className="w-full" type="submit">
          {tSubmit}
        </Button>
      </form>
    </Form>
  );
}
