// provider/DSProvider.tsx
import { ReactNode } from "react";
import { DSContext, defaultLocale } from "./DSContext";
import { DSLocale } from "./types";

export interface DSProviderProps {
  children: ReactNode;
  locale?: DSLocale;
}

export const DSProvider = ({ children, locale }: DSProviderProps) => {
  return (
    <DSContext.Provider
      value={{
        locale: { ...defaultLocale, ...locale },
      }}
    >
      {children}
    </DSContext.Provider>
  );
};

DSProvider.displayName = "DSProvider";