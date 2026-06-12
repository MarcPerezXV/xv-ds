import type { Meta, StoryObj } from "@storybook/react";
import { PrimaryIconButton } from "./Button";

const meta: Meta<typeof PrimaryIconButton> = {
  title: "Components/Button/Icon/Primary",
  component: PrimaryIconButton,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    icon: {
      control: "select",
      options: ["close", "trash", "chevronDown", "calendar", "clock"],
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
    tooltipPosition: {
      control: "radio",
      options: ["top", "bottom", "left", "right"],
      description: "Position of the tooltip relative to the button.",
      table: { defaultValue: { summary: "top" } },
    },
    size: { table: { disable: true } },
    altText: {
      control: "text",
      description: "Accessible label for screen readers.",
    },
  },
};

export default meta;
type Story = StoryObj<typeof PrimaryIconButton>;

export const Default: Story = {
  args: {
    icon: "close",
    altText: "Close",
    description: "",
    tooltipPosition: "top",
    disabled: false,
    disabledReason: ""
  },
};
