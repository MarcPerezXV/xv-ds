import { forwardRef } from "react";
import { BaseInput, BaseInputProps } from "../_base/Base";

import { GhostIconButton } from "../../iconButton";
import { Icon } from "../../icon";

export interface SearchInputProps extends Omit<BaseInputProps, "type"> {
  clearLabel?: string;
  onClear?: () => void;
}

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  ({ clearLabel, onClear, value, onChange, className, ...props }, ref) => {
    return (
      <BaseInput
        ref={ref}
        {...props}
        type="search"
        value={value}
        onChange={onChange}
        className={className}
        trailingSlot={
          <>
            {value && onClear && (
              <GhostIconButton
                icon="close"
                altText={clearLabel ?? "Clear"}
                description={clearLabel ?? "Clear"}
                size="small"
                onClick={onClear}
              />
            )}
            <Icon name="search" size="small" />
          </>
        }
      />
    );
  }
);

SearchInput.displayName = "SearchInput";