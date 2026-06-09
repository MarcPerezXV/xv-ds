import type { Preview, Decorator } from '@storybook/react-vite'
import { DSProvider, DSTheme } from '@xv/components'
import "@xv/styles";
import { useEffect } from "react";

const withBackground: Decorator = (Story, context) => {
  const theme = context.globals.theme ?? "dark";

  useEffect(() => {
    document.body.style.background = theme === "dark" ? "#444e54" : "#ffffff";
  }, [theme]);

  return <Story />;
};

const withDSProvider: Decorator = (Story, context) => {
  const theme = (context.globals.theme ?? "dark") as DSTheme;

  return (
    <DSProvider theme={theme}>
      <Story />
    </DSProvider>
  );
};

const preview: Preview = {
  globalTypes: {
    theme: {
      name: "Theme",
      defaultValue: "dark",
      toolbar: {
        icon: "circlehollow",
        items: ["light", "dark"],
      },
    },
  },
  decorators: [withDSProvider, withBackground],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
      expanded: true,
    },
    layout: "fullscreen",
  },
};

export default preview;