import { clsx } from "clsx";
import { Icon, IconName } from "../icon";
import { ReactNode } from "react";
import "./styles.css";

export type CalloutType = "warning" | "error" | "informative";

export interface CalloutProps {
  type?: CalloutType;
  message: string;
  trailingSlot?: ReactNode;
  className?: string;
}

const iconMap: Record<CalloutType, IconName> = {
  warning: "warning",
  error: "xMarkSquare",
  informative: "infoSquare",
};

export const Callout = ({ type = "informative", message, trailingSlot, className }: CalloutProps) => {
  return (
    <div className={clsx("xv-callout", `xv-callout--${type}`, className)}>
        <div className="xv-callout__info">
      <Icon name={iconMap[type]} size="medium" className="xv-callout__icon" />
      <span className="xv-callout__message">{message}</span>
      </div>
      {trailingSlot && (
        <div className="xv-callout__trailing">{trailingSlot}</div>
      )}
    </div>
  );
};

Callout.displayName = "Callout";