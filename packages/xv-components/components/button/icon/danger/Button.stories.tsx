import type { Meta, StoryObj } from "@storybook/react";
import { DangerIconButton } from "./Button";

const meta: Meta<typeof DangerIconButton> = {
  title: "Components/Button/Icon/Danger",
  component: DangerIconButton,
  parameters: { layout: "centered", docs: {controls: { sort: "none"}} },
  tags: ["autodocs"],
  argTypes: {
    icon: {
      control: "select",
      options: ["close", "trash", "chevron-down", "calendar-days", "clock"],
      description: "The icon to display.",
      table: { type: { summary: "IconName" } },
    },

     altText: {
      control: "text",
      description: "Accessible label for screen readers.",
    },


    description: {
      control: "text",
      description: "Tooltip content shown on hover.",
    },
    disabled: {
      control: "boolean",
      description: "Disables the button.",
      table: {
        defaultValue: { summary: "false" },
      },
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
  
  },
};

export default meta;
type Story = StoryObj<typeof DangerIconButton>;

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
