import { BaseTextButton, BaseTextButtonProps } from "../_base/Button";
import { forwardRef } from "react";
import clsx from "clsx";
import "./styles.css";

export interface GhostButtonProps extends BaseTextButtonProps {
  active?: boolean;
}

export const GhostTextButton = forwardRef<HTMLButtonElement, GhostButtonProps>(
  ({ active, className, ...props }, ref) => (
    <BaseTextButton
      ref={ref}
      {...props}
      className={clsx(
        "xv-text-button-ghost",
        active && "xv-text-button-ghost--active",
        className
      )}
    />
  )
);

GhostTextButton.displayName = "GhostTextButton";