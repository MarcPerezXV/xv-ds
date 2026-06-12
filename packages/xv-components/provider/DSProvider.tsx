// provider/DSProvider.tsx
import { ReactNode } from "react";
import { DSContext, defaultMessages } from "./DSContext";
import { DSMessages } from "./types";

export interface DSProviderProps {
  children: ReactNode;
  message?: DSMessages;
}

export const DSProvider = ({ children, message }: DSProviderProps) => {
  return (
    <DSContext.Provider
      value={{
        message: { ...defaultMessages, ...message },
      }}
    >
      {children}
    </DSContext.Provider>
  );
};

DSProvider.displayName = "DSProvider";