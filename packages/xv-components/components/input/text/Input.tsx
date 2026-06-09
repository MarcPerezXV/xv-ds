import { forwardRef } from "react";
import { BaseInput, BaseInputProps } from "../_base/Base";

export interface TextInputProps extends Omit<BaseInputProps, "type"> {}

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({ className, ...props }, ref) => {
    return <BaseInput ref={ref} {...props} type="text" className={className} />;
  }
);

TextInput.displayName = "TextInput";