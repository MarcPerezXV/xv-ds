import { InputHTMLAttributes } from "react";
import { clsx } from "clsx";
import { RadioButton } from "./_base/RadioButton";
import "./_base/styles.css";

export interface RadioOption {
  value: string;
  label?: string;
  description?: string;
  disabled?: boolean;
  disabledReason?: string;
}

export interface RadioButtonGroupProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange" | "value"> {
  name: string;
  value: string;
  options: RadioOption[];
  onChange: (value: string) => void;
  orientation?: "vertical" | "horizontal";
}

export const RadioButtonGroup = ({
  name,
  value,
  options,
  onChange,
  orientation = "vertical",
}: RadioButtonGroupProps) => {
  return (
    <fieldset className="xv-radio-group">
      <div className={clsx(
        "xv-radio-group__options",
        orientation === "horizontal" && "xv-radio-group__options--horizontal"
      )}>
        {options.map((option) => (
          <RadioButton
            key={option.value}
            name={name}
            label={option.label}
            description={option.description}
            disabled={option.disabled}
            disabledReason={option.disabledReason}
            checked={value === option.value}
            onChange={() => onChange(option.value)}
          />
        ))}
      </div>
    </fieldset>
  );
};

RadioButtonGroup.displayName = "RadioButtonGroup";