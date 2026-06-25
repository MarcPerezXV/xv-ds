import {
    ReactNode,
    useEffect,
    useRef,
    createContext,
    useContext,
    useCallback,
} from "react";
import { clsx } from "clsx";
import { GhostIconButton } from "../iconButton";
import { GhostTextButton } from "../textButton";
import { Icon } from "../icon";
import { useDSLocale } from "../../provider/DSContext";
import "./styles.css";

export type ToastType =
    | "informative"
    | "positive"
    | "neutral"
    | "negative"
    | "warning";

export interface ToastAction {
    label: string;
    onClick: () => void;
}

export interface ToastProps {
    open: boolean;
    onClose: () => void;
    type?: ToastType;
    message: string;
    action?: ToastAction;
    closable?: boolean;
    className?: string;
    /**
     * Auto-dismiss delay in ms.
     * Pass `0` or omit to disable auto-dismiss.
     * Default: 5000 ms when no `action` is provided, 0 when an action exists.
     */
    duration?: number;
}

interface ToastContextValue {
    type: ToastType;
    onClose: () => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

const useToastContext = () => {
    const ctx = useContext(ToastContext);
    if (!ctx) throw new Error("Toast sub-components must be used inside <Toast>");
    return ctx;
};

const iconMap: Record<ToastType, string> = {
    informative: "infoSquare",
    positive: "checkCircle",
    neutral: "infoSquare",
    negative: "xMarkSquare",
    warning: "warning",
};


const ToastIcon = () => {
    const { type } = useToastContext();
    const locale = useDSLocale();

    return (
        <Icon
            name={iconMap[type]}
            size="small"
            className={clsx("xv-toast__icon", `xv-toast__icon--${type}`)}
            aria-hidden="true"
            alt-text={locale.closeDialog}
        />
    );
};

ToastIcon.displayName = "ToastIcon";

const ToastMessage = ({ children }: { children: ReactNode }) => (
    <span className="xv-toast__message">{children}</span>
);

ToastMessage.displayName = "ToastMessage";

const ToastActionButton = ({
    label,
    onClick,
}: {
    label: string;
    onClick: () => void;
}) => (
    <>
        <span className="xv-toast__separator" aria-hidden="true" />
        <GhostTextButton
            label={label}
            onClick={onClick}
            className="xv-toast__action-btn"
        />
    </>
);

ToastActionButton.displayName = "ToastActionButton";

const ToastCloseButton = () => {
    const { onClose } = useToastContext();
    const locale = useDSLocale();
    return (
        <>
            <span className="xv-toast__separator" aria-hidden="true" />
            <GhostIconButton
                icon="close"
                altText={locale.closeDialog}
                className="xv-toast__close-btn"
                onClick={onClose}
            />
        </>
    );
};

ToastCloseButton.displayName = "ToastCloseButton";

const Toast = ({
    open,
    onClose,
    type = "informative",
    message,
    action,
    closable = true,
    className,
    duration,
}: ToastProps) => {
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    // Resolve auto-dismiss duration:
    // • explicit prop wins
    // • default to 5 s when no action button; 0 (disabled) when action exists
    const resolvedDuration =
        duration !== undefined ? duration : action ? 0 : 5000;

    const handleClose = useCallback(() => {
        onClose();
    }, [onClose]);

    // Auto-dismiss timer
    useEffect(() => {
        if (!open || resolvedDuration <= 0) return;

        timerRef.current = setTimeout(handleClose, resolvedDuration);

        return () => {
            if (timerRef.current) clearTimeout(timerRef.current);
        };
    }, [open, resolvedDuration, handleClose]);

    if (!open) return null;

    return (
        <ToastContext.Provider value={{ type, onClose: handleClose }}>
            <div
                role="status"
                aria-live="polite"
                aria-atomic="true"
                className={clsx(
                    "xv-toast",
                    `xv-toast--${type}`,
                    className
                )}
            >
                <ToastIcon />

                <ToastMessage>{message}</ToastMessage>

                {action && (
                    <ToastActionButton label={action.label} onClick={action.onClick} />
                )}

                {closable && <ToastCloseButton />}
            </div>
        </ToastContext.Provider>
    );
};

Toast.displayName = "Toast";

// Attach sub-components
Toast.Icon = ToastIcon;
Toast.Message = ToastMessage;
Toast.ActionButton = ToastActionButton;
Toast.CloseButton = ToastCloseButton;

export { Toast };
