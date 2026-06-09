import type { Meta, StoryObj } from "@storybook/react";
import { RadioButtonGroup } from "./RadioButtonGroup";
import { useState } from "react";

const options = [
  { value: "option1", label: "Option 1", description: "Description for option 1" },
  { value: "option2", label: "Option 2" },
  { value: "option3", label: "Option 3", disabled: true, disabledReason: "Not available" },
];

const meta: Meta<typeof RadioButtonGroup> = {
  title: "Components/RadioButtonGroup",
  component: RadioButtonGroup,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    orientation: {
      control: "radio",
      options: ["vertical", "horizontal"],
      description: "Layout orientation of the radio buttons.",
      table: { defaultValue: { summary: "vertical" } },
    },
    options: { table: { disable: true } },
    value: { table: { disable: true } },
    onChange: { table: { disable: true } },
    name: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof RadioButtonGroup>;

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState("option1");
    return (
      <RadioButtonGroup
        {...args}
        name="radio-group"
        options={options}
        value={value}
        onChange={setValue}
      />
    );
  },
  args: {
    orientation: "vertical",
  },
};