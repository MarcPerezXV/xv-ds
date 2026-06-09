import { useId } from "react";
import { Tooltip } from "../tooltip/Tooltip";

import "./styles.css";

export interface SwitchProps {
  checked?: boolean;
  disabled?: boolean;
  label?: string;
  description?: string;
  disabledReason?: string;
  onChange?: (checked: boolean) => void;
}

export const Switch = ({
  checked = false,
  disabled = false,
  label,
  description,
  disabledReason,
  onChange,
}: SwitchProps) => {
  const id = useId();
  const descriptionId = description ? `${id}-description` : undefined;

  const control = (
    <label className="xv-switch" htmlFor={id}>
      <input
        id={id}
        type="checkbox"
        role="switch"
        className="xv-switch__input"
        checked={checked}
        disabled={disabled}
        aria-describedby={descriptionId}
        onChange={(event) => {
          onChange?.(event.target.checked);
        }}
      />

      <span className="xv-switch__control" />

      {(label || description) && (
        <div className="xv-switch__info">
          {label && <span className="xv-switch__label">{label}</span>}
          {description && (
            <span id={descriptionId} className="xv-switch__description">
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

Switch.displayName = "Switch";