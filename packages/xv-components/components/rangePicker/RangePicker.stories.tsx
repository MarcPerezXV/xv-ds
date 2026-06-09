import type { Meta, StoryObj } from "@storybook/react";
import { RangeInput, RangeValue } from "./RangePicker";
import { useState } from "react";

const meta: Meta<typeof RangeInput> = {
  title: "Components/RangePicker",
  component: RangeInput,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    label: {
      control: "text",
      description: "Label for the range input.",
    },
    description: {
      control: "text",
      description: "Helper text shown below the label.",
    },
    min: {
      control: "number",
      description: "Minimum value of the range.",
    },
    max: {
      control: "number",
      description: "Maximum value of the range.",
    },
    step: {
      control: "number",
      description: "Step increment.",
      table: { defaultValue: { summary: "1" } },
    },
    mode: {
      control: "radio",
      options: ["both", "from", "to"],
      description: "Which end of the range is adjustable.",
      table: { defaultValue: { summary: "both" } },
    },
    disabled: {
      control: "boolean",
      description: "Disables the range input.",
      table: { defaultValue: { summary: "false" } },
    },
    clearLabel: {
      control: "text",
      description: "Tooltip label for the clear button.",
      table: { defaultValue: { summary: "Clear" } },
    },
    value: { table: { disable: true } },
    onChange: { table: { disable: true } },
    className: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof RangeInput>;

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState<RangeValue | undefined>(undefined);
    return <RangeInput {...args} value={value} onChange={setValue} />;
  },
  args: {
    label: "Range picker",
    description: "",
    min: 0,
    max: 200,
    step: 10,
    mode: "both",
    clearLabel: "Clear",
    error: "",
    disabled: false
  },
};