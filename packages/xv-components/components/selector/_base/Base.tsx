import { ReactNode } from "react";
import { clsx } from "clsx";
import { useSelect } from "downshift";
import { useFloating, flip, shift, offset, autoUpdate, size } from "@floating-ui/react";
import { useDSLocale } from "../../../provider/DSContext";

import "./styles.css";
import { GhostIconButton } from "../../iconButton";
import { Icon } from "../../icon";

export interface SelectOption {
  id: string;
  label: string;
}

type UseSelectReturn = ReturnType<typeof useSelect<SelectOption>>;

interface BaseSelectProps {
  className?: string;
  label: string;
  description?: string;
  options: SelectOption[];
  isOpen: boolean;
  highlightedIndex: number;
  getToggleButtonProps: UseSelectReturn["getToggleButtonProps"];
  getLabelProps: UseSelectReturn["getLabelProps"];
  getMenuProps: UseSelectReturn["getMenuProps"];
  getItemProps: UseSelectReturn["getItemProps"];
  hasValue: boolean;
  onClear: () => void;
  isSelected: (item: SelectOption) => boolean;
  valueContent: ReactNode;
  renderOption: (item: SelectOption, index: number) => ReactNode;
  disabled?: boolean;
  error?: string;
}

export const BaseSelect = ({
  className,
  label,
  description,
  options,
  isOpen,
  highlightedIndex,
  getToggleButtonProps,
  getLabelProps,
  getMenuProps,
  getItemProps,
  hasValue,
  onClear,
  isSelected,
  valueContent,
  renderOption,
  disabled,
  error,
}: BaseSelectProps) => {
  const locale = useDSLocale();

  const { refs, floatingStyles } = useFloating({
    open: isOpen,
    placement: "bottom-start",
    strategy: "fixed",
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(4),
      flip(),
      shift({ padding: 8 }),
      size({
        apply({ rects, elements }) {
          Object.assign(elements.floating.style, {
            width: `${rects.reference.width}px`,
          });
        },
      }),
    ],
  });

  return (
    <div className={clsx("xv-select", className)}>
      <div className="xv-select__info-zone">
        <label className="xv-select__label" {...getLabelProps()}>
          {label}
        </label>
        {description && <p className="xv-select__description">{description}</p>}
      </div>

      <div className="xv-select__control-wrapper" ref={refs.setReference}>
        <button
          type="button"
          disabled={disabled}
          className={clsx(
            "xv-select__control",
            isOpen && "xv-select__control--active",
            error && "xv-select__control--error",
          )}
          {...getToggleButtonProps()}
        >
          <span className="xv-select__control-value">{valueContent}</span>
        </button>

        {hasValue && !disabled && (
          <div className="xv-select__clear-wrapper">
            <GhostIconButton
              icon="close"
              altText={locale.clearSelection}
              description={locale.clearSelection}
              size="small"
              onClick={(event) => {
                event.stopPropagation();
                onClear();
              }}
            />
          </div>
        )}

        <Icon
          name="chevronDown"
          size="small"
          className={clsx(
            "xv-select__chevron",
            isOpen && "xv-select__chevron--open"
          )}
        />
      </div>

      {error && (
        <div className="xv-select__error">
          <Icon name="xMarkSquare" size="small" />
          {error}
        </div>
      )}

      <ul
        {...getMenuProps({ ref: refs.setFloating })}
        className="xv-select__options"
        style={isOpen ? floatingStyles : undefined}
        hidden={!isOpen}
      >
        {isOpen &&
          options.map((item, index) => (
            <li
              key={item.id}
              className={clsx(
                "xv-select__option-item",
                highlightedIndex === index && "xv-select__option-item--highlighted",
                isSelected(item) && "xv-select__option-item--selected",
              )}
              {...getItemProps({ item, index })}
            >
              {renderOption(item, index)}
            </li>
          ))}
      </ul>
    </div>
  );
};

BaseSelect.displayName = "BaseSelect";