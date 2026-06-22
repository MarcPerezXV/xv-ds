import { FC, SVGProps } from "react";

type SvgComponent = FC<SVGProps<SVGSVGElement>>;
type IconRegistry = Record<string, SvgComponent>;

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
    const match = path.match(/\/([^/]+)\.svg$/);

    if (!match) return acc;
    const [, name] = match;

    acc[name] = component as SvgComponent;

    return acc;
  },
  {}
);

export type IconName = keyof typeof icons;