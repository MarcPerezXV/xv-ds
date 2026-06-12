import { clsx } from "clsx";
import { GhostIconButton } from "../button";
import { useDSMessages } from "../../provider/DSContext";
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
  const messages = useDSMessages();

  return (
    <span className={clsx("xv-tag", type && `xv-tag--${type}`, className)}>
      <span className="xv-tag__label">{label}</span>
      {closable && (
        <GhostIconButton
          icon="close"
          altText={messages.closeTag}
          description={messages.closeTag}
          size="small"
          onClick={onClose}
        />
      )}
    </span>
  );
};

Tag.displayName = "Tag";