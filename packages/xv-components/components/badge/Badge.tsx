import clsx from "clsx";
import { Icon, IconName } from "../icon";
import './styles.css'


type BadgeColor = "red-high" | "red-med" | "red-low" | "yellow" | "orange" | "green" | "blue" 

type BadgeProps = {
    color: BadgeColor
    count: number
    icon?: never;
} | {
    color: BadgeColor;
    icon: IconName;
    count?: never;
}



export const Badge = (props: BadgeProps) => {
  return (
    <div className={clsx("xv-badge", `xv-badge--${props.color}`, `xv-badge--${props.count ? 'count' : 'icon'}`)}>
      {props.count !== undefined ? (
        props.count > 999 ? "+999" : props.count
      ) : (
        <Icon name={props.icon} size="small" />
      )}
    </div>
  );
};