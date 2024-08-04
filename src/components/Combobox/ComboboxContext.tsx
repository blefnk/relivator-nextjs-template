"use client";

import type { ReactNode } from "react";
import { createContext, useContext, useState } from "react";

type DialogContextType = {
  closeDialog: () => void;
  isOpen: boolean;
  openDialog: () => void;
  toggleDialog: () => void;
};

const DialogContext = createContext<DialogContextType | undefined>(undefined);

export const ComboboxProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const openDialog = () => {
    setIsOpen(true);
  };

  const closeDialog = () => {
    setIsOpen(false);
  };

  const toggleDialog = () => {
    setIsOpen((previous) => !previous);
  };

  return (
    <DialogContext.Provider
      value={{
        closeDialog,
        isOpen,
        openDialog,
        toggleDialog,
      }}
    >
      {children}
    </DialogContext.Provider>
  );
};

export const useComboboxDialog = () => {
  const context = useContext(DialogContext);

  if (!context) {
    throw new Error("useComboboxDialog must be used within a ComboboxProvider");
  }

  return context;
};
