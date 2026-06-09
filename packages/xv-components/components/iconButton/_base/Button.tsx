import { forwardRef, ButtonHTMLAttributes } from "react";
import clsx from "clsx";


import { Tooltip } from "../../tooltip/Tooltip";

import "./styles.css";
import { IconName } from "../../icon/type";
import { Icon } from "../../icon/Icon";

export interface BaseIconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: IconName;
  altText: string;
  size?: "small" | "medium";
  description?: string;
  disabledReason?: string;
  tooltipPosition?: "top" | "bottom" | "left" | "right";
}

export const BaseIconButton = forwardRef<
  HTMLButtonElement,
  BaseIconButtonProps
>(
  (
    {
      icon,
      altText,
      description,
      disabledReason,
      tooltipPosition = "top",
      size,
      className,
      disabled,
      ...buttonProps
    },
    ref,
  ) => {
    const tooltipContent = disabled ? disabledReason : description;

    const button = (
      <button
        ref={ref}
        {...buttonProps}
        aria-label={altText}
        disabled={disabled}
        className={clsx(
          "xv-icon-button",
          size === "small" && "xv-icon-button--small",
          className,
        )}
      >
        <Icon name={icon} size={size === "small" ? "small" : "medium"} />
      </button>
    );

    if (!tooltipContent) {
      return button;
    }

    if (disabled) {
      return (
        <Tooltip content={tooltipContent} placement={tooltipPosition}>
          <span style={{ display: "inline-flex" }}>{button}</span>
        </Tooltip>
      );
    }

    return (
      <Tooltip content={tooltipContent} placement={tooltipPosition}>
        {button}
      </Tooltip>
    );
  },
);

BaseIconButton.displayName = "BaseIconButton";
