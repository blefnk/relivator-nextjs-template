"use client";

import { useEffect, useState } from "react";

import { getCookie, setCookie } from "cookies-next";
import { useTranslations } from "next-intl";

import { CartAddForm } from "~/components/Forms/CartAddForm";
import { GuestEmailSubmitProvider } from "~/components/Forms/Context/GuestAddFormContext";
import { GuestAddForm } from "~/components/Forms/GuestAddForm";

type AddToCartProps = {
  email?: string;
  productId: number;
  session?: unknown;
  storeId: string;
  tAddToCart: "Add to cart" | string;
};

export default function AddToCart({
  email,
  productId,
  session,
  storeId,
}: AddToCartProps) {
  const [guestEmail, setGuestEmail] = useState<null | string>(null);
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

  const handleEmailSubmit = (email: string) => {
    // todo: Check if email exists in guests table, and add if not
    setCookie("GUEST_EMAIL", email);
    setGuestEmail(email);
    setShowGuestForm(false);
  };

  return (
    <>
      {session ? (
        <CartAddForm
          email={email}
          productId={productId}
          storeId={storeId}
          tAddToCart={t("store.products.addToCart")}
        />
      ) : guestEmail ? (
        <CartAddForm
          email={guestEmail}
          productId={productId}
          storeId={storeId}
          tAddToCart={t("store.products.addToCart")}
        />
      ) : showGuestForm ? (
        <GuestEmailSubmitProvider onEmailSubmit={handleEmailSubmit}>
          <GuestAddForm />
        </GuestEmailSubmitProvider>
      ) : null}
    </>
  );
}
