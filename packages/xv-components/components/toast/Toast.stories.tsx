import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Toast, ToastProps, ToastType } from "./Toast";
import { GhostTextButton } from "../textButton";

const meta: Meta<ToastStoryArgs> = {
    title: "Components/Toast",
    component: Toast,
    tags: ["autodocs"],
    parameters: { layout: "centered" },
    argTypes: {
        type: {
            control: "radio",
            options: [
                "informative",
                "positive",
                "neutral",
                "negative",
                "warning",
            ] satisfies ToastType[],
            description: "Visual variant — controls the icon and accent colour.",
            table: { defaultValue: { summary: "informative" } },
        },
        message: {
            control: "text",
            description: "The feedback message shown to the user.",
        },
        closable: {
            control: "boolean",
            description: "Whether to show the dismiss (×) button.",
            table: { defaultValue: { summary: "true" } },
        },
        showAction: {
            control: "boolean",
            description: "Whether to show an action button.",
            table: { defaultValue: { summary: "false" } },
        },
        duration: {
            control: { type: "number", min: 0, step: 500 },
            description: "Auto-dismiss delay in ms. 0 disables auto-dismiss.",
            table: { defaultValue: { summary: "0" } },
        },
        open: { table: { disable: true } },
        onClose: { table: { disable: true } },
        action: { table: { disable: true } },
        className: { table: { disable: true } },
    },
};

export default meta;

type ToastStoryArgs = ToastProps & { showAction: boolean };

type Story = StoryObj<ToastStoryArgs>;

export const Default: Story = {
    render: (args) => {
        const [open, setOpen] = useState(false);
        return (
            <>
                <div style={{ padding: 24 }}>
                    <GhostTextButton label="Show toast" onClick={() => setOpen(true)} />
                </div>
                <div style={{ position: "fixed", bottom: 24, right: 24, zIndex: 9999 }}>
                    <Toast
                        type={args.type}
                        message={args.message ?? "Feedback message"}
                        closable={args.closable}
                        action={
                            args.showAction
                                ? { label: "Action", onClick: () => setOpen(false) }
                                : undefined
                        }
                        open={open}
                        onClose={() => setOpen(false)}
                        duration={args.duration}
                    />
                </div>
            </>
        );
    },
    args: {
        type: "informative",
        message: "Feedback message",
        closable: true,
        showAction: false,
        duration: 0,
    },
};
