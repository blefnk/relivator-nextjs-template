import type { AcademyPlayer } from "@/scripts/reliverse/academy/types";

import {
  readJsonFile,
  writeJsonFile,
} from "@/scripts/reliverse/academy/fileHandler";
import { getErrorMessage } from "@/server/reliverse/error-message";
import tryToCatch from "try-to-catch";
import { v4 as uuidv4 } from "uuid";

const playersFilePath = "data/players.json";

export const getPlayers = async (): Promise<AcademyPlayer[]> => {
  try {
    const data = await readJsonFile<{
      players: AcademyPlayer[];
    }>(playersFilePath);

    return data.players;
  } catch (error) {
    throw new Error(`Failed to get players: ${getErrorMessage(error)}`);
  }
};

const savePlayers = async (players: AcademyPlayer[]): Promise<void> => {
  const [error] = await tryToCatch(writeJsonFile, playersFilePath, {
    players,
  });

  if (error) {
    throw new Error(`Failed to save players: ${getErrorMessage(error)}`);
  }
};

export const getPlayerById = async (
  id: string,
): Promise<AcademyPlayer | undefined> => {
  try {
    const players = await getPlayers();

    return players.find((p) => p.id === id);
  } catch (error) {
    throw new Error(`Failed to get player by id: ${getErrorMessage(error)}`);
  }
};

export const savePlayer = async (player: AcademyPlayer): Promise<void> => {
  try {
    const players = await getPlayers();
    const playerIndex = players.findIndex((p) => p.id === player.id);

    if (playerIndex > -1) {
      players[playerIndex] = player;
      await savePlayers(players);
    } else {
      throw new Error(`Player not found: ${player.id}`);
    }
  } catch (error) {
    throw new Error(`Failed to save player: ${getErrorMessage(error)}`);
  }
};

export const findPlayer = async (
  name: string,
): Promise<AcademyPlayer | undefined> => {
  const players = await getPlayers();

  return players.find((player) => player.name === name);
};

export const addPlayer = async (name: string): Promise<AcademyPlayer> => {
  const players = await getPlayers();
  const newPlayer: AcademyPlayer = {
    id: uuidv4(), // Generate unique id
    name,
    achievements: [],
    scores: {},
  };

  players.push(newPlayer);
  await savePlayers(players);

  return newPlayer;
};

export const updatePlayerScore = async (
  id: string,
  category: string,
  score: number,
): Promise<void> => {
  const players = await getPlayers();
  const player = players.find((p) => p.id === id);

  if (!player) {
    throw new Error(`Player not found: ${id}`);
  }

  player.scores[category] = (player.scores[category] || 0) + score;
  await savePlayers(players);
};

export const resetPlayerScore = async (id: string): Promise<void> => {
  const players = await getPlayers();
  const player = players.find((p) => p.id === id);

  if (!player) {
    throw new Error(`Player not found: ${id}`);
  }

  player.scores = {};
  await savePlayers(players);
};
