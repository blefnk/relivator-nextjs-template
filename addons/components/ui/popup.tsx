"use client";

import { useState } from "react";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export const Popup = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Sheet open={isOpen}>
      <SheetTrigger>
        <button
          onClick={() => {
            setIsOpen(true);
          }}
          type="button"
        >
          Open Popup
        </button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Popup Title</SheetTitle>
          <SheetClose />
        </SheetHeader>
        <p>Popup content goes here.</p>
      </SheetContent>
    </Sheet>
  );
};
