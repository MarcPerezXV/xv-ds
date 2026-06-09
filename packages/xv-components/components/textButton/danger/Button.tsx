import { forwardRef } from "react";
import { clsx } from "clsx";
import { BaseTextButton, BaseTextButtonProps } from "../_base/Button";
import "./styles.css";

export interface DangerTextButtonProps extends BaseTextButtonProps {}

export const DangerTextButton = forwardRef<
  HTMLButtonElement,
  DangerTextButtonProps
>(({ className, ...props }, ref) => {
  return (
    <BaseTextButton
      ref={ref}
      {...props}
      className={clsx("xv-text-button-danger", className)}
    />
  );
});

DangerTextButton.displayName = "DangerTextButton";