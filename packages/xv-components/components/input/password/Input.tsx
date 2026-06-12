import { forwardRef, useState } from "react";
import { BaseInput, BaseInputProps } from "../_base/Base";
import { GhostIconButton } from "../../button";
import { useDSLocale } from "../../../provider/DSContext";

export interface PasswordInputProps extends Omit<BaseInputProps, "type"> {}

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const locale = useDSLocale();

    return (
      <BaseInput
        ref={ref}
        {...props}
        type={showPassword ? "text" : "password"}
        className={className}
        trailingSlot={
          <GhostIconButton
            icon={showPassword ? "eyeSlash" : "eye"}
            altText={showPassword ? locale.hidePassword : locale.showPassword}
            description={showPassword ? locale.hidePassword : locale.showPassword}
            size="small"
            onClick={() => setShowPassword((prev) => !prev)}
          />
        }
      />
    );
  }
);

PasswordInput.displayName = "PasswordInput";