import { forwardRef, InputHTMLAttributes, ReactNode, useId } from "react";
import clsx from "clsx";


import "./styles.css";
import { Icon } from "../../icon";

export interface BaseInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  description?: string;
  error?: string;
  trailingSlot?: ReactNode;
}

export const BaseInput = forwardRef<HTMLInputElement, BaseInputProps>(
  (
    { label, description, error, className, id, disabled, trailingSlot, ...inputProps },
    ref
  ) => {
    const generatedId = useId();

    const inputId = id ?? generatedId;

    const descriptionId = description ? `${inputId}-description` : undefined;

    const errorId = error ? `${inputId}-error` : undefined;

    const ariaDescribedBy =
      [descriptionId, errorId].filter(Boolean).join(" ") || undefined;

    return (
      <div className="xv-text-input">
        {(label || description) && (
          <div className="xv-text-input__info">
            {label && (
              <label htmlFor={inputId} className="xv-text-input__label">
                {label}
              </label>
            )}

            {description && (
              <div id={descriptionId} className="xv-text-input__description">
                {description}
              </div>
            )}
          </div>
        )}

        <div className="xv-text-input__control-wrapper">
          <input
            ref={ref}
            id={inputId}
            disabled={disabled}
            aria-invalid={!!error}
            aria-describedby={ariaDescribedBy}
            className={clsx(
              "xv-text-input__control",
              error && "xv-text-input__control--error",
              className
            )}
            {...inputProps}
          />

          {trailingSlot && (
            <div className="xv-text-input__trailing">
              {trailingSlot}
            </div>
          )}
        </div>

        {error && (
          <div id={errorId} className="xv-text-input__error">
            <Icon name="xMarkSquare" size="small" />
            {error}
          </div>
        )}
      </div>
    );
  }
);

BaseInput.displayName = "BaseInput";