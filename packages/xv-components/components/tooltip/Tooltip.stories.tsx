import type { Meta, StoryObj } from "@storybook/react";
import { Tooltip } from "./Tooltip";

const meta: Meta<typeof Tooltip> = {
  title: "Components/Tooltip",
  component: Tooltip,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    content: {
      control: "text",
      description: "Tooltip content.",
    },
    placement: {
      control: "radio",
      options: ["top", "bottom", "left", "right"],
      description: "Position of the tooltip relative to the trigger.",
      table: { defaultValue: { summary: "top" } },
    },
    children: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  render: (args) => (
    <Tooltip {...args}>
      <button>Hover me</button>
    </Tooltip>
  ),
  args: {
    content: "Tooltip content",
    placement: "top",
  },
};