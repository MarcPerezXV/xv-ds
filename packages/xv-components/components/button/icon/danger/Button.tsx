import { forwardRef } from "react";
import { clsx } from "clsx";
import { BaseIconButton, BaseIconButtonProps } from "../_base/Button";
import "./styles.css";

export interface DangerIconButtonProps extends BaseIconButtonProps {}

export const DangerIconButton = forwardRef<
  HTMLButtonElement,
  DangerIconButtonProps
>(({ className, ...props }, ref) => {
  return (
    <BaseIconButton
      ref={ref}
      {...props}
      className={clsx("xv-icon-button-danger", className)}
    />
  );
});

DangerIconButton.displayName = "DangerIconButton";