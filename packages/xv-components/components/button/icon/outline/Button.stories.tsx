import type { Meta, StoryObj } from "@storybook/react";
import { OutlineIconButton } from "./Button";

const meta: Meta<typeof OutlineIconButton> = {
  title: "Components/Button/Icon/Outline",
  component: OutlineIconButton,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    icon: {
      control: "select",
      options: ["close", "trash", "chevron-down", "calendar-days", "clock"],
      description: "The icon to display.",
      table: { type: { summary: "IconName" } },
    },
    description: {
      control: "text",
      description: "Tooltip content shown on hover.",
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
    
    size: { table: { disable: true } },
    tooltipPosition: {
      control: "radio",
      options: ["top", "bottom", "left", "right"],
      description: "Position of the tooltip relative to the button.",
      table: { defaultValue: { summary: "top" } },
    },

    altText: {
      control: "text",
      description: "Accessible label for screen readers.",
    },
  },
};
export default meta;
type Story = StoryObj<typeof OutlineIconButton>;

export const Default: Story = {
  args: {
    icon: "close",
    altText: "Close",
    description: "",
    tooltipPosition: "top",
    active: false,
    disabled: false,
    disabledReason: ""
  },
};