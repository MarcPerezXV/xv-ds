import { forwardRef } from "react";
import { clsx } from "clsx";
import { BaseButton, BaseButtonProps } from "../_base/Button";
import "./styles.css";

export interface PrimaryButtonProps extends BaseButtonProps {}

export const PrimaryButton = forwardRef<
  HTMLButtonElement,
  PrimaryButtonProps
>(({ className, ...props }, ref) => {
  return (
    <BaseButton
      ref={ref}
      {...props}
      className={clsx("xv-text-button-primary", className)}
    />
  );
});

PrimaryButton.displayName = "PrimaryButton";
