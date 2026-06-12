import { clsx } from "clsx";
import { GhostIconButton } from "../button";
import { useDSLocale } from "../../provider/DSContext";
import { usePopover } from "../../hooks/use.popover";

import "./styles.css";
import { ScrollColumn } from "../_shared/ScrollColumn";
import { Icon } from "../icon";

export interface TimeValue {
  hours: number;
  minutes: number;
}

export interface TimePreset {
  label: string;
  value: TimeValue;
}

interface TimePickerProps {
  label: string;
  description?: string;
  error?: string;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  value?: TimeValue;
  onChange?: (value: TimeValue | undefined) => void;
  hour12?: boolean;
  minuteStep?: 1 | 5 | 10 | 15 | 30;
  presets?: TimePreset[];
}

const pad = (n: number) => String(n).padStart(2, "0");

const formatTime = (value: TimeValue, hour12: boolean) => {
  if (hour12) {
    const period = value.hours >= 12 ? "PM" : "AM";
    const hours = value.hours % 12 || 12;
    return `${pad(hours)}:${pad(value.minutes)} ${period}`;
  }
  return `${pad(value.hours)}:${pad(value.minutes)}`;
};

export const TimePicker = ({
  label,
  description,
  error,
  placeholder = "Select time",
  disabled,
  className,
  value,
  onChange,
  hour12 = false,
  minuteStep = 1,
  presets,
}: TimePickerProps) => {
  const { isOpen, toggle, close, wrapperRef, refs, floatingStyles } = usePopover();
  const locale = useDSLocale();

  const hours = Array.from({ length: hour12 ? 12 : 24 }, (_, i) => hour12 ? i + 1 : i);
  const minutes = Array.from({ length: Math.ceil(60 / minuteStep) }, (_, i) => i * minuteStep);

  const selectedHours = hour12
    ? (value?.hours ?? 12) % 12 || 12
    : (value?.hours ?? 0);

  const formatHour = (h: number) => pad(h);
  const period = value ? (value.hours >= 12 ? "PM" : "AM") : "AM";

  const handleHourSelect = (h: number) => {
    const realHour = hour12
      ? period === "PM" ? (h === 12 ? 12 : h + 12) : (h === 12 ? 0 : h)
      : h;
    onChange?.({ hours: realHour, minutes: value?.minutes ?? 0 });
  };

  const handleMinuteSelect = (m: number) => {
    onChange?.({ hours: value?.hours ?? 0, minutes: m });
  };

  const handlePeriodSelect = (p: "AM" | "PM") => {
    if (!value) return;
    const hours = p === "PM"
      ? value.hours < 12 ? value.hours + 12 : value.hours
      : value.hours >= 12 ? value.hours - 12 : value.hours;
    onChange?.({ hours, minutes: value.minutes });
  };

  const descriptionId = description ? "time-picker-description" : undefined;
  const errorId = error ? "time-picker-error" : undefined;
  const ariaDescribedBy = [descriptionId, errorId].filter(Boolean).join(" ") || undefined;

  return (
    <div className={clsx("xv-time-picker", className)} ref={wrapperRef}>
      <div className="xv-time-picker__info">
        <label className="xv-time-picker__label">{label}</label>
        {description && (
          <p id={descriptionId} className="xv-time-picker__description">
            {description}
          </p>
        )}
      </div>

      <div className="xv-time-picker__control-wrapper" ref={refs.setReference}>
        <button
          type="button"
          disabled={disabled}
          aria-describedby={ariaDescribedBy}
          aria-expanded={isOpen}
          aria-haspopup="dialog"
          className={clsx(
            "xv-time-picker__control",
            isOpen && "xv-time-picker__control--active",
            error && "xv-time-picker__control--error",
          )}
          onClick={toggle}
        >
          <span className={clsx(
            "xv-time-picker__value",
            !value && "xv-time-picker__value--placeholder"
          )}>
            {value ? formatTime(value, hour12) : placeholder}
          </span>
        </button>

        {value && (
          <div className="xv-time-picker__clear-wrapper">
            <GhostIconButton
              icon="close"
              altText={locale.clearTime}
              description={locale.clearTime}
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                onChange?.(undefined);
              }}
            />
          </div>
        )}

        <Icon
          name="clock"
          size="small"
          className="xv-time-picker__clock-icon"
        />
      </div>

      {error && (
        <div id={errorId} className="xv-time-picker__error">
          <Icon name="xMarkSquare" size="small" />
          {error}
        </div>
      )}

      {isOpen && (
        <div
          ref={refs.setFloating}
          style={floatingStyles}
          className="xv-time-picker__popover"
        >
          {presets && presets.length > 0 && (
            <ul className="xv-time-picker__presets">
              {presets.map((preset) => (
                <li key={preset.label}>
                  <button
                    type="button"
                    className={clsx(
                      "xv-time-picker__preset-button",
                      value &&
                        value.hours === preset.value.hours &&
                        value.minutes === preset.value.minutes &&
                        "xv-time-picker__preset-button--active"
                    )}
                    onClick={() => {
                      onChange?.(preset.value);
                      close();
                    }}
                  >
                    {preset.label}
                  </button>
                </li>
              ))}
            </ul>
          )}

          <div className="xv-time-picker__columns">
            <ScrollColumn
              items={hours}
              selected={selectedHours}
              onSelect={handleHourSelect}
              format={formatHour}
            />

            <div className="xv-time-picker__separator">:</div>

            <ScrollColumn
              items={minutes}
              selected={value?.minutes ?? 0}
              onSelect={handleMinuteSelect}
            />

            {hour12 && (
              <div className="xv-time-picker__period">
                {(["AM", "PM"] as const).map((p) => (
                  <button
                    key={p}
                    type="button"
                    className={clsx(
                      "xv-time-picker__period-button",
                      period === p && "xv-time-picker__period-button--active"
                    )}
                    onClick={() => handlePeriodSelect(p)}
                  >
                    {p}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

TimePicker.displayName = "TimePicker";