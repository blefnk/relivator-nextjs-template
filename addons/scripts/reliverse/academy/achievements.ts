import type {
  AcademyPlayer,
  Achievement,
} from "@/scripts/reliverse/academy/types";

import { getPlayerById, savePlayer } from "@/scripts/reliverse/academy/player";
import { getErrorMessage } from "@/server/reliverse/error-message";
import consola from "consola";
import pc from "picocolors";

export const achievements: Achievement[] = [
  {
    name: "First Steps",
    criteria: (player) =>
      Object.values(player.scores).some(
        (score) => typeof score === "number" && score > 0,
      ),
    description: "Complete your first question.",
  },
  {
    name: "Category Master",
    criteria: (player) =>
      Object.values(player.scores).some(
        (score) => typeof score === "number" && score >= 100,
      ),
    description: "Complete all questions in a category.",
  },
  {
    name: "Quick Learner",
    criteria: (player) =>
      Object.values(player.scores).reduce(
        (sum, score) => sum + (typeof score === "number" ? score : 0),
        0,
      ) >= 10,
    description: "Answer 10 questions correctly.",
  },
  {
    name: "High Achiever",
    criteria: (player) =>
      Object.values(player.scores).reduce(
        (sum, score) => sum + (typeof score === "number" ? score : 0),
        0,
      ) >= 300,
    description: "Earn 300 points.",
  },
];

const checkAchievements = (player: AcademyPlayer): Achievement[] => {
  return achievements.filter((achievement) => achievement.criteria(player));
};

export const updateAchievements = async (playerId: string): Promise<void> => {
  try {
    const player = await getPlayerById(playerId);

    if (!player) {
      throw new Error(`Player not found: ${playerId}`);
    }

    const unlockedAchievements = checkAchievements(player);

    const newAchievements = unlockedAchievements.filter(
      (achievement) =>
        !player.achievements.some((a) => a.name === achievement.name),
    );

    if (newAchievements.length > 0) {
      player.achievements.push(
        ...newAchievements.map((achievement) => ({
          name: achievement.name,
          unlockedAt: new Date().toISOString(),
        })),
      );
      await savePlayer(player);

      for (const achievement of newAchievements) {
        consola.success(
          `${pc.magenta("New achievement unlocked")}: ${achievement.name}`,
        );
      }

      consola.info(`Achievements updated for player: ${player.name}`);
    }
  } catch (error) {
    consola.error(
      `Failed to update achievements for player ${playerId}: ${getErrorMessage(error)}`,
    );
  }
};

export const displayAchievements = async (playerId: string): Promise<void> => {
  try {
    const player = await getPlayerById(playerId);

    if (!player) {
      throw new Error(`Player not found: ${playerId}`);
    }

    if (player.achievements.length === 0) {
      consola.info(pc.dim("You have no achievements yet."));

      return;
    }

    consola.info(pc.green("Achievements:"));

    for (const [index, achievement] of player.achievements.entries()) {
      consola.info(
        `${index + 1}. ${achievement.name} - Unlocked at: ${achievement.unlockedAt}`,
      );
    }
  } catch (error) {
    consola.error(`Failed to display achievements: ${getErrorMessage(error)}`);
  }
};
