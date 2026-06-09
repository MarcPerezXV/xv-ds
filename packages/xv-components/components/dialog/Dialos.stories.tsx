import type { Meta, StoryObj } from "@storybook/react";
import { Dialog, DialogProps } from "./Dialog";
import { PrimaryTextButton } from "../textButton/primary/Button";
import { GhostTextButton } from "../textButton";
import { useState } from "react";

const meta: Meta<DialogStoryArgs> = {
  title: "Components/Dialog",
  component: Dialog,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    type: {
      control: "radio",
      options: ["informative", "warning", "error"],
      description: "Visual style of the dialog.",
      table: { defaultValue: { summary: "informative" } },
    },
    showIcon: {
      control: "boolean",
      description: "Whether to show the icon in the dialog content.",
      table: { defaultValue: { summary: "true" } },
    },
    open: { table: { disable: true } },
    onClose: { table: { disable: true } },
    children: { table: { disable: true } },
    className: { table: { disable: true } },
  },
};

export default meta;

type DialogStoryArgs = DialogProps & { showIcon: boolean };

type Story = StoryObj<DialogStoryArgs>;


export const Default: Story = {
  render: (args) => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <GhostTextButton label="Open dialog" onClick={() => setOpen(true)} />
        <Dialog type={args.type} open={open} onClose={() => setOpen(false)}>
          <Dialog.Header title="Session expired" />
          <Dialog.Content
            message="Your session has expired due to inactivity. Please sign in again to continue."
            icon={args.showIcon}
          />
          <Dialog.Actions>
            <GhostTextButton label="Cancel" onClick={() => setOpen(false)} />
            <PrimaryTextButton label="Sign in" onClick={() => setOpen(false)} />
          </Dialog.Actions>
        </Dialog>
      </>
    );
  },
  args: {
    type: "informative",
    showIcon: true,
  },
};