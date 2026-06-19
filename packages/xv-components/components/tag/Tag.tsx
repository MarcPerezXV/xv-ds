import { clsx } from "clsx";
import { GhostIconButton } from "../button";
import { useDSMessages } from "../../provider/DSContext";
import "./styles.css";

export type TagTone = "yellow" | "blue" | "orange" | "green" | "red-high" | "red-med" | "red-low" | "gray";

export interface TagProps {
  label: string;
  tone?: TagTone;
  closable?: boolean;
  onClose?: () => void;
  className?: string;
}

export const Tag = ({ label, tone, closable, onClose, className }: TagProps) => {
  const messages = useDSMessages();

  return (
    <span className={clsx("xv-tag", tone && `xv-tag--${tone}`, className)}>
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