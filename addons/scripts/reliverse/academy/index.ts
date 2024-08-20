import { displayAchievements } from "@/scripts/reliverse/academy/achievements";
import { validateJsonSchema } from "@/scripts/reliverse/academy/checkJsonFiles";
import { playGame } from "@/scripts/reliverse/academy/game";
import { displayLeaderboard } from "@/scripts/reliverse/academy/leaders";
import { addPlayer, findPlayer } from "@/scripts/reliverse/academy/player";
import { openSettings } from "@/scripts/reliverse/academy/settings";
import { getErrorMessage } from "@/server/reliverse/error-message";
import { input, select } from "@inquirer/prompts";
import consola from "consola";
import pc from "picocolors";

// TODO: Move the implementation of this game to the separate package
// import { decryptAll, hashAll } from "@/scripts/reliverse/academy/hash";
// const args = new Set(process.argv.slice(2));
// const isHashMode = args.has("--hash");
// const isDecryptMode = args.has("--decrypt");
const mainMenu = async (
  playerId: string,
  playerName: string,
): Promise<void> => {
  try {
    const choice = await select({
      choices: [
        {
          name: "Play",
          value: "test",
        },
        {
          name: "Settings",
          value: "settings",
        },
        {
          name: "Leaderboard",
          value: "leaderboard",
        },
        {
          name: "Achievements",
          value: "achievements",
        },
        {
          name: "Exit",
          value: "exit",
        },
      ],
      message: pc.dim(`@reliverse/academy Main Menu (${playerName})`),
    });

    switch (choice) {
      case "test":
        await playGame(playerId);
        break;

      case "settings":
        await openSettings(playerId);
        break;

      case "leaderboard":
        await displayLeaderboard();
        break;

      case "achievements":
        await displayAchievements(playerId);
        break;

      case "exit":
        consola.success(
          pc.dim(`👋 See you next time, ${playerName}! Have a great day!`),
        );
        process.exit(0);
    }

    await mainMenu(playerId, playerName);
  } catch (error) {
    consola.error(`Failed to navigate main menu: ${getErrorMessage(error)}`);
  }
};

const start = async (): Promise<void> => {
  try {
    consola.info(pc.dim("@reliverse/academy v0.0.0-canary.0"));
    const playerName = await input({
      message: "Enter your player name:",
    });

    if (!playerName) {
      consola.info("Please enter a valid player name.");
      await start();

      return;
    }

    let player = await findPlayer(playerName);

    if (!player) {
      player = await addPlayer(playerName);
    }

    await mainMenu(player.id, player.name);
  } catch (error) {
    consola.error(`Failed to start the game: ${getErrorMessage(error)}`);
  }
};

const run = async (): Promise<void> => {
  try {
    await validateJsonSchema();

    // if (isHashMode) {
    //   await hashAll();
    // } else if (isDecryptMode) {
    //   await decryptAll();
    // } else {
    //   await start();
    // }
    await start();
  } catch (error) {
    consola.error(`Failed to run application: ${getErrorMessage(error)}`);
    process.exit(1); // Exit the process with an error code
  }
};

run().catch((error: unknown) => {
  consola.error(`Failed to run the game: ${getErrorMessage(error)}`);
});
