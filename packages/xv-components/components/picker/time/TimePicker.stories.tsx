import type { Meta, StoryObj } from "@storybook/react";
import { TimePicker, TimeValue } from "./TimePicker";
import { useState } from "react";

const meta: Meta<typeof TimePicker> = {
  title: "Components/Picker/Time",
  component: TimePicker,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  decorators: [
    (Story) => (
      <div style={{ padding: "24px" }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    label: {
      control: "text",
      description: "Label for the time picker.",
    },
    description: {
      control: "text",
      description: "Helper text shown below the label.",
    },
    placeholder: {
      control: "text",
      description: "Placeholder text.",
    },
    hour12: {
      control: "boolean",
      description: "Whether to use 12-hour format.",
      table: { defaultValue: { summary: "false" } },
    },
    minuteStep: {
      control: "select",
      options: [1, 5, 10, 15, 30],
      description: "Minute step increment.",
      table: { defaultValue: { summary: "1" } },
    },
    disabled: {
      control: "boolean",
      description: "Disables the time picker.",
      table: { defaultValue: { summary: "false" } },
    },
   
    value: { table: { disable: true } },
    onChange: { table: { disable: true } },
    presets: { table: { disable: true } },
    className: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof TimePicker>;

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState<TimeValue | undefined>(undefined);
    return <TimePicker {...args} value={value} onChange={setValue} />;
  },
  args: {
    label: "Time",
    description: "",
    placeholder: "Select time",
    minuteStep: 5,
    hour12: false,
    error: "",
    disabled: false
  },
};