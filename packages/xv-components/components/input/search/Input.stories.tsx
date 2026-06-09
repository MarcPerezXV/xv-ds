import type { Meta, StoryObj } from "@storybook/react";
import { SearchInput } from "./Input";
import { useState } from "react";
import { DSProvider } from "../../../provider/DSProvider";

const meta: Meta<typeof SearchInput> = {
  title: "Components/Input/Search",
  component: SearchInput,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    label: {
      control: "text",
      description: "Input label.",
    },
    description: {
      control: "text",
      description: "Helper text shown below the label.",
    },
    error: {
      control: "text",
      description: "Error message shown below the input.",
    },
    disabled: {
      control: "boolean",
      description: "Disables the input.",
      table: { defaultValue: { summary: "false" } },
    },
    placeholder: {
      control: "text",
      description: "Placeholder text.",
    },
    onClear: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof SearchInput>;

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState("");
    return (
      
      <SearchInput
        {...args}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onClear={() => setValue("")}
      />
      
    );
  },
  args: {
    label: "Label",
    placeholder: "Search...",
    description: "",
    error: "",
    disabled: false
  },
};