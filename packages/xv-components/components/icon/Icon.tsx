import { clsx } from "clsx";
import { icons } from "./registry";
import type { IconName, IconSize } from "./type";
import './styles.css'

interface IconProps {
  name: IconName;
  size?: IconSize;
  className?: string;
}

const sizeMap = {
  small: 16,
  medium: 24,
  large: 32,
} as const;

export const Icon = ({
  name,
  size = "medium",
  className,
}: IconProps) => {
  const Svg = icons[name];

  if (!Svg) {
    return null;
  }

  return (
    <Svg
      className={clsx("xv-icon", `xv-icon-${size}`, className)}
      width={sizeMap[size]}
      height={sizeMap[size]}
    />
  );
};

Icon.displayName = "Icon";