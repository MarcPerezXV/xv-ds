import { forwardRef } from "react";
import { BaseInput, BaseInputProps } from "../_base/Base";
import { Icon } from "../../icon";
import { GhostIconButton } from "../../button";
import { useDSLocale } from "../../../provider/DSContext";

export interface SearchInputProps extends Omit<BaseInputProps, "type"> {
  onClear?: () => void;
}

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  ({ onClear, value, onChange, className, ...props }, ref) => {
    const locale = useDSLocale();

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
                altText={locale.clearSearch}
                description={locale.clearSearch}
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