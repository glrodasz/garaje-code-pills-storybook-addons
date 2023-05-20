/** @type { import('@storybook/react').Preview } */

import { Suspense, useEffect } from "react";
import { I18nextProvider } from "react-i18next";

import "../styles/global.css";

import i18n from "../src/i18n";

import { initialize, mswDecorator } from "msw-storybook-addon";

import { withThemeByClassName } from "@storybook/addon-styling";

// Initialize MSW
initialize();

const withI18next = (Story, context) => {
  const { locale } = context.globals;

  useEffect(() => {
    i18n.changeLanguage(locale);
  }, [locale]);

  return (
    <Suspense fallback={<div>Loading translations...</div>}>
      <I18nextProvider i18n={i18n}>
        <Story />
      </I18nextProvider>
    </Suspense>
  );
};

// Provide the MSW addon decorator globally
export const decorators = [
  mswDecorator,
  withThemeByClassName({
    themes: {
      light: "light",
      dark: "dark",
    },
    defaultTheme: "light",
  }),
  withI18next,
];

export const globalTypes = {
  locale: {
    name: "Locale",
    description: "Internationalization locale",
    toolbar: {
      icon: "globe",
      items: [
        { value: "en", title: "🇬🇧 English" },
        { value: "es", title: "🇪🇸 Spanish" },
      ],
      showName: true,
    },
  },
};

const preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    status: {
      statuses: {
        released: {
          background: "#3498db",
          color: "#ffffff",
          description: "This component is stable and released",
        },
      },
    },
  },
};

export default preview;
