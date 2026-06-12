import { BaseButton, BaseButtonProps } from "../_base/Button";
import { forwardRef } from "react";
import clsx from "clsx";
import "./styles.css";

export interface GhostButtonProps extends BaseButtonProps {
  active?: boolean;
}

export const GhostButton = forwardRef<HTMLButtonElement, GhostButtonProps>(
  ({ active, className, ...props }, ref) => (
    <BaseButton
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

GhostButton.displayName = "GhostButton";