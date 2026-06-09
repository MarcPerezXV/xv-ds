import { forwardRef } from "react";
import { clsx } from "clsx";
import { BaseTextButton, BaseTextButtonProps } from "../_base/Button";
import "./styles.css";

export interface PrimaryTextButtonProps extends BaseTextButtonProps {}

export const PrimaryTextButton = forwardRef<
  HTMLButtonElement,
  PrimaryTextButtonProps
>(({ className, ...props }, ref) => {
  return (
    <BaseTextButton
      ref={ref}
      {...props}
      className={clsx("xv-text-button-primary", className)}
    />
  );
});

PrimaryTextButton.displayName = "PrimaryTextButton";
