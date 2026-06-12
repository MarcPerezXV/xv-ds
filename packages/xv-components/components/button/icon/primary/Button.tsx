import { forwardRef } from "react";
import { clsx } from "clsx";
import { BaseIconButton, BaseIconButtonProps } from "../_base/Button";
import "./styles.css";

export interface PrimaryIconButtonProps extends BaseIconButtonProps {}

export const PrimaryIconButton = forwardRef<
  HTMLButtonElement,
  PrimaryIconButtonProps
>(({ className, ...props }, ref) => {
  return (
    <BaseIconButton
      ref={ref}
      {...props}
      className={clsx("xv-icon-button-primary", className)}
    />
  );
});

PrimaryIconButton.displayName = "PrimaryIconButton";