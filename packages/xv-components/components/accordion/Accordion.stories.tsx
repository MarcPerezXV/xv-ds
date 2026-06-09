import type { Meta, StoryObj } from "@storybook/react";
import { Accordion } from "./Accordion";

const meta: Meta<typeof Accordion> = {
  title: "Components/Accordion",
  component: Accordion,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    value: { table: { disable: true } },
    defaultValue: { table: { disable: true } },
    onValueChange: { table: { disable: true } },
    className: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof Accordion>;

export const Default: Story = {
  render: () => (
    <div style={{ width: "400px" }}>
      <Accordion defaultValue="1">
        <Accordion.Item value="1" title="First item">
          <p style={{ margin: 0, padding: 12}}>Content for the first item.</p>
        </Accordion.Item>
        <Accordion.Item value="2" title="Second item">
          <p style={{ margin: 0, padding: 12 }}>Content for the second item.</p>
        </Accordion.Item>
        <Accordion.Item value="3" title="Third item">
          <p style={{ margin: 0, padding: 12 }}>Content for the third item.</p>
        </Accordion.Item>
      </Accordion>
    </div>
  ),
};