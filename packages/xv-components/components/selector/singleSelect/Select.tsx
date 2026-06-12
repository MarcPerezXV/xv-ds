import { useSelect } from "downshift";
import { BaseSelect, type SelectOption } from "../_base/Base";


interface SingleSelectProps {
  label: string;
  description?: string;
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  error?: string;
}

export const SingleSelect = ({
  label,
  description,
  options,
  value,
  onChange,
  disabled,
  error,
}: SingleSelectProps) => {

  const selectedItem = options.find((item) => item.id === value) ?? null;

  const {
    isOpen,
    highlightedIndex,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    getItemProps,
  } = useSelect({
    items: options,
    selectedItem,
    itemToString: (item) => item?.label ?? "",
    onSelectedItemChange: ({ selectedItem }) => {
      if (!selectedItem) return;
      onChange(selectedItem.id);
    },
    scrollIntoView: (node) => {
      node.scrollIntoView({ block: "nearest" });
    },
    initialHighlightedIndex: 0,
    stateReducer: (state, actionAndChanges) => {
      const { changes, type } = actionAndChanges;
      switch (type) {
        case useSelect.stateChangeTypes.ToggleButtonKeyDownArrowDown:
          if (state.highlightedIndex === options.length - 1) {
            return { ...changes, highlightedIndex: 0 };
          }
          break;
        case useSelect.stateChangeTypes.ToggleButtonKeyDownArrowUp:
          if (state.highlightedIndex === 0) {
            return { ...changes, highlightedIndex: options.length - 1 };
          }
          break;
      }
      return changes;
    },
  });

  return (
    <BaseSelect
      label={label}
      description={description}
      options={options}
      isOpen={isOpen}
      highlightedIndex={highlightedIndex}
      getToggleButtonProps={getToggleButtonProps}
      getLabelProps={getLabelProps}
      getMenuProps={getMenuProps}
      getItemProps={getItemProps}
      hasValue={!!selectedItem}
      onClear={() => onChange("")}
      isSelected={(item) => item.id === value}
      valueContent={selectedItem?.label ?? ""}
      renderOption={(item) => (
        <span className="xv-select__option-label">{item.label}</span>
      )}
      disabled={disabled}
      error={error}
    />
  );
};

SingleSelect.displayName = "SingleSelect";