import { clsx } from "clsx";
import { Icon, IconName } from "../icon";
import { ReactNode } from "react";
import "./styles.css";

export type CalloutType = "warning" | "error" | "informative";

export interface CalloutProps {
  type?: CalloutType;
  message: string;
  children?: ReactNode;
  className?: string;
}

const iconMap: Record<CalloutType, IconName> = {
  warning: "warning",
  error: "xmark-square",
  informative: "info-square",
};

const CalloutActions = ({ children }: { children: ReactNode }) => (
  <div className="xv-callout__actions">{children}</div>
);

CalloutActions.displayName = "CalloutActions";

const Callout = ({ type = "informative", message, children, className }: CalloutProps) => {
  return (
    <div className={clsx("xv-callout", `xv-callout--${type}`, className)}>
      <div className="xv-callout__info">
        <Icon name={iconMap[type]} size="medium" className="xv-callout__icon" />
        <span className="xv-callout__message">{message}</span>
      </div>
      {children}
    </div>
  );
};

Callout.displayName = "Callout";
Callout.Actions = CalloutActions;

export { Callout };