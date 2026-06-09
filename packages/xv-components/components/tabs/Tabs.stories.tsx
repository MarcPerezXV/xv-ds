import type { Meta, StoryObj } from "@storybook/react";
import { Tabs } from "./Tabs";
import { useState } from "react";

const tabs = [
  { value: "overview", label: "Overview" },
  { value: "settings", label: "Settings" },
  { value: "activity", label: "Activity", disabled: true, disabledReason: "Coming soon" },
];

const meta: Meta<typeof Tabs> = {
  title: "Components/Tabs",
  component: Tabs,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    tabs: { table: { disable: true } },
    value: { table: { disable: true } },
    onValueChange: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof Tabs>;

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState("overview");
    return <Tabs {...args} tabs={tabs} value={value} onValueChange={setValue} />;
  },
};