import { forwardRef, useState } from "react";
import { BaseInput, BaseInputProps } from "../_base/Base";
import { GhostIconButton } from "../../iconButton";



export interface PasswordInputProps extends Omit<BaseInputProps, "type"> {
  showPasswordLabel?: string;
  hidePasswordLabel?: string;
}

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, showPasswordLabel, hidePasswordLabel, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
      <BaseInput
        ref={ref}
        {...props}
        type={showPassword ? "text" : "password"}
        className={className}
        trailingSlot={
          <GhostIconButton
            icon={showPassword ? "eyeSlash" : "eye"}
            altText={showPassword ? (hidePasswordLabel ?? "Hide password") : (showPasswordLabel ?? "Show password")}
            description={showPassword ? (hidePasswordLabel ?? "Hide password") : (showPasswordLabel ?? "Show password")}
            size="small"
            onClick={() => setShowPassword((prev) => !prev)}
          />
        }
      />
    );
  }
);

PasswordInput.displayName = "PasswordInput";