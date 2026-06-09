import { FC, SVGProps } from "react";
import { clsx } from "clsx";
import { icons } from "./registry";
import type { IconName, IconSize } from "./type";

interface IconProps {
  name: IconName;
  size?: IconSize;
  className?: string;
}

export const Icon = ({ name, size = "medium", className }: IconProps) => {
  const Svg = icons[name]?.[size] as FC<SVGProps<SVGSVGElement>> | undefined;

  if (!Svg) {
    return null;
  }

  return <Svg className={clsx(className)} />;
};

Icon.displayName = "Icon";