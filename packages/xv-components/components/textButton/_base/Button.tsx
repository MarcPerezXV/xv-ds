import "./styles.css";
import { forwardRef, ReactNode, ButtonHTMLAttributes } from "react";
import { Tooltip } from "../../tooltip/Tooltip";
import clsx from "clsx";

export interface BaseTextButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  leadingSlot?: ReactNode;
  label: string;
  trailingSlot?: ReactNode;
  disabledReason?: string;
}

export const BaseTextButton = forwardRef<
  HTMLButtonElement,
  BaseTextButtonProps
>(
  (
    {
      leadingSlot,
      label,
      trailingSlot,
      disabledReason,
      className,
      disabled,
      ...buttonProps
    },
    ref,
  ) => {
    const button = (
      <button
        ref={ref}
        disabled={disabled}
        className={clsx("xv-text-button", className)}
        {...buttonProps}
      >
        {leadingSlot && (
          <div className="xv-text-button__slot">{leadingSlot}</div>
        )}

        <span className="xv-text-button__label">{label}</span>

        {trailingSlot && (
          <div className="xv-text-button__slot">{trailingSlot}</div>
        )}
      </button>
    );

    if (disabled && disabledReason) {
      return (
        <Tooltip content={disabledReason}>
          <span style={{ display: "inline-flex" }}>{button}</span>
        </Tooltip>
      );
    }

    return button;
  },
);

BaseTextButton.displayName = "BaseTextButton";
