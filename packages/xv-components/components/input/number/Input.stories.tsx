import type { Meta, StoryObj } from "@storybook/react";
import { NumberInput } from "./Input";

const meta: Meta<typeof NumberInput> = {
  title: "Components/Input/Number",
  component: NumberInput,
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
    },
    min: {
      control: "number",
      description: "Minimum value.",
    },
    max: {
      control: "number",
      description: "Maximum value.",
    },
    step: {
      control: "number",
      description: "Step increment.",
      table: { defaultValue: { summary: "1" } },
    },
  },
};

export default meta;
type Story = StoryObj<typeof NumberInput>;

export const Default: Story = {
  args: {
    label: "Label",
    placeholder: "1234",
    description: "",
    min: 0,
    max: 100,
    step: 1,
    error: "",
    disabled: false

  },
};