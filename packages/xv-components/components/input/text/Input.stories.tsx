import type { Meta, StoryObj } from "@storybook/react";
import { TextInput } from "./Input";

const meta: Meta<typeof TextInput> = {
  title: "Components/Input/Text",
  component: TextInput,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    controls: { sort: "none"}
  },
  argTypes: {
    label: {
      control: "text",
      description: "Input label.",
    
    },
    description: {
      control: "text",
      description: "Helper text shown below the label.",
     
    },
    placeholder: {
      control: "text",
      description: "Placeholder text.",
      
    },
    error: {
      control: "text",
      description: "Error message shown below the input.",
     
    },
    disabled: {
      control: "boolean",
      description: "Disables the input.",
      table: { defaultValue: { summary: "false" }},
      
    }
  },
};

export default meta;
type Story = StoryObj<typeof TextInput>;

export const Default: Story = {
  args: {
    label: "Label",
    placeholder: "Enter text...",
    description: "",
    error: "",
    disabled: false
  },
};
