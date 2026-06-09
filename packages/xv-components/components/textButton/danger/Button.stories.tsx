import type { Meta, StoryObj } from "@storybook/react";
import { DangerTextButton } from "./Button";
import { Icon } from "../../icon";
import { StatusDot } from "../../statusDot/StatusDot";

const leadingSlotOptions = {
  icon: <Icon name="clock" size="small" />,
};

const trailingSlotOptions = {
  icon: <Icon name="chevronDown" size="small" />,
  statusDot: <StatusDot status="info" />,
};

const meta: Meta<typeof DangerTextButton> = {
  title: "Components/TextButton/Danger",
  component: DangerTextButton,
  parameters: {layout: "centered"},
  tags: ["autodocs"],
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
type Story = StoryObj<typeof DangerTextButton>;

export const Default: Story = {
  args: {
    label: "Button",
    leadingSlot: "",
    trailingSlot: "",
    disabled: false,
    disabledReason: ""
  }
};