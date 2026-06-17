import type { Meta, StoryObj } from "@storybook/react";
import { SidePanel } from "./SidePanel";
import { Accordion } from "../accordion/Accordion";

const meta: Meta<typeof SidePanel> = {
  title: "Components/SidePanel",
  component: SidePanel,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    collapsible: {
      control: "boolean",
      description: "Displays the collapse control.",
      table: { defaultValue: { summary: "false" } },
    },
    placement: {
      control: "radio",
      options: ["left", "right"],
      description: "Placement of the side panel.",
      table: { defaultValue: { summary: "left" } },
    },
    collapsed: { table: { disable: true } },
    onCollapsedChange: { table: { disable: true } },
    defaultCollapsed: { table: { disable: true } },
    children: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof SidePanel>;

export const Default: Story = {
  render: (args) => {
    
    const panel = (
      <SidePanel {...args}>
        <SidePanel.Header title="SidePanel title" />  

        <SidePanel.Content className="xv-side-panel__storybook">
          Content goes here
        </SidePanel.Content>
      </SidePanel>
    );

    const content = (
      <div
        style={{
          flex: 1,
          padding: "16px",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: "oklch(from var(--color__surface-layer-01) l c h / .04)",
            borderRadius: "var(--border-radius-02)",

          }}
        />

      </div>
    );

    return (
      <>
      <style>
      {
        `.xv-side-panel__storybook {
            
            display: flex;
            align-items: center;
            justify-content: center;
            
            padding: 8px;            

      }

        `
      }
    </style>
      
      <div
        style={{
          display: "flex",
          height: "100vh",
        }}
      >
        {args.placement === "left" ? (
          <>
            {panel}
            {content}
          </>
        ) : (
          <>
            {content}
            {panel}
          </>
        )}
      </div>
      </>
    );
  },
  args: {
    collapsible: true,
    placement: "left",
  },
};
