import { useSelect } from "downshift";
import { BaseSelect, type SelectOption } from "../_base/Base";
import { CheckboxControl } from "../../checkbox/CheckboxControl";

interface MultiSelectProps {
  label: string;
  description?: string;
  options: SelectOption[];
  value: string[];
  onChange: (value: string[]) => void;
  clearLabel?: string;
  disabled?: boolean;
  error?: string;
}

export const MultiSelect = ({
  label,
  description,
  options,
  value,
  onChange,
  clearLabel,
  disabled,
  error
}: MultiSelectProps) => {
  const selectedItems = options.filter((item) => value.includes(item.id));

  const {
    isOpen,
    highlightedIndex,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    getItemProps,
  } = useSelect({
    items: options,

    itemToString: (item) => item?.label ?? "",

    selectedItem: null,

    onSelectedItemChange: ({ selectedItem }) => {
      if (!selectedItem) return;

      if (value.includes(selectedItem.id)) {
        onChange(value.filter((id) => id !== selectedItem.id));
      } else {
        onChange([...value, selectedItem.id]);
      }
    },

    scrollIntoView: (node) => {
      node.scrollIntoView({ block: "nearest" });
    },

    stateReducer: (state, actionAndChanges) => {
      const { changes, type } = actionAndChanges;

      switch (type) {
        case useSelect.stateChangeTypes.ToggleButtonKeyDownEnter:
        case useSelect.stateChangeTypes.ToggleButtonKeyDownSpaceButton:
        case useSelect.stateChangeTypes.ItemClick:
          return {
            ...changes,
            isOpen: true,
            highlightedIndex: state.highlightedIndex,
          };

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
      className="xv-select--multi"
      label={label}
      description={description}
      options={options}
      isOpen={isOpen}
      highlightedIndex={highlightedIndex}
      getToggleButtonProps={getToggleButtonProps}
      getLabelProps={getLabelProps}
      getMenuProps={getMenuProps}
      getItemProps={getItemProps}
      disabled={disabled}
      error={error}
      hasValue={selectedItems.length > 0}
      onClear={() => onChange([])}
      isSelected={(item) => value.includes(item.id)}
      clearLabel={clearLabel}
      valueContent={
        selectedItems.length > 0 ? `${selectedItems.length} selected` : ""
      }
      renderOption={(item) => (
        <>
          <CheckboxControl checked={value.includes(item.id)} className="xv-select__checkbox"/>
          <span className="xv-select__option-label">{item.label}</span>
        </>
      )}
    />
  );
};

MultiSelect.displayName = "MultiSelect";
