/** @see https://github.com/streamdal/console/blob/main/components/toasts/toast.tsx */

import { useEffect, useState } from "react";
import { effect, Signal, signal } from "@preact/signals-core";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { Check, X } from "lucide-react";

import type { ErrorType } from "~/data/validations/error";

export interface SuccessType {
  status: boolean;
  message: string;
  errors?: ErrorType;
}

export type ToastKind = "error" | "success";

export interface ToastType {
  id: string;
  message: string;
  type: ToastKind;
}

export const toastSignal = signal<ToastType | null>(null);

export const Toast = ({ id }: { id: string }) => {
  if (toastSignal.value == null || id !== toastSignal.value.id) return;

  setTimeout(() => {
    toastSignal.value = null;
  }, 3000);

  const { type, message } = toastSignal.value;
  return (
    <div className="relative">
      <div
        id="toast-x"
        className={`border- fixed left-[40%] top-[10%] z-50 mb-4 flex w-full max-w-xs items-center rounded-lg border bg-white p-4 text-gray-500${
          type === "error" ? "red" : "green"
        }`}
        role="alert"
      >
        <div
          className={`text- inline-flex h-8 w-8 shrink-0 items-center justify-center${
            type === "error" ? "red" : "green"
          }-500 bg-${type === "error" ? "red" : "green"}-100 rounded-lg`}
        >
          {type === "error" ?
            <ExclamationTriangleIcon className="h-6 w-6 text-red-500" />
          : <Check className="h-6 w-6 text-green-500" />}
        </div>
        <div className="ml-3 w-full text-sm font-normal">{message}</div>
        <button
          type="button"
          className="-m-1.5 ml-auto inline-flex h-8 w-8 items-center justify-center rounded-lg bg-white p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-900 focus:ring-2 focus:ring-gray-300"
          data-dismiss-target="#toast-x"
          aria-label="Close"
          onClick={() => {
            toastSignal.value = null;
          }}
        >
          <X className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
};
