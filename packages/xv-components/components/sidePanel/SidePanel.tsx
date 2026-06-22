import { Children, isValidElement, ReactNode } from "react";
import { GhostIconButton } from "../button";
import "./styles.css";
import clsx from "clsx";
import { useControllableState } from "../../hooks/use.controllableState";


export interface SidePanelProps {
    children: ReactNode;
    collapsible?: boolean;
    collapsed?: boolean;
    defaultCollapsed?: boolean;
    onCollapsedChange?: (collapsed: boolean) => void;
    placement?: "left" | "right";
}

interface SidePanelContentProps {
  children: ReactNode;
  className?: string;
}



const SidePanelHeader = ({ title }: { title: string }) => (
    <div className="xv-side-panel__header">
        {title}
    </div>
);

SidePanelHeader.displayName = "SidePanelHeader";

const SidePanelContent = ({ children, className }: SidePanelContentProps) => (
    <div className="xv-side-panel__content">
        <div className={clsx("xv-side-panel__content-inner", className)}>
            {children}
        </div>
    </div>
)

type SidePanelComponent = React.FC<SidePanelProps> & {
    Header: typeof SidePanelHeader,
    Content: typeof SidePanelContent;
};



export const SidePanel = (({
    children,
    collapsible,
    collapsed: collapsedProp,
    defaultCollapsed,
    onCollapsedChange,
    placement = "left",
}: SidePanelProps) => {
    const [collapsed = false, setCollapsed] = useControllableState({
        value: collapsedProp,
        defaultValue: defaultCollapsed,
        onChange: onCollapsedChange,
    });

    const childArray = Children.toArray(children);

    const header = childArray.find(
        (child) =>
            isValidElement(child) &&
            child.type === SidePanelHeader
    );

    const content = childArray.filter(
        (child) =>
            !isValidElement(child) ||
            child.type == SidePanelContent
    );

    return (
        <div
            className={clsx(
                "xv-side-panel",
                `xv-side-panel--${placement}`,
                collapsed && "xv-side-panel--collapsed"
            )}
        >

            <div className="xv-side-panel__body">
                {header}

                {content}

            </div>



            {collapsible && (
                <div
                    className={clsx(
                        "xv-side-panel__closable-area",
                        `xv-side-panel__closable-area--${placement}`
                    )}
                >
                    <GhostIconButton
                        icon="chevron-left"
                        altText="Toggle side panel"
                        size="small"
                        tooltipPosition={placement === "left" ? "right" : "left"}
                        className={clsx(
                            "xv-side-panel__toggle-button",
                            collapsed && "xv-side-panel__toggle-button--collapsed",
                            `xv-side-panel__toggle-button--${placement}`
                        )}
                        onClick={() => setCollapsed(!collapsed)}
                    />
                </div>
            )}
        </div>
    );
}) as SidePanelComponent;

SidePanel.displayName = "SidePanel";

SidePanel.Header = SidePanelHeader;
SidePanel.Content = SidePanelContent;