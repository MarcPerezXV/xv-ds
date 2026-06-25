import { BaseButton, BaseButtonProps } from "../_base/Button";
import { forwardRef } from "react";
import clsx from "clsx";
import "./styles.css";

export interface OutlineButtonProps extends BaseButtonProps {
  active?: boolean;
}

export const OutlineButton = forwardRef<HTMLButtonElement, OutlineButtonProps>(
  ({ active, className, ...props }, ref) => (
    <BaseButton
      ref={ref}
      {...props}
      className={clsx(
        "xv-text-button-outline",
        active && "xv-text-button-outline--active",
        className
      )}
    />
  )
);

OutlineButton.displayName = "OutlineButton";