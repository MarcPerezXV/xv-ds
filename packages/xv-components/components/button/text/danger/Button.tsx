import { forwardRef } from "react";
import { clsx } from "clsx";
import { BaseButton, BaseButtonProps } from "../_base/Button";
import "./styles.css";

export interface DangerButtonProps extends BaseButtonProps {}

export const DangerButton = forwardRef<
  HTMLButtonElement,
  DangerButtonProps
>(({ className, ...props }, ref) => {
  return (
    <BaseButton
      ref={ref}
      {...props}
      className={clsx("xv-text-button-danger", className)}
    />
  );
});

DangerButton.displayName = "DangerButton";