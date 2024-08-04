import { errorMessage } from "@/server/reliverse/errors";
import { resetPlayerScore } from "@/terminal/reliverse/academy/player";
import { select } from "@inquirer/prompts";
import consola from "consola";

export const openSettings = async (playerId: string) => {
  try {
    const action = await select({
      choices: [
        {
          name: "Reset my score",
          value: "reset",
        },
        {
          name: "Back to main menu",
          value: "back",
        },
      ],
      message: "Settings Menu",
    });

    if (action === "reset") {
      await resetPlayerScore(playerId);
      consola.success("Score reset successfully.");
    }
  } catch (error) {
    consola.error(`Failed to open settings: ${errorMessage(error)}`);
  }
};
