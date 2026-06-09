import { clsx } from "clsx";
import { GhostIconButton } from "../iconButton";
import "./styles.css";

export type TagType = "yellow" | "blue" | "orange";

export interface TagProps {
  label: string;
  type?: TagType;
  closable?: boolean;
  onClose?: () => void;
  className?: string;
  closeLabel?: string
}

export const Tag = ({ label, type, closable, onClose, className, closeLabel }: TagProps) => {
  return (
    <span className={clsx("xv-tag", type && `xv-tag--${type}`, className)}>
      <span className="xv-tag__label">{label}</span>
      {closable && (
        <GhostIconButton
          icon="close"
          altText="Remove"
          size="small"
          onClick={onClose}
          description={closeLabel ?? "Close tag"}
        />
      )}
    </span>
  );
};

Tag.displayName = "Tag";