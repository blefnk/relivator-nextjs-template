import { resetPlayerScore } from "@/scripts/reliverse/academy/player";
import { getErrorMessage } from "@/server/reliverse/error-message";
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
    consola.error(`Failed to open settings: ${getErrorMessage(error)}`);
  }
};
