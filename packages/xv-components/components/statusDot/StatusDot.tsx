import { clsx } from "clsx";
import "./styles.css";

export interface StatusDotProps {
  status?: "neutral" | "info" | "success" | "warning" | "danger";
}

export const StatusDot = ({ status = "neutral" }: StatusDotProps) => {
  return (
    <span className={clsx("xv-status-dot", `xv-status-dot--${status}`)} />
  );
};

StatusDot.displayName = "StatusDot";