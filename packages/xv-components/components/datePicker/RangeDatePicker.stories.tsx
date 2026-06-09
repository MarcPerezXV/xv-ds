import type { Meta, StoryObj } from "@storybook/react";
import { RangeDatePicker } from "./RangeDatePicker";
import { useState } from "react";
import { DateRange } from "react-day-picker";
import { subDays, startOfMonth, startOfYear } from "date-fns";

const meta: Meta<typeof RangeDatePicker> = {
  title: "Components/DatePicker/Range",
  component: RangeDatePicker,
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
      description: "Label for the date range picker.",
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
    disabled: {
      control: "boolean",
      description: "Disables the date picker.",
      table: { defaultValue: { summary: "false" } },
    },
    
    dateFormat: {
      control: "text",
      description: "Date format string (date-fns).",
      table: { defaultValue: { summary: "dd/MM/yyyy" } },
    },
    weekStartsOn: {
      control: "select",
      options: [0, 1, 2, 3, 4, 5, 6],
      description:
        "Day of the week the calendar starts on. 0 = Sunday, 1 = Monday, etc.",
      table: { defaultValue: { summary: "1" } },
    },
    value: { table: { disable: true } },
    onChange: { table: { disable: true } },
    presets: { table: { disable: true } },

    className: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof RangeDatePicker>;

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState<DateRange | undefined>(undefined);
    return <RangeDatePicker {...args} value={value} onChange={setValue} />;
  },
  args: {
    label: "Date range",
    description: "",
    placeholder: "Select range date",
    dateFormat: "dd/MM/yyyy",
    weekStartsOn: 1,
    
    disableFuture: false,
    error: "",
    disabled: false,

    presets: [
      {
        label: "Last 7 days",
        getRange: () => ({ from: subDays(new Date(), 7), to: new Date() }),
      },
      {
        label: "Last 30 days",
        getRange: () => ({ from: subDays(new Date(), 30), to: new Date() }),
      },
      {
        label: "This month",
        getRange: () => ({ from: startOfMonth(new Date()), to: new Date() }),
      },
      {
        label: "This year",
        getRange: () => ({ from: startOfYear(new Date()), to: new Date() }),
      },
    ],
  },
};
