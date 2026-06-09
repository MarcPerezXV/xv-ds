// provider/DSContext.tsx
import { createContext, useContext } from "react";
import { DSLocale } from "./types";

const defaultLocale: Required<DSLocale> = {
  clearSelection: "Clear selection",
  showPassword: "Show password",
  hidePassword: "Hide password",
  clearSearch: "Clear search",
  clearDate: "Clear date",
  clearTime: "Clear time",
  clearRange: "Clear range",
  clearRangeInput: "Clear",
  closeTag: "Close tag",
  closeDialog: "Close dialog",
  clear: "Clear",
};

interface DSContextValue {
  locale: Required<DSLocale>;
}

export const DSContext = createContext<DSContextValue>({
  locale: defaultLocale,
});

export const useDSLocale = () => useContext(DSContext).locale;

export { defaultLocale };