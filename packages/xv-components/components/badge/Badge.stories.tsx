import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "./Badge";


const meta: Meta<typeof Badge> = {
  title: "Components/Badge",
  component: Badge,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    color: {
      control: "select",
      options: [
        "red-high",
        "red-medium",
        "red-low",
        "yellow",
        "orange",
        "green",
        "blue",
      ],
    },
  },
};

export default meta;

type Story = StoryObj<typeof Badge>;

export const WithIcon: Story = {
  args: {
    color: "red-high",
    icon: "xmark-square",
  },
};

export const WithCount: Story = {
  args: {
    color: "blue",
    count: 3,
  },
};