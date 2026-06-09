import { forwardRef } from "react";
import { BaseInput, BaseInputProps } from "../_base/Base";

export interface NumberInputProps extends Omit<BaseInputProps, "type"> {
  min?: number;
  max?: number;
  step?: number;
}

export const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>(
  ({ min, max, step, className, ...props }, ref) => {
    return (
      <BaseInput
        ref={ref}
        {...props}
        type="number"
        min={min}
        max={max}
        step={step}
        className={className}
      />
    );
  }
);

NumberInput.displayName = "NumberInput";