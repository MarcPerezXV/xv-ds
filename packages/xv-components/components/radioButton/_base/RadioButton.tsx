import { useId, InputHTMLAttributes } from "react";
import { Tooltip } from "../../tooltip/Tooltip";

import "./styles.css";

export interface RadioButtonProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange" | "checked" | "type"> {
  checked?: boolean;
  disabled?: boolean;
  label?: string;
  description?: string;
  disabledReason?: string;
  onChange?: (checked: boolean) => void;
}

export const RadioButton = ({
  checked = false,
  disabled = false,
  label,
  description,
  disabledReason,
  onChange,
  ...inputProps
}: RadioButtonProps) => {
  const id = useId();
  const descriptionId = description ? `${id}-description` : undefined;

  const control = (
    <label className="xv-radio" htmlFor={id}>
      <input
        id={id}
        type="radio"
        className="xv-radio__input"
        checked={checked}
        disabled={disabled}
        aria-describedby={descriptionId}
        onChange={(event) => {
          onChange?.(event.target.checked);
        }}
        {...inputProps}
      />

      <span className="xv-radio__control" />

      {(label || description) && (
        <div className="xv-radio__info">
          {label && <span className="xv-radio__label">{label}</span>}
          {description && (
            <span id={descriptionId} className="xv-radio__description">
              {description}
            </span>
          )}
        </div>
      )}
    </label>
  );

  if (disabled && disabledReason) {
    return (
      <Tooltip content={disabledReason}>
        <span style={{ display: "inline-flex" }}>{control}</span>
      </Tooltip>
    );
  }

  return control;
};

RadioButton.displayName = "RadioButton";