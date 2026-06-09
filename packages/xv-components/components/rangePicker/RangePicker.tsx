import { useState, useRef, useEffect } from "react";
import { clsx } from "clsx";
import { GhostIconButton } from "../iconButton";

import { NumberInput } from "../input";

import "./styles.css";
import { Icon } from "../icon";

export interface RangeValue {
  from: number;
  to: number;
}

export type RangeMode = "both" | "from" | "to";

interface RangeInputProps {
  label: string;
  description?: string;
  error?: string;
  disabled?: boolean;
  className?: string;
  value?: RangeValue;
  onChange?: (value: RangeValue | undefined) => void;
  min: number;
  max: number;
  step?: number;
  clearLabel?: string;
  mode?: RangeMode;
}

export const RangeInput = ({
  label,
  description,
  error,
  disabled,
  className,
  value,
  onChange,
  min,
  max,
  step = 1,
  clearLabel,
  mode = "both",
}: RangeInputProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const from = value?.from ?? min;
  const to = value?.to ?? max;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleFromChange = (v: number) => {
    const clamped = Math.min(v, to);
    onChange?.({ from: clamped, to });
  };

  const handleToChange = (v: number) => {
    const clamped = Math.max(v, from);
    onChange?.({ from, to: clamped });
  };

  const fromPercent = ((from - min) / (max - min)) * 100;
  const toPercent = ((to - min) / (max - min)) * 100;

  const descriptionId = description ? "range-input-description" : undefined;
  const errorId = error ? "range-input-error" : undefined;
  const ariaDescribedBy = [descriptionId, errorId].filter(Boolean).join(" ") || undefined;

  return (
    <div className={clsx("xv-range-input", className)} ref={wrapperRef}>
      <div className="xv-range-input__info">
        <label className="xv-range-input__label">{label}</label>
        {description && (
          <p id={descriptionId} className="xv-range-input__description">
            {description}
          </p>
        )}
      </div>

      <div className="xv-range-input__control-wrapper">
        <button
          type="button"
          disabled={disabled}
          aria-describedby={ariaDescribedBy}
          aria-expanded={isOpen}
          aria-haspopup="dialog"
          className={clsx(
            "xv-range-input__control",
            isOpen && "xv-range-input__control--active",
            error && "xv-range-input__control--error",
          )}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <span className="xv-range-input__value">
            {value ? `${from} - ${to}` : `${min} - ${max}`}
          </span>
        </button>

        {value && (
          <div className="xv-range-input__clear-wrapper">
            <GhostIconButton
              icon="close"
              altText={clearLabel ?? "Clear"}
              description={clearLabel ?? "Clear"}
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                onChange?.(undefined);
              }}
            />
          </div>
        )}

        <Icon
          name="chevronDown"
          size="small"
          className={clsx(
            "xv-range-input__chevron",
            isOpen && "xv-range-input__chevron--open",
          )}
        />
      </div>

      {error && (
        <div id={errorId} className="xv-range-input__error">
          <Icon name="xMarkSquare" size="small" />
          {error}
        </div>
      )}

      {isOpen && (
        <div className="xv-range-input__popover">
          <div className="xv-range-input__slider-wrapper">
            <div
              className="xv-range-input__track-fill"
              style={{
                left: `${fromPercent}%`,
                width: `${toPercent - fromPercent}%`,
              }}
            />
            {(mode === "both" || mode === "from") && (
              <input
                type="range"
                className="xv-range-input__slider xv-range-input__slider--from"
                min={min}
                max={max}
                step={step}
                value={from}
                onChange={(e) => handleFromChange(Number(e.target.value))}
              />
            )}
            {(mode === "both" || mode === "to") && (
              <input
                type="range"
                className="xv-range-input__slider xv-range-input__slider--to"
                min={min}
                max={max}
                step={step}
                value={to}
                onChange={(e) => handleToChange(Number(e.target.value))}
              />
            )}
          </div>

          <div className="xv-range-input__inputs">
            <div className="xv-range-input__number-wrapper">
              <NumberInput
                aria-label="Minimum value"
                value={from}
                min={min}
                max={to}
                step={step}
                disabled={mode === "to"}
                onChange={(e) => handleFromChange(Number(e.target.value))}
              />
            </div>
            <span className="xv-range-input__inputs-separator">—</span>
            <div className="xv-range-input__number-wrapper">
              <NumberInput
                aria-label="Maximum value"
                value={to}
                min={from}
                max={max}
                step={step}
                disabled={mode === "from"}
                onChange={(e) => handleToChange(Number(e.target.value))}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

RangeInput.displayName = "RangeInput";