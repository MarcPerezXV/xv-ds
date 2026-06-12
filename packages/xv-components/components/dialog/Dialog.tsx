import { ReactNode, useEffect, useRef, createContext, useContext } from "react";
import { clsx } from "clsx";
import { GhostIconButton } from "../button";
import { Icon } from "../icon";
import { useDSLocale } from "../../provider/DSContext";
import "./styles.css";

export type DialogType = "informative" | "warning" | "error";

interface DialogContextValue {
  onClose: () => void;
  type: DialogType;
}

const DialogContext = createContext<DialogContextValue | null>(null);

const useDialogContext = () => {
  const ctx = useContext(DialogContext);
  if (!ctx) throw new Error("Dialog subcomponents must be used inside Dialog");
  return ctx;
};

const iconMap: Record<DialogType, string> = {
  informative: "infoSquare",
  warning: "warning",
  error: "xMarkSquare",
};

const DialogHeader = ({ title }: { title: string }) => {
  const { onClose } = useDialogContext();
  const locale = useDSLocale();

  return (
    <div className="xv-dialog__header">
      <span className="xv-dialog__title">{title}</span>
      <GhostIconButton
        icon="close"
        altText={locale.closeDialog}
        onClick={onClose}
      />
    </div>
  );
};

DialogHeader.displayName = "DialogHeader";

const DialogContent = ({ message, icon }: { message: string; icon?: boolean }) => {
  const { type } = useDialogContext();
  return (
    <div className="xv-dialog__body">
      {icon && (
        <Icon name={iconMap[type]} size="large" className="xv-dialog__icon" />
      )}
      <p className="xv-dialog__message">{message}</p>
    </div>
  );
};

DialogContent.displayName = "DialogContent";

const DialogActions = ({ children }: { children: ReactNode }) => (
  <div className="xv-dialog__actions">{children}</div>
);

DialogActions.displayName = "DialogActions";

export interface DialogProps {
  open: boolean;
  onClose: () => void;
  type?: DialogType;
  children: ReactNode;
  className?: string;
}

const Dialog = ({ open, onClose, type = "informative", children, className }: DialogProps) => {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (open) {
      ref.current?.showModal();
    } else {
      ref.current?.close();
    }
  }, [open]);

  useEffect(() => {
    const el = ref.current;
    const handleCancel = (e: Event) => {
      e.preventDefault();
      onClose();
    };
    el?.addEventListener("cancel", handleCancel);
    return () => el?.removeEventListener("cancel", handleCancel);
  }, [onClose]);

  return (
    <DialogContext.Provider value={{ onClose, type }}>
      <dialog ref={ref} className={clsx("xv-dialog", `xv-dialog--${type}`, className)}>
        <div className="xv-dialog__inner">
          {children}
        </div>
      </dialog>
    </DialogContext.Provider>
  );
};

Dialog.displayName = "Dialog";
Dialog.Header = DialogHeader;
Dialog.Content = DialogContent;
Dialog.Actions = DialogActions;

export { Dialog };