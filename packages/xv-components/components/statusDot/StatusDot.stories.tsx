import type { Meta, StoryObj } from "@storybook/react";
import { StatusDot } from "./StatusDot";

const meta: Meta<typeof StatusDot> = {
  title: "Components/StatusDot",
  component: StatusDot,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    tone: {
      control: "radio",
      options: ["gray", "blue", "green", "yellow", "orange", "red-high", "red-med", "red-low"],
      description: "Visual status of the dot.",
      table: { defaultValue: { summary: "gray" } },
    },
  },
};

export default meta;
type Story = StoryObj<typeof StatusDot>;

export const Default: Story = {
  args: {
    tone: "gray",
  },
};