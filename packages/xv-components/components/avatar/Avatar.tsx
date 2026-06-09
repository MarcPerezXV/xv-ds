import { clsx } from "clsx";
import { Icon } from "../icon";
import "./styles.css";

export interface AvatarProps {
  size?: "small" | "medium";
  className?: string;
}

export const Avatar = ({ size = "medium", className }: AvatarProps) => {
  return (
    <span className={clsx("xv-avatar", `xv-avatar--${size}`, className)}>
      <Icon name="user" size={size === "small" ? "small" : "medium"} />
    </span>
  );
};

Avatar.displayName = "Avatar";