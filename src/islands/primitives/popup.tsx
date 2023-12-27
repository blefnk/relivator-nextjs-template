import { useState } from "react";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/islands/primitives/sheet";

const Popup = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Sheet open={isOpen}>
        <SheetTrigger>
          <button type="button" onClick={() => setIsOpen(true)}>
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
    </>
  );
};
