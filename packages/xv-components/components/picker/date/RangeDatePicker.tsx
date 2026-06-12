import { format } from "date-fns";
import { DayPicker, DateRange } from "react-day-picker";
import { BaseDatePicker } from "./_base/Base";
import { usePopover } from "../../../hooks/use.popover";

import "./range-date-picker.css";
import clsx from "clsx";
import { Icon } from "../../icon";

export interface DateRangePreset {
  label: string;
  getRange: () => DateRange;
}

interface RangeDatePickerProps {
  label: string;
  description?: string;
  error?: string;
  placeholder?: string;
  disabled?: boolean;
  disableFuture?: boolean;
  className?: string;
  value?: DateRange;
  onChange?: (range: DateRange | undefined) => void;
  dateFormat?: string;
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  presets?: DateRangePreset[];
}

export const RangeDatePicker = ({
  label,
  description,
  error,
  placeholder,
  disabled,
  className,
  disableFuture = false,
  value,
  onChange,
  dateFormat = "dd/MM/yyyy",
  weekStartsOn = 1,
  presets,
}: RangeDatePickerProps) => {
  const { isOpen, toggle, close, wrapperRef, refs, floatingStyles } = usePopover();

  const disabledDays = disableFuture ? { after: new Date() } : undefined;

  const valueLabel = value?.from
    ? value.to
      ? `${format(value.from, dateFormat)} - ${format(value.to, dateFormat)}`
      : format(value.from, dateFormat)
    : "";

  const handlePreset = (preset: DateRangePreset) => {
    const range = preset.getRange();
    onChange?.(range);
    close();
  };

  const isPresetActive = (preset: DateRangePreset) => {
    const presetRange = preset.getRange();
    if (!value?.from || !value?.to || !presetRange.from || !presetRange.to) return false;
    return (
      value.from.toDateString() === presetRange.from.toDateString() &&
      value.to.toDateString() === presetRange.to.toDateString()
    );
  };

  return (
    <BaseDatePicker
      label={label}
      description={description}
      error={error}
      placeholder={placeholder}
      disabled={disabled}
      className={className}
      isOpen={isOpen}
      onToggle={toggle}
      onClear={() => {
        onChange?.(undefined);
        close();
      }}
      hasValue={!!value?.from}
      valueLabel={valueLabel}
      wrapperRef={wrapperRef}
      refs={refs}
      floatingStyles={floatingStyles}
    >
      <div className="xv-date-picker__popover-inner">
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
                  onClick={() => handlePreset(preset)}
                >
                  {preset.label}
                </button>
              </li>
            ))}
          </ul>
        )}

        <DayPicker
          mode="range"
          selected={value}
          weekStartsOn={weekStartsOn}
          numberOfMonths={2}
          defaultMonth={value?.from}
          disabled={disabledDays}
          onSelect={(range) => {
            onChange?.(range);
            if (range?.from && range?.to && range.to > range.from) {
              close();
            }
          }}
          components={{
            Chevron: ({ orientation }) => (
              <Icon
                name={orientation === "left" ? "chevronLeft" : "chevronRight"}
                size="small"
              />
            ),
          }}
        />
      </div>
    </BaseDatePicker>
  );
};

RangeDatePicker.displayName = "RangeDatePicker";