import type { FC, ReactNode } from "react";
import { createContext, useCallback, useContext } from "react";

type EmailSubmitContextType = {
  onEmailSubmit: (email: string) => void;
};

const EmailSubmitContext = createContext<EmailSubmitContextType | undefined>(
  undefined,
);

export const GuestEmailSubmitProvider: FC<{
  children: ReactNode;
  onEmailSubmit: (email: string) => void;
}> = ({ children, onEmailSubmit }) => {
  const handleEmailSubmit = useCallback(
    (email: string) => {
      onEmailSubmit(email);
    },
    [onEmailSubmit],
  );

  return (
    // @ts-expect-error TODO: Fix ts
    <EmailSubmitContext
      value={{
        onEmailSubmit: handleEmailSubmit,
      }}
    >
      {children}
    </EmailSubmitContext>
  );
};

export const useGuestEmailSubmit = () => {
  const context = useContext(EmailSubmitContext);

  if (!context) {
    throw new Error(
      "useGuestEmailSubmit must be used within an GuestEmailSubmitProvider",
    );
  }

  return context;
};
