import { forwardRef } from "react";
import { clsx } from "clsx";
import { BaseIconButton, BaseIconButtonProps } from "../_base/Button";
import "./styles.css";

export interface GhostIconButtonProps extends BaseIconButtonProps {
  active?: boolean;
}

export const GhostIconButton = forwardRef<
  HTMLButtonElement,
  GhostIconButtonProps
>(({ active, className, ...props }, ref) => {
  return (
    <BaseIconButton
      ref={ref}
      {...props}
      className={clsx(
        "xv-icon-button-ghost",
        active && "xv-icon-button-ghost--active",
        className
      )}
    />
  );
});

GhostIconButton.displayName = "GhostIconButton";