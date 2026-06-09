import type { Meta, StoryObj } from "@storybook/react";
import { Switch } from "./Switch";
import { useState } from "react";

const meta: Meta<typeof Switch> = {
  title: "Components/Switch",
  component: Switch,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    label: {
      control: "text",
      description: "Switch label.",
    },
    description: {
      control: "text",
      description: "Helper text shown below the label.",
    },
    
    disabled: {
      control: "boolean",
      description: "Disables the switch.",
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
type Story = StoryObj<typeof Switch>;


export const Default: Story = {
  render: (args) => {
    const [checked, setChecked] = useState(false);
    return <Switch {...args} checked={checked} onChange={setChecked} />;
  },
   args: {
    label: "Label",
    description: "",
    disabled: false,
    disabledReason: ""
  },
};