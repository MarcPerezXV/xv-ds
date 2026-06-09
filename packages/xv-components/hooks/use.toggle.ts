import { useState } from "react";

export interface UseToggleOptions {
  defaultValue?: boolean;
}

export interface UseToggleReturn {
  value: boolean;
  setValue: (value: boolean) => void;
  toggle: () => void;
  setTrue: () => void;
  setFalse: () => void;
}

export const useToggle = ({
  defaultValue = false,
}: UseToggleOptions = {}): UseToggleReturn => {
  const [value, setValue] = useState(defaultValue);

  const toggle = () => {
    setValue((previous) => !previous);
  };

  const setTrue = () => {
    setValue(true);
  };

  const setFalse = () => {
    setValue(false);
  };

  return {
    value,
    setValue,
    toggle,
    setTrue,
    setFalse,
  };
};