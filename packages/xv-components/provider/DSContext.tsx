// provider/DSContext.tsx
import { createContext, useContext } from "react";
import { DSMessages } from "./types";

const defaultMessages: Required<DSMessages> = {
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
  
};

interface DSContextValue {
  message: Required<DSMessages>;
}

export const DSContext = createContext<DSContextValue>({
  message: defaultMessages,
});

export const useDSMessages = () => useContext(DSContext).message;

export { defaultMessages };