import { clsx } from "clsx";
import { Tooltip } from "../tooltip/Tooltip";
import "./styles.css";

export interface TabConfig {
  value: string;
  label: string;
  disabled?: boolean;
  disabledReason?: string;
}

export interface TabsProps {
  value: string;
  onValueChange: (value: string) => void;
  tabs: TabConfig[];
}

export const Tabs = ({ value, onValueChange, tabs }: TabsProps) => {
  return (
    <div className="xv-tabs" role="tablist">
      {tabs.map((tab) => {
        const isActive = value === tab.value;

        const button = (
          <button
            key={tab.value}
            role="tab"
            type="button"
            disabled={tab.disabled}
            aria-selected={isActive}
            className={clsx(
              "xv-tab",
              isActive && "xv-tab--active",
              tab.disabled && "xv-tab--disabled"
            )}
            onClick={() => onValueChange(tab.value)}
          >
            {tab.label}
          </button>
        );

        if (tab.disabled && tab.disabledReason) {
          return (
            <Tooltip key={tab.value} content={tab.disabledReason}>
              <span style={{ display: "inline-flex" }}>{button}</span>
            </Tooltip>
          );
        }

        return button;
      })}
    </div>
  );
};

Tabs.displayName = "Tabs";