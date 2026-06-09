import { createContext, useContext, ReactNode } from "react";
import { useControllableState } from "../../hooks/use.controllableState";

import { clsx } from "clsx";

import "./styles.css";
import { Icon } from "../icon";

interface AccordionContextValue {
  value: string | undefined;
  onValueChange: (value: string) => void;
}

/* testing pipeline */

const AccordionContext = createContext<AccordionContextValue | null>(null);

const useAccordionContext = () => {
  const context = useContext(AccordionContext);
  if (!context) throw new Error("Accordion.Item must be used inside Accordion");
  return context;
};

export interface AccordionProps {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  children: ReactNode;
  className?: string;
}

export interface AccordionItemProps {
  value: string;
  title: string;
  children: ReactNode;
  className?: string;
}

const AccordionItem = ({ value, title, children, className }: AccordionItemProps) => {
  const { value: openValue, onValueChange } = useAccordionContext();
  const isOpen = openValue === value;

  const toggle = () => {
    onValueChange(isOpen ? "" : value);
  };

  return (
    <div className={clsx("xv-accordion__item", isOpen && "xv-accordion__item--open", className)}>
      <button
        type="button"
        className="xv-accordion__trigger"
        aria-expanded={isOpen}
        onClick={toggle}
      >
        <span className="xv-accordion__title">{title}</span>
        <Icon
          name="chevronDown"
          size="small"
          className="xv-accordion__chevron"
        />
      </button>

      <div className="xv-accordion__content-wrapper">
        <div className="xv-accordion__content">
          {children}
        </div>
      </div>
    </div>
  );
};

AccordionItem.displayName = "AccordionItem";

const Accordion = ({ value, defaultValue, onValueChange, children, className }: AccordionProps) => {
  const [currentValue, setValue] = useControllableState({
    value,
    defaultValue,
    onChange: onValueChange,
  });

  return (
    <AccordionContext.Provider value={{ value: currentValue, onValueChange: setValue }}>
      <div className={clsx("xv-accordion", className)}>
        {children}
      </div>
    </AccordionContext.Provider>
  );
};

Accordion.displayName = "Accordion";
Accordion.Item = AccordionItem;

export { Accordion };