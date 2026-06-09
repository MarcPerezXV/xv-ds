import type { Meta, StoryObj } from "@storybook/react";
import { Tag } from "./Tag";

const meta: Meta<typeof Tag> = {
  title: "Components/Tag",
  component: Tag,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    label: {
      control: "text",
      description: "Tag label.",
    },
    type: {
      control: "radio",
      options: ["redHigh", "redMedium", "redLow", "yellow", "blue", "orange", "green", "gray"],
      description: "Visual style of the tag.",
    },
    closable: {
      control: "boolean",
      description: "Whether the tag can be closed.",
      table: { defaultValue: { summary: "false" } },
    },
     closeLabel: {
      control: "text",
      description: "Tooltip label for the close button.",
      table: { defaultValue: { summary: "Close tag" } },
      if: { arg: "closable", truthy: true },
    },
    onClose: { table: { disable: true } },
    className: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof Tag>;

export const Default: Story = {
  args: {
    label: "Tag",
    type: "blue",
     closable: false,
    closeLabel: "Close tag"
  },
};
