// hooks/usePopover.ts
import { useState, useEffect, useRef } from "react";
import {
  useFloating,
  flip,
  shift,
  offset,
  autoUpdate,
  size,
  Placement,
} from "@floating-ui/react";

interface UsePopoverOptions {
  placement?: Placement;
  matchReferenceWidth?: boolean;
}

export const usePopover = ({
  placement = "bottom-start",
  matchReferenceWidth = false,
}: UsePopoverOptions = {}) => {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const { refs, floatingStyles } = useFloating({
    open: isOpen,
    placement,
    strategy: "fixed",
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(4),
      flip(),
      shift({ padding: 8 }),
      ...(matchReferenceWidth
        ? [
            size({
              apply({ rects, elements }) {
                Object.assign(elements.floating.style, {
                  width: `${rects.reference.width}px`,
                });
              },
            }),
          ]
        : []),
    ],
  });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const toggle = () => setIsOpen((prev) => !prev);
  const close = () => setIsOpen(false);
  const open = () => setIsOpen(true);

  return {
    isOpen,
    toggle,
    close,
    open,
    wrapperRef,
    refs,
    floatingStyles,
  };
};