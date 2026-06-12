import type { Meta, StoryObj } from "@storybook/react";
import { NumericRangeInput, RangeValue } from "./NumericRange";
import { useState } from "react";

const meta: Meta<typeof NumericRangeInput> = {
  title: "Components/Input/NumericRange",
  component: NumericRangeInput,
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

    value: { table: { disable: true } },
    onChange: { table: { disable: true } },
    className: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof NumericRangeInput>;

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState<RangeValue | undefined>(undefined);
    return <NumericRangeInput {...args} value={value} onChange={setValue} />;
  },
  args: {
    label: "Range picker",
    description: "",
    min: 0,
    max: 200,
    step: 10,
    mode: "both",
    error: "",
    disabled: false
  },
};