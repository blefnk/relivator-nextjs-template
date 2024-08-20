import { getPlayers } from "@/scripts/reliverse/academy/player";
import { getErrorMessage } from "@/server/reliverse/error-message";
import consola from "consola";

export const displayLeaderboard = async (): Promise<void> => {
  try {
    const players = await getPlayers();

    const sortedPlayers = [...players].sort((a, b) => {
      const totalScoreA = Object.values(a.scores).reduce(
        (sum, score) => sum + score,
        0,
      );

      const totalScoreB = Object.values(b.scores).reduce(
        (sum, score) => sum + score,
        0,
      );

      return totalScoreB - totalScoreA;
    });

    consola.info("Leaderboard:");

    for (const [index, player] of sortedPlayers.entries()) {
      const totalScore = Object.values(player.scores).reduce(
        (sum, score) => sum + score,
        0,
      );

      consola.info(`${index + 1}. ${player.name}: ${totalScore} points`);
    }
  } catch (error) {
    consola.error(`Failed to display leaderboard: ${getErrorMessage(error)}`);
  }
};
