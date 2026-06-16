import { clsx } from "clsx";
import "./styles.css";

export interface StatusDotProps {
  tone?: "red-high" | "red-med" | "red-low" | "green" | "yellow" | "orange" | "blue" | "gray";
}

export const StatusDot = ({ tone = "gray" }: StatusDotProps) => {
  return (
    <span className={clsx("xv-status-dot", `xv-status-dot--${tone}`)} />
  );
};

StatusDot.displayName = "StatusDot";