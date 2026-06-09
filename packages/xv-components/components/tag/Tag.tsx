import { clsx } from "clsx";
import { GhostIconButton } from "../iconButton";
import { useDSLocale } from "../../provider/DSContext";
import "./styles.css";

export type TagType = "yellow" | "blue" | "orange";

export interface TagProps {
  label: string;
  type?: TagType;
  closable?: boolean;
  onClose?: () => void;
  className?: string;
}

export const Tag = ({ label, type, closable, onClose, className }: TagProps) => {
  const locale = useDSLocale();

  return (
    <span className={clsx("xv-tag", type && `xv-tag--${type}`, className)}>
      <span className="xv-tag__label">{label}</span>
      {closable && (
        <GhostIconButton
          icon="close"
          altText={locale.closeTag}
          description={locale.closeTag}
          size="small"
          onClick={onClose}
        />
      )}
    </span>
  );
};

Tag.displayName = "Tag";