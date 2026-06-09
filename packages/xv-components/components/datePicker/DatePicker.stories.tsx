import type { Meta, StoryObj } from "@storybook/react";
import { DatePicker, DatePickerValue } from "./DatePicker";
import { useState } from "react";
import { startOfToday, startOfTomorrow, addDays } from "date-fns";

const meta: Meta<typeof DatePicker> = {
  title: "Components/DatePicker/Single",
  component: DatePicker,
  tags: ["autodocs"],
  decorators: [
  (Story) => (
    <div style={{ padding: "24px" }}>
      <Story />
    </div>
  ),
],
  parameters: { layout: "fullscreen" },
  argTypes: {
    label: {
      control: "text",
      description: "Label for the date picker.",
    },
    description: {
      control: "text",
      description: "Helper text shown below the label.",
    },
    placeholder: {
      control: "text",
      description: "Placeholder text.",
    },
    disableFuture: {
  control: "boolean",
  description: "Disables future dates.",
  table: { defaultValue: { summary: "false" } },
},
   
    hour12: {
      control: "boolean",
      description: "Whether to use 12-hour format.",
      table: { defaultValue: { summary: "false" } },
      if: { arg: "showTime", truthy: true },
    },
    minuteStep: {
      control: "select",
      options: [1, 5, 10, 15, 30],
      description: "Minute step increment.",
      table: { defaultValue: { summary: "1" } },
      if: { arg: "showTime", truthy: true },
    },
    disabled: {
      control: "boolean",
      description: "Disables the date picker.",
      table: { defaultValue: { summary: "false" } },
    },
    clearLabel: {
      control: "text",
      description: "Tooltip label for the clear button.",
    },
    dateFormat: {
      control: "text",
      description: "Date format string (date-fns).",
      table: { defaultValue: { summary: "dd/MM/yyyy" } },
    },
    showTime: { table: {disable: true }},
    value: { table: { disable: true } },
    onChange: { table: { disable: true } },
    presets: { table: { disable: true } },
    className: {table: {disable: true}},
    weekStartsOn: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof DatePicker>;

export const DateOnly: Story = {
  render: (args) => {
    const [value, setValue] = useState<DatePickerValue | undefined>(undefined);
    return <DatePicker {...args} value={value} onChange={setValue} />;
  },
  args: {
    label: "Date",
    description: "",
    placeholder: "Select date",
    showTime: false,
    dateFormat: "dd/MM/yyyy",
    disableFuture: false,
    
    clearLabel: "Clear",
    error: "",
    disabled: false
  },
};

export const DateTime: Story = {
  render: (args) => {
    const [value, setValue] = useState<DatePickerValue | undefined>(undefined);
    return <DatePicker {...args} value={value} onChange={setValue} />;
  },
  args: {
    label: "Date and time",
    description: "",
    showTime: true,
    placeholder: "Select datetime",
    dateFormat: "dd/MM/yyyy",
    disableFuture: false,
    
    clearLabel: "Clear",
    minuteStep: 5,
    hour12: false,
    error: "",
    disabled: false,
    presets: [
      { label: "Today noon", value: { date: startOfToday(), time: { hours: 12, minutes: 0 } } },
      { label: "Tomorrow morning", value: { date: startOfTomorrow(), time: { hours: 9, minutes: 0 } } },
    ],
  },
};