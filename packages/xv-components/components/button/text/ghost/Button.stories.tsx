import type { Meta, StoryObj } from "@storybook/react";
import { GhostButton } from "./Button";
import { Icon } from "../../../icon";
import { StatusDot } from "../../../statusDot/StatusDot";

const leadingSlotOptions = {
  icon: <Icon name="clock" size="small" />,
};

const trailingSlotOptions = {
  icon: <Icon name="chevron-down" size="small" />,
  statusDot: <StatusDot status="danger" />,
};


const meta: Meta<typeof GhostButton> = {
  title: "Components/Button/Text/Ghost",
  component: GhostButton,
  tags: ["autodocs"],
  parameters: {layout: "centered"},
  argTypes: {
    label: {
      control: "text",
      description: "Button label.",
      table: { defaultValue: { summary: "Button"}}
    },
    disabled: {
      control: "boolean",
      description: "Disables the button.",
      table: { defaultValue: { summary: "false" } },
    },
    disabledReason: {
      control: "text",
      description: "Tooltip content shown when the button is disabled.",
      if: { arg: "disabled", truthy: true },
    },
    active: {
      control: "boolean",
      description: "Active state of the button.",
      table: { defaultValue: { summary: "false" } },
    },
    leadingSlot: {
      control: "select",
      options: Object.keys(leadingSlotOptions),
      mapping: leadingSlotOptions,
      description: "Content placed to the left of the label.",
    },
    trailingSlot: {
      control: "select",
      options: Object.keys(trailingSlotOptions),
      mapping: trailingSlotOptions,
      description: "Content placed to the right of the label.",
    },
  },
};

export default meta;
type Story = StoryObj<typeof GhostButton>;

export const Default: Story = {
  args: {
    label: "Button",
    leadingSlot: "",
    trailingSlot: "",
    active: false,
    disabled: false,
    disabledReason: ""
    
  }
};