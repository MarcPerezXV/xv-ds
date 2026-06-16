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
        <SidePanel.Header title="Frequently Asked Questions" />  

        <SidePanel.Content className="xv-side-panel__storybook">

          <Accordion defaultValue="1" className="xv-accordion__storybook">
  <Accordion.Item
    value="1"
    title="Account settings"
    className="xv-accordion-item__storybook"
  >
    <p style={{ margin: 0 }}>
      Manage your account preferences and personal information from a single
      place. Changes are saved automatically and applied across the application.
    </p>

    <p style={{ margin: 0 }}>
      You can update details such as your display name, preferred language, and
      notification preferences. Some settings may require additional permissions
      depending on your role.
    </p>
  </Accordion.Item>

  <Accordion.Item
    value="2"
    title="Notifications"
    className="xv-accordion-item__storybook"
  >
    <p style={{ margin: 0 }}>
      Stay informed about important updates, assignments, and activity related
      to your work. Notification preferences can be customized at any time.
    </p>

    <p style={{ margin: 0 }}>
      Choose how you want to receive alerts, including email, in-app
      notifications, or both. Disabling a notification type only affects future
      messages.
    </p>
  </Accordion.Item>

  <Accordion.Item
    value="3"
    title="Privacy and security"
    className="xv-accordion-item__storybook"
  >
    <p style={{ margin: 0 }}>
      Your privacy and security settings help protect access to your account and
      personal information. Review these options regularly to ensure they meet
      your needs.
    </p>

    <p style={{ margin: 0 }}>
      Features such as two-factor authentication, active session management, and
      password updates are available from this section. Some security changes
      may require re-authentication before taking effect.
    </p>
  </Accordion.Item>
</Accordion>
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
            borderRadius: "var(--border-radius__02)",

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
            align-items: flex-start;
            justify-content: center;
            padding: 8px;            

      }
            .xv-accordion-item__storybook{
              display: flex;
              flex-direction: column;
              gap: 12px;
              padding: 12px;
              

              
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
