"use client";

import type { z } from "zod";

import { useState } from "react";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { Send } from "lucide-react";
import { useTranslations } from "next-intl";
import { ofetch } from "ofetch";
import { randomUUID } from "uncrypto";

import { config } from "@reliverse/core";
import { SpinnerSVG } from "~/components/Common/Icons/SVG";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { ToastAction } from "~/components/ui/toast";
import { useToast } from "~/hooks/use-toast";
import { emailSchema } from "~/server/validations/deprecated/notification";

type Inputs = z.infer<typeof emailSchema>;

export function JoinNewsletterForm() {
  const t = useTranslations();

  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<Inputs>({
    defaultValues: {
      email: "",
    },
    resolver: zodResolver(emailSchema),
  });

  async function onSubmit(data: Inputs) {
    setLoading(true);
    try {
      const response = await ofetch("/api/mail/subscribe", {
        body: JSON.stringify({
          email: data.email,
          subject: `Nazar Kornienko: Welcome to ${config.engine.name} Weekly!`,
          token: randomUUID(),
        }),
        method: "POST",
      });

      if (!response.ok) {
        switch (response.status) {
          case 409:
            toast({
              action: (
                <ToastAction altText={t("JoinNewsletterForm.tryAgain")}>
                  {t("JoinNewsletterForm.tryAgain")}
                </ToastAction>
              ),
              title: "You are already subscribed to Reliverse Weekly 🥰",
              variant: "destructive",
            });
            break;

          case 422:
            toast({
              action: (
                <ToastAction altText={t("JoinNewsletterForm.tryAgain")}>
                  {t("JoinNewsletterForm.tryAgain")}
                </ToastAction>
              ),
              title: "Invalid input 😭",
              variant: "destructive",
            });
            break;

          case 429:
            toast({
              action: (
                <ToastAction altText={t("JoinNewsletterForm.tryAgain")}>
                  {t("JoinNewsletterForm.tryAgain")}
                </ToastAction>
              ),
              title: "The daily email limit has been reached 🥹",
              variant: "destructive",
            });
            break;

          default:
            toast({
              action: (
                <ToastAction altText={t("JoinNewsletterForm.tryAgain")}>
                  {t("JoinNewsletterForm.tryAgain")}
                </ToastAction>
              ),
              title: "Something went wrong, please try again later 🤔",
              variant: "destructive",
            });
        }

        return;
      }

      toast({
        title: "You have been subscribed to our newsletter! 😍",
      });
      form.reset();
    } catch (error) {
      toast({
        action: (
          <ToastAction altText={t("JoinNewsletterForm.tryAgain")}>
            {t("JoinNewsletterForm.tryAgain")}
          </ToastAction>
        ),
        title: "Something went wrong, please try again later 🥲",
        variant: "destructive",
      });
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      className="grid w-full"
      autoComplete="off"
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <div className="relative">
        <label aria-label="Email" htmlFor="email" />
        <Input
          className="pr-12"
          placeholder="Enter your email to subscribe to Reliverse Weekly..."
          {...form.register("email")}
        />
        <Button
          className="absolute right-0 top-1/2 h-8 w-14 -translate-y-1/2"
          disabled={loading}
          type="submit"
          variant="outline"
        >
          {loading ? (
            <SpinnerSVG className="animate-spin" aria-hidden="true" />
          ) : (
            <Send className="size-3" aria-hidden="true" />
          )}
          <span className="sr-only">
            {t("JoinNewsletterForm.joinReliverseWeeklyNewsletter")}
          </span>
        </Button>
      </div>
    </form>
  );
}
