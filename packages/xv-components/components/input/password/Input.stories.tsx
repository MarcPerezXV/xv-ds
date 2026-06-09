import type { Meta, StoryObj } from "@storybook/react";
import { PasswordInput } from "./Input";

const meta: Meta<typeof PasswordInput> = {
  title: "Components/Input/Password",
  component: PasswordInput,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    label: {
      control: "text",
      description: "Input label.",
    },
    description: {
      control: "text",
      description: "Helper text shown below the label.",
    },
    error: {
      control: "text",
      description: "Error message shown below the input.",
    },
    disabled: {
      control: "boolean",
      description: "Disables the input.",
      table: { defaultValue: { summary: "false" } },
    },
    placeholder: {
      control: "text",
      description: "Placeholder text.",
    }
  },
};

export default meta;
type Story = StoryObj<typeof PasswordInput>;

export const Default: Story = {
  args: {
    label: "Label",
    placeholder: "Enter password...",
    description: "",
    error: "",
    disabled: false
  },
};