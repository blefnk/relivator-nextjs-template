export type AcademyPlayer = {
  achievements: {
    name: string;
    unlockedAt: string;
  }[];
  id: string;
  name: string;
  scores: Record<string, number>;
};

export type AcademyDifficultyLevels = "easy" | "hard" | "medium";

export type AcademyQuestion = {
  answer: string;
  difficulty: AcademyDifficultyLevels;
  hint?: string;
  id: string;
  options: string[];
  points: number;
  question: string;
};

export enum AcademyCategoryEnum {
  ESLINT = "eslint",
  JAVASCRIPT = "javascript",
  REACT = "react",
  RELIVERSE = "reliverse",
  TYPESCRIPT = "typescript",
}

export type Achievement = {
  criteria: (player: AcademyPlayer) => boolean;
  description: string;
  name: string;
};
