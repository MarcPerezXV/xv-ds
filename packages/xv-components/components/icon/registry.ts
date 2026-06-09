import { FC, SVGProps } from "react";
import type { IconSize } from "./type";

type SvgComponent = FC<SVGProps<SVGSVGElement>>;
type IconRegistry = Record<string, Record<IconSize, SvgComponent>>;

const modules = import.meta.glob(
  "../../../xv-icons/icons/**/*.svg",
  {
    eager: true,
    query: "?react",
    import: "default",
  }
);
export const icons = Object.entries(modules).reduce<IconRegistry>(
  (acc, [path, component]) => {
    const match = path.match(/\/([^/]+)\/(small|medium|large)\.svg$/);
    if (!match) return acc;

    const [, name, size] = match;

    if (!acc[name]) {
      acc[name] = {} as Record<IconSize, SvgComponent>;
    }

    acc[name][size as IconSize] = component as SvgComponent;

    return acc;
  },
  {}
);

export type IconName = keyof typeof icons;