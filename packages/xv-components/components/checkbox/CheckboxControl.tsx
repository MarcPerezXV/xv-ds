import "./styles.css";
import clsx from "clsx";

interface CheckboxControlProps {
  checked?: boolean;
  indeterminate?: boolean;
  className?: string
}

export const CheckboxControl = ({
  checked = false,
  indeterminate = false,
  className,
}: CheckboxControlProps) => {
  return (
    <span
      className={clsx(
        "xv-checkbox__control",
        checked && "xv-checkbox__control--checked",
        indeterminate && "xv-checkbox__control--indeterminate",
        className
      )}
    />
  );
};

CheckboxControl.displayName = "CheckboxControl";
