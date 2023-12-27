"use client";

import { useEffect, useState } from "react";
import { getCookie, setCookie } from "cookies-next";
import { useTranslations } from "next-intl";

import {
  AddToCartForm,
  type AddToCartFormProps,
} from "~/forms/add-to-cart-form";
import AddToCartGuestForm from "~/forms/email-form";

export default function AddToCart({
  productId,
  storeId,
  session,
  email,
}: AddToCartFormProps) {
  const [guestEmail, setGuestEmail] = useState<string | null>(null);
  const [showGuestForm, setShowGuestForm] = useState<boolean>(false);

  const t = useTranslations();

  useEffect(() => {
    if (!session) {
      const emailFromCookie = getCookie("GUEST_EMAIL")?.toString();
      if (emailFromCookie) {
        setGuestEmail(emailFromCookie);
      } else {
        setShowGuestForm(true);
      }
    }
  }, [session]);

  const handleGuestEmailSubmission = async (email: string) => {
    // todo: Check if email exists in guests table, and add if not
    setCookie("GUEST_EMAIL", email);
    setGuestEmail(email);
    setShowGuestForm(false);
  };

  return (
    <>
      {session ?
        <AddToCartForm
          productId={productId}
          storeId={storeId}
          email={email}
          tAddToCart={t("store.product.addToCart")}
        />
      : guestEmail ?
        <AddToCartForm
          productId={productId}
          storeId={storeId}
          email={guestEmail}
          tAddToCart={t("store.product.addToCart")}
        />
      : showGuestForm ?
        <AddToCartGuestForm onEmailSubmit={handleGuestEmailSubmission} />
      : null}
    </>
  );
}
