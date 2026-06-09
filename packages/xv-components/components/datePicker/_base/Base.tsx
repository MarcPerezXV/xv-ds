import { forwardRef, useState, useRef, useEffect, ReactNode } from "react";
import { clsx } from "clsx";


import "./styles.css";
import { GhostIconButton } from "../../iconButton";
import { Icon } from "../../icon";

export interface BaseDatePickerProps {
  label: string;
  description?: string;
  error?: string;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
  valueLabel: string;
  clearLabel?: string;
  hasValue: boolean;
  onClear: () => void;
  children: ReactNode;
}

export const BaseDatePicker = ({
  label,
  description,
  error,
  placeholder = "Select date",
  disabled,
  className,
  isOpen,
  onToggle,
  onClose,
  valueLabel,
  clearLabel,
  hasValue,
  onClear,
  children,
}: BaseDatePickerProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  const descriptionId = description ? "date-picker-description" : undefined;
  const errorId = error ? "date-picker-error" : undefined;
  const ariaDescribedBy =
    [descriptionId, errorId].filter(Boolean).join(" ") || undefined;

  return (
    <div className={clsx("xv-date-picker", className)} ref={wrapperRef}>
      <div className="xv-date-picker__info">
        <label className="xv-date-picker__label">{label}</label>
        {description && (
          <p id={descriptionId} className="xv-date-picker__description">
            {description}
          </p>
        )}
      </div>

      <div className="xv-date-picker__control-wrapper">
        <button
          type="button"
          disabled={disabled}
          aria-describedby={ariaDescribedBy}
          aria-expanded={isOpen}
          aria-haspopup="dialog"
          className={clsx(
            "xv-date-picker__control",
            isOpen && "xv-date-picker__control--active",
            error && "xv-date-picker__control--error",
          )}
          onClick={onToggle}
        >
          <span
            className={clsx(
              "xv-date-picker__value",
              !hasValue && "xv-date-picker__value--placeholder",
            )}
          >
            {hasValue ? valueLabel : placeholder}
          </span>
        </button>

        {hasValue && (
          <div className="xv-date-picker__clear-wrapper">
            <GhostIconButton
              icon="close"
              altText={clearLabel ?? "Clear"}
              description={clearLabel ?? "Clear"}
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                onClear();
              }}
            />
          </div>
        )}

        <Icon
          name="calendar"
          size="small"
          className="xv-date-picker__calendar-icon"
        />
      </div>

      {error && (
        <div id={errorId} className="xv-date-picker__error">
          <Icon name="xMarkSquare" size="small" />
          {error}
        </div>
      )}

      {isOpen && <div className="xv-date-picker__popover">{children}</div>}
    </div>
  );
};

BaseDatePicker.displayName = "BaseDatePicker";
