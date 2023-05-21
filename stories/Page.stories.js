import { within, userEvent } from "@storybook/testing-library";
import { rest } from "msw";

import { Page } from "./Page";

function delay(time) {
  return new Promise(function (resolve) {
    setTimeout(resolve, time);
  });
}

export default {
  title: "Example/Page",
  component: Page,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
    msw: {
      handlers: [
        rest.get("/auth/user", (req, res, ctx) => {
          return res(
            ctx.json({
              name: "Guillermo Rodas",
            })
          );
        }),
      ],
    },
  },
};

export const LoggedOut = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await LoggedIn.play({ canvasElement });

    await delay(500); // Wait half second

    const logoutButton = await canvas.getByRole("button", {
      name: /Log out/i,
    });

    await userEvent.click(logoutButton);
  },
};

// More on interaction testing: https://storybook.js.org/docs/react/writing-tests/interaction-testing
export const LoggedIn = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const loginButton = await canvas.getByRole("button", {
      name: /Log in/i,
    });
    await userEvent.click(loginButton);
  },
};
