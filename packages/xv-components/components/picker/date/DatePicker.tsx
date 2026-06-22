import { format } from "date-fns";
import { DayPicker } from "react-day-picker";
import { clsx } from "clsx";

import { GhostIconButton } from "../../button";
import { ScrollColumn } from "../../_shared/ScrollColumn";
import { useDSMessages } from "../../../provider/DSContext";
import { usePopover } from "../../../hooks/use.popover";

import "react-day-picker/dist/style.css";
import "./date-picker.css";
import "../time/styles.css";
import { Icon } from "../../icon";

export interface TimeValue {
  hours: number;
  minutes: number;
}

export interface DatePickerValue {
  date: Date;
  time?: TimeValue;
}

export interface DatePickerPreset {
  label: string;
  value: DatePickerValue;
}

interface DatePickerProps {
  label: string;
  description?: string;
  error?: string;
  placeholder?: string;
  disabled?: boolean;
  disableFuture?: boolean;
  className?: string;
  value?: DatePickerValue;
  onChange?: (value: DatePickerValue | undefined) => void;
  dateFormat?: string;
  showTime?: boolean;
  hour12?: boolean;
  minuteStep?: 1 | 5 | 10 | 15 | 30;
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  presets?: DatePickerPreset[];
}

const pad = (n: number) => String(n).padStart(2, "0");

const formatValue = (value: DatePickerValue, dateFormat: string, hour12: boolean, showTime: boolean) => {
  const datePart = format(value.date, dateFormat);
  if (!showTime || !value.time) return datePart;
  const { hours, minutes } = value.time;
  if (hour12) {
    const period = hours >= 12 ? "PM" : "AM";
    const h = hours % 12 || 12;
    return `${datePart}, ${pad(h)}:${pad(minutes)} ${period}`;
  }
  return `${datePart}, ${pad(hours)}:${pad(minutes)}`;
};

export const DatePicker = ({
  label,
  description,
  error,
  placeholder,
  disabled,
  disableFuture,
  className,
  value,
  onChange,
  dateFormat = "dd/MM/yyyy",
  showTime = true,
  hour12 = false,
  minuteStep = 1,
  weekStartsOn = 1,
  presets,
}: DatePickerProps) => {
  const { isOpen, toggle, close, wrapperRef, refs, floatingStyles } = usePopover();
  const messages = useDSMessages();

  const defaultPlaceholder = showTime ? "Select date and time" : "Select date";

  const hours = Array.from({ length: hour12 ? 12 : 24 }, (_, i) => hour12 ? i + 1 : i);
  const minutes = Array.from({ length: Math.ceil(60 / minuteStep) }, (_, i) => i * minuteStep);

  const timeHours = value?.time?.hours ?? 0;
  const timeMinutes = value?.time?.minutes ?? 0;
  const disabledDays = disableFuture ? { after: new Date() } : undefined;
  const selectedHours = hour12 ? timeHours % 12 || 12 : timeHours;
  const period = timeHours >= 12 ? "PM" : "AM";

  const handleDaySelect = (date: Date | undefined) => {
    if (!date) return;
    onChange?.({
      date,
      time: showTime ? (value?.time ?? { hours: 0, minutes: 0 }) : undefined,
    });
    if (!showTime) close();
  };

  const handleHourSelect = (h: number) => {
    const realHour = hour12
      ? period === "PM" ? (h === 12 ? 12 : h + 12) : (h === 12 ? 0 : h)
      : h;
    onChange?.({
      date: value?.date ?? new Date(),
      time: { hours: realHour, minutes: timeMinutes },
    });
  };

  const handleMinuteSelect = (m: number) => {
    onChange?.({
      date: value?.date ?? new Date(),
      time: { hours: timeHours, minutes: m },
    });
  };

  const handlePeriodSelect = (p: "AM" | "PM") => {
    if (!value) return;
    const h = p === "PM"
      ? timeHours < 12 ? timeHours + 12 : timeHours
      : timeHours >= 12 ? timeHours - 12 : timeHours;
    onChange?.({ ...value, time: { hours: h, minutes: timeMinutes } });
  };

  const isPresetActive = (preset: DatePickerPreset) => {
    if (!value) return false;
    const sameDate = value.date.toDateString() === preset.value.date.toDateString();
    if (!showTime) return sameDate;
    return (
      sameDate &&
      timeHours === (preset.value.time?.hours ?? 0) &&
      timeMinutes === (preset.value.time?.minutes ?? 0)
    );
  };

  const descriptionId = description ? "date-picker-description" : undefined;
  const errorId = error ? "date-picker-error" : undefined;
  const ariaDescribedBy = [descriptionId, errorId].filter(Boolean).join(" ") || undefined;

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

      <div className="xv-date-picker__control-wrapper" ref={refs.setReference}>
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
          onClick={toggle}
        >
          <span className={clsx(
            "xv-date-picker__value",
            !value && "xv-date-picker__value--placeholder"
          )}>
            {value ? formatValue(value, dateFormat, hour12, showTime) : (placeholder ?? defaultPlaceholder)}
          </span>
        </button>

        {value && (
          <div className="xv-date-picker__clear-wrapper">
            <GhostIconButton
              icon="close"
              altText={messages.clearDate}
              description={messages.clearDate}
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                onChange?.(undefined);
              }}
            />
          </div>
        )}

        <Icon
          name="calendar-days"
          size="small"
          className="xv-date-picker__calendar-icon"
        />
      </div>

      {error && (
        <div id={errorId} className="xv-date-picker__error">
          <Icon name="close" size="small" />
          {error}
        </div>
      )}

      {isOpen && (
        <div
          ref={refs.setFloating}
          style={floatingStyles}
          className="xv-date-picker__popover"
        >
          {presets && presets.length > 0 && (
            <ul className="xv-date-picker__presets">
              {presets.map((preset) => (
                <li key={preset.label}>
                  <button
                    type="button"
                    className={clsx(
                      "xv-date-picker__preset-button",
                      isPresetActive(preset) && "xv-date-picker__preset-button--active"
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

          <DayPicker
            mode="single"
            selected={value?.date}
            weekStartsOn={weekStartsOn}
            disabled={disabledDays}
            onSelect={handleDaySelect}
            components={{
              Chevron: ({ orientation }) => (
                <Icon
                  name={orientation === "left" ? "chevron-left" : "chevron-right"}
                  size="small"
                />
              ),
            }}
          />

          {showTime && (
            <div className="xv-date-picker__time">
              <div className="xv-date-picker__columns">
                <ScrollColumn
                  items={hours}
                  selected={selectedHours}
                  onSelect={handleHourSelect}
                />
                <div className="xv-date-picker__separator">:</div>
                <ScrollColumn
                  items={minutes}
                  selected={timeMinutes}
                  onSelect={handleMinuteSelect}
                />
                {hour12 && (
                  <div className="xv-date-picker__period">
                    {(["AM", "PM"] as const).map((p) => (
                      <button
                        key={p}
                        type="button"
                        className={clsx(
                          "xv-date-picker__period-button",
                          period === p && "xv-date-picker__period-button--active"
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
      )}
    </div>
  );
};

DatePicker.displayName = "DatePicker";