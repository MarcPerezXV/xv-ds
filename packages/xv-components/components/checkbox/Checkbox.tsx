import { useId, useEffect, useRef, InputHTMLAttributes } from "react";
import { Tooltip } from "../tooltip/Tooltip";
import { CheckboxControl } from "./CheckboxControl";

import "./styles.css";

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange" | "checked"> {
  checked?: boolean;
  indeterminate?: boolean;
  disabled?: boolean;
  label?: string;
  description?: string;
  disabledReason?: string;
  onChange?: (checked: boolean) => void;
}

export const Checkbox = ({
  checked = false,
  indeterminate = false,
  disabled = false,
  label,
  description,
  disabledReason,
  onChange,
  ...inputProps
}: CheckboxProps) => {
  const id = useId();
  const ref = useRef<HTMLInputElement>(null);
  const descriptionId = description ? `${id}-description` : undefined;

  useEffect(() => {
    if (ref.current) {
      ref.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);

  const control = (
    <label className="xv-checkbox" htmlFor={id}>
      <input
        ref={ref}
        id={id}
        type="checkbox"
        className="xv-checkbox__input"
        checked={checked}
        disabled={disabled}
        aria-describedby={descriptionId}
        onChange={(event) => {
          onChange?.(event.target.checked);
        }}
        {...inputProps}
      />

      <CheckboxControl checked={checked} indeterminate={indeterminate} />

      {(label || description) && (
        <div className="xv-checkbox__info">
          {label && <span className="xv-checkbox__label">{label}</span>}
          {description && (
            <span id={descriptionId} className="xv-checkbox__description">
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

Checkbox.displayName = "Checkbox";