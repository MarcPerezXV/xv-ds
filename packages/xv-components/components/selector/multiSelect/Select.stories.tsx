import type { Meta, StoryObj } from "@storybook/react";
import { MultiSelect } from "./Select";
import { useState } from "react";

const options = [
  { id: "1", label: "Option 1" },
  { id: "2", label: "Option 2" },
  { id: "3", label: "Option 3" },
  { id: "4", label: "Option 4" },
  { id: "5", label: "Option 5" },
];

const meta: Meta<typeof MultiSelect> = {
  title: "Components/Select/Multi",
  component: MultiSelect,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    label: {
      control: "text",
      description: "Select label.",
    },
    description: {
      control: "text",
      description: "Helper text shown below the label.",
    },
    disabled: {
    control: "boolean",
    description: "Disables the select.",
    table: { defaultValue: { summary: "false" } },
  },
  error: {
    control: "text",
    description: "Error message shown below the select.",
  },
    options: { table: { disable: true } },
    value: { table: { disable: true } },
    onChange: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof MultiSelect>;

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState<string[]>([]);
    return (
      <MultiSelect
        {...args}
        options={options}
        value={value}
        onChange={setValue}
      />
    );
  },
  args: {
    label: "Label",
    description: "",
    error: "",
    disabled: false
  },
};