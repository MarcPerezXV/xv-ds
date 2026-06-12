import { forwardRef } from "react";
import { clsx } from "clsx";
import { BaseIconButton, BaseIconButtonProps } from "../_base/Button";
import "./styles.css";

export interface OutlineIconButtonProps extends BaseIconButtonProps {
  active?: boolean;
}

export const OutlineIconButton = forwardRef<
  HTMLButtonElement,
  OutlineIconButtonProps
>(({ active, className, ...props }, ref) => {
  return (
    <BaseIconButton
      ref={ref}
      {...props}
      className={clsx(
        "xv-icon-button-outline",
        active && "xv-icon-button-outline--active",
        className
      )}
    />
  );
});

OutlineIconButton.displayName = "OutlineIconButton";