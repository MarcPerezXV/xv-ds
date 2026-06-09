import {
  arrow,
  autoUpdate,
  flip,
  offset,
  shift,
  useFloating,
} from "@floating-ui/react";

import { ReactNode, useRef, useState } from "react";

import "./styles.css";

export interface TooltipProps {
  content: string;

  children: ReactNode;

  placement?: "top" | "right" | "bottom" | "left";
}

export const Tooltip = ({
  content,

  children,

  placement = "top",
}: TooltipProps) => {
  const [open, setOpen] = useState(false);

  const arrowRef = useRef<HTMLDivElement | null>(null);

  const {
    refs,
    floatingStyles,
    middlewareData,
    placement: computedPlacement,
  } = useFloating({
    open,

    placement,

    strategy: "fixed",

    whileElementsMounted: autoUpdate,

    middleware: [
      offset(8),
      flip(),

      shift({padding: 8}),
      arrow({
        element: arrowRef,
      }),
    ],
  });

  type Side = "top" | "right" | "bottom" | "left";

  const side = computedPlacement.split("-")[0] as Side;

  const staticSide = {
    top: "bottom",

    bottom: "top",

    right: "left",

    left: "right",
  }[side];

  return (
    <>
      <span
        ref={refs.setReference}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        className="xv-tooltip__trigger"
      >
        {children}
      </span>

      {open && (
        <div
          ref={refs.setFloating}
          style={floatingStyles}
          role="tooltip"
          className="xv-tooltip"
        >
          <p className="xv-tooltip__content"> {content} </p>

          <div
            ref={arrowRef}
            className="xv-tooltip__arrow"
            style={{
              left:
                middlewareData.arrow?.x != null
                  ? `${middlewareData.arrow.x}px`
                  : undefined,

              top:
                middlewareData.arrow?.y != null
                  ? `${middlewareData.arrow.y}px`
                  : undefined,

              [staticSide]: "-3px",
            }}
          />
        </div>
      )}
    </>
  );
};
