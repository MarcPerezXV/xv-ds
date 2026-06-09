import type { Meta, StoryObj } from "@storybook/react";
import { Callout } from "./Callout";
import { GhostTextButton } from "../textButton";
import { Icon } from "../icon";

const meta: Meta<typeof Callout> = {
  title: "Components/Callout",
  component: Callout,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    type: {
      control: "radio",
      options: ["informative", "warning", "error"],
      description: "Visual style of the callout.",
      table: { defaultValue: { summary: "informative" } },
    },
    message: {
      control: "text",
      description: "Callout message.",
    },
    children: { table: { disable: true } },
    className: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof Callout>;

export const Default: Story = {
  args: {
    type: "informative",
    message: "Callout message will be displayed here",
  },
};

export const WithActions: Story = {
  render: (args) => (
    <Callout {...args}>
      <Callout.Actions>
        <GhostTextButton label="Action 01" leadingSlot={<Icon name="clock" size="small" />} />
        <GhostTextButton label="Action 02" leadingSlot={<Icon name="clock" size="small" />} />
      </Callout.Actions>
    </Callout>
  ),
  args: {
    type: "informative",
    message: "Callout message will be displayed here",
  },
};