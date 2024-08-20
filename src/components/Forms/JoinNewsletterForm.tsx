"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";

import type { z } from "zod";

import { emailSchema } from "@/actions/reliverse/validations/notification";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/hooks-react/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { config } from "@reliverse/core";
import { Send } from "lucide-react";
import { useTranslations } from "next-intl";
import { ofetch } from "ofetch";
import { randomUUID } from "uncrypto";

import { SpinnerSVG } from "~/components/Common/Icons/SVG";

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
              variant: "destructive",
              title: "You are already subscribed to Reliverse Weekly 🥰",
              action: (
                <ToastAction altText={t("JoinNewsletterForm.tryAgain")}>
                  {t("JoinNewsletterForm.tryAgain")}
                </ToastAction>
              ),
            });
            break;

          case 422:
            toast({
              variant: "destructive",
              title: "Invalid input 😭",
              action: (
                <ToastAction altText={t("JoinNewsletterForm.tryAgain")}>
                  {t("JoinNewsletterForm.tryAgain")}
                </ToastAction>
              ),
            });
            break;

          case 429:
            toast({
              variant: "destructive",
              title: "The daily email limit has been reached 🥹",
              action: (
                <ToastAction altText={t("JoinNewsletterForm.tryAgain")}>
                  {t("JoinNewsletterForm.tryAgain")}
                </ToastAction>
              ),
            });
            break;

          default:
            toast({
              variant: "destructive",
              title: "Something went wrong, please try again later 🤔",
              action: (
                <ToastAction altText={t("JoinNewsletterForm.tryAgain")}>
                  {t("JoinNewsletterForm.tryAgain")}
                </ToastAction>
              ),
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
        variant: "destructive",
        title: "Something went wrong, please try again later 🥲",
        action: (
          <ToastAction altText={t("JoinNewsletterForm.tryAgain")}>
            {t("JoinNewsletterForm.tryAgain")}
          </ToastAction>
        ),
      });
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      autoComplete="off"
      className="grid w-full"
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <div className="relative">
        <label htmlFor="email" aria-label="Email" />
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
            <SpinnerSVG aria-hidden="true" className="animate-spin" />
          ) : (
            <Send aria-hidden="true" className="size-3" />
          )}
          <span className="sr-only">
            {t("JoinNewsletterForm.joinReliverseWeeklyNewsletter")}
          </span>
        </Button>
      </div>
    </form>
  );
}
