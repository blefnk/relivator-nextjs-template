"use client";

import { TrashIcon, X } from "lucide-react";
import { toast, ToastBar, Toaster as ToasterProvider } from "react-hot-toast";

import { Button } from "~/islands/primitives/button";

/** @see https://react-hot-toast.com */
export const ReactHotToasts = () => (
  <ToasterProvider
    position="bottom-right"
    containerClassName=""
    containerStyle={{}}
    reverseOrder={true}
    gutter={8}
    toastOptions={{
      className: "",
      duration: 3500,
      style: {
        borderRadius: "18px",
        padding: "16px 24px",
        border: "1px solid #3f3f3f",
        background: "black",
        color: "white",
      },
      success: {
        duration: 3000,
        style: {
          background: "green",
        },
      },
      error: {
        duration: 8000,
      },
    }}
  >
    {(t) => (
      <ToastBar toast={t} style={{ padding: 0, ...t.style }}>
        {({ icon, message }) => (
          <>
            {icon}
            {message}
            {t.type !== "loading" && (
              <Button
                autoFocus
                size="sm"
                variant="default"
                onClick={() => toast.dismiss(t.id)}
                className="flex items-center justify-center bg-zinc-200 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200"
              >
                <X className="h-3 w-3" />
              </Button>
            )}
          </>
        )}
      </ToastBar>
    )}
  </ToasterProvider>
);
