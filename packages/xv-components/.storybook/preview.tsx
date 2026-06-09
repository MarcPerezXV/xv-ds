import type { Preview, Decorator} from '@storybook/react-vite'

import "@xv/styles";
import { useEffect } from "react";

const withTheme: Decorator = (Story, context) => {
  const theme = context.globals.theme ?? "dark";

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    document.body.style.background = theme === "dark" ? "#444e54" : "#ffffff";
  }, [theme]);

  return <Story />;
};

const preview: Preview = {
  
  globalTypes: {
    theme: {
      name: "Theme",
      defaultValue: "dark",
      toolbar: {
        icon: "circlehollow",
        items: ["light", "dark"]
      },
    },
  },
  decorators: [withTheme],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
      expanded: true,
    },
    layout: "fullscreen"
  },
};

export default preview;