import type { Meta, StoryObj } from "@storybook/react";
import { Checkbox } from "./Checkbox";
import { useState } from "react";

const meta: Meta<typeof Checkbox> = {
  title: "Components/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    label: {
      control: "text",
      description: "Checkbox label.",
    },
    description: {
      control: "text",
      description: "Helper text shown below the label.",
    },
   
    indeterminate: {
      control: "boolean",
      description: "Indeterminate state.",
      table: { defaultValue: { summary: "false" } },
    },
    disabled: {
      control: "boolean",
      description: "Disables the checkbox.",
      table: { defaultValue: { summary: "false" } },
    },
    disabledReason: {
      control: "text",
      description: "Tooltip content shown when disabled.",
      if: { arg: "disabled", truthy: true },
    },
    onChange: { table: { disable: true } },
    checked: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;


export const Default: Story = {
  render: (args) => {
    const [checked, setChecked] = useState(false);
    return <Checkbox {...args} checked={checked} onChange={setChecked} />;
  },
   args: {
    label: "Label",
    description: "",
    indeterminate: false,
    disabled: false,
    disabledReason: "",
  },
};