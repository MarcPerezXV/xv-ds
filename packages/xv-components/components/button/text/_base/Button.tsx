import "./styles.css";
import { forwardRef, ReactNode, ButtonHTMLAttributes } from "react";
import { Tooltip } from "../../../tooltip/Tooltip";
import clsx from "clsx";

export interface BaseButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  leadingSlot?: ReactNode;
  label: string;
  trailingSlot?: ReactNode;
  disabledReason?: string;
}


const LeadingSlotButton = ({children}:{children: ReactNode}) => {
  <div className="xv-text-button__slot">{children}</div>
}

const TrailingSlotButton = ({children}:{children: ReactNode}) => {
  <div className="xv-text-button__slot">{children}</div>
}

LeadingSlotButton.displayName = "LeadingSlotButton";
TrailingSlotButton.displayName = "railingSlotButton";

export const BaseButton = forwardRef<
  HTMLButtonElement,
  BaseButtonProps
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

BaseButton.displayName = "BaseButton";
