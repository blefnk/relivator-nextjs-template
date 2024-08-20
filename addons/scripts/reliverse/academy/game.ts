import type {
  AcademyDifficultyLevels,
  AcademyQuestion,
} from "@/scripts/reliverse/academy/types";

import { updateAchievements } from "@/scripts/reliverse/academy/achievements";
import {
  readJsonFile,
  writeJsonFile,
} from "@/scripts/reliverse/academy/fileHandler";
import { updatePlayerScore } from "@/scripts/reliverse/academy/player";
import { AcademyCategoryEnum } from "@/scripts/reliverse/academy/types";
import { getErrorMessage } from "@/server/reliverse/error-message";
import { select } from "@inquirer/prompts";
import consola from "consola";
import pc from "picocolors";
import tryToCatch from "try-to-catch";
import { v4 as uuidv4 } from "uuid";

const academyProgressFilePath = "data/progress.json";
const BONUS_QUESTION_PROBABILITY = 0.1;

const categoriesList = [
  {
    name: "Reliverse",
    value: AcademyCategoryEnum.RELIVERSE,
  },
  {
    name: "JavaScript",
    value: AcademyCategoryEnum.JAVASCRIPT,
  },
  {
    name: "TypeScript",
    value: AcademyCategoryEnum.TYPESCRIPT,
  },
  {
    name: "React",
    value: AcademyCategoryEnum.REACT,
  },
  {
    name: "ESLint",
    value: AcademyCategoryEnum.ESLINT,
  },
];

const handleGameError = (error: unknown, context: string): void => {
  consola.error(`${context}: ${getErrorMessage(error)}`);
};

const getProgress = async (): Promise<
  Record<string, Record<string, string[]>>
> => {
  try {
    return await readJsonFile<Record<string, Record<string, string[]>>>(
      academyProgressFilePath,
    );
  } catch (error) {
    handleGameError(error, "Failed to read progress");

    return {};
  }
};

const saveProgress = async (
  progress: Record<string, Record<string, string[]>>,
): Promise<void> => {
  const [error] = await tryToCatch(
    writeJsonFile,
    academyProgressFilePath,
    progress,
  );

  if (error) {
    handleGameError(error, "Failed to save progress");
  }
};

// Function to shuffle an array to be used for randomizing questions
const shuffleArray = <T>(array: T[]): T[] => {
  for (let index = array.length - 1; index > 0; index--) {
    const randomIndex = Math.floor(Math.random() * (index + 1));

    [array[index], array[randomIndex]] = [array[randomIndex]!, array[index]!];
  }

  return array;
};

const getQuestions = async (
  category: string,
  difficulty: AcademyDifficultyLevels,
): Promise<AcademyQuestion[]> => {
  try {
    const questions = await readJsonFile<AcademyQuestion[]>(
      `questions/${category}.json`,
    );

    // Filter by difficulty and ensure each question has an id
    const filteredQuestions = questions
      .filter((q) => q.difficulty === difficulty)
      .map((q) => ({
        ...q,
        id: q.id || uuidv4(),
      }));

    // Shuffle questions
    return shuffleArray(filteredQuestions);
  } catch (error) {
    handleGameError(error, `Failed to read questions for category ${category}`);

    return [];
  }
};

const askQuestion = async (
  question: AcademyQuestion,
): Promise<"exit" | number> => {
  try {
    const choices = question.options.map((option) => ({
      name: option,
      value: option,
    }));

    if (question.hint) {
      choices.push({
        name: "Use a hint",
        value: "hint",
      });
    }

    choices.push({
      name: "Exit",
      value: "exit",
    });

    // Exit option for the question choice
    let answer = await select({
      choices,
      message: question.question,
    });

    if (answer === "exit") {
      return "exit";
    }

    if (answer === "hint" && question.hint) {
      consola.info(pc.dim(`💡 Hint: ${question.hint}`));
      answer = await select({
        choices: question.options.map((option) => ({
          name: option,
          value: option,
        })),
        message: question.question,
      });
    }

    return answer === question.answer ? question.points : 0;
  } catch (error) {
    handleGameError(error, "Failed to ask question");

    return 0;
  }
};

const loadBonusQuestions = async (): Promise<AcademyQuestion[]> => {
  try {
    return await readJsonFile<AcademyQuestion[]>("questions/bonus.json");
  } catch (error) {
    handleGameError(error, "Failed to load bonus questions");

    return [];
  }
};

const askBonusQuestion = async (): Promise<number> => {
  consola.info(pc.green("🎉 Yay! Bonus Question!"));

  const bonusQuestions = await loadBonusQuestions();
  const randomIndex = Math.floor(Math.random() * bonusQuestions.length);
  const bonusQuestion = bonusQuestions[randomIndex];

  const pointsEarned = bonusQuestion ? await askQuestion(bonusQuestion) : 0;

  if (pointsEarned === "exit") {
    consola.info("Exiting the bonus question...");

    return 0;
  }

  return pointsEarned;
};

const playCategory = async (
  playerId: string,
  category: string,
): Promise<void> => {
  const difficulty = (await select({
    choices: [
      {
        name: "Easy",
        value: "easy",
      },
      {
        name: "Medium",
        value: "medium",
      },
      {
        name: "Hard",
        value: "hard",
      },
    ],
    message: "Select difficulty level",
  })) as AcademyDifficultyLevels;

  const questions = await getQuestions(category, difficulty);
  const progress = await getProgress();
  const categoryProgress = progress[playerId]?.[category] || [];

  let sessionPoints = 0;
  let sessionCorrectAnswers = 0;
  let possiblePoints = 0;
  let sessionPossiblePoints = 0;
  let bonusPoints = 0;
  let bonusCorrectAnswers = 0;

  for (const question of questions) {
    possiblePoints += question.points;

    if (categoryProgress.includes(question.id)) {
      continue;
    }

    const pointsEarned = await askQuestion(question);

    sessionPossiblePoints += question.points;

    if (pointsEarned === "exit") {
      consola.info("Exiting the test...");
      break;
    }

    if (pointsEarned > 0) {
      sessionPoints += pointsEarned;
      ++sessionCorrectAnswers;
      await updatePlayerScore(playerId, category, pointsEarned);
      categoryProgress.push(question.id);

      // A random chance for bonus question
      if (Math.random() < BONUS_QUESTION_PROBABILITY) {
        // 10% chance
        const bonusQuestionPoints = await askBonusQuestion();

        possiblePoints += 20; // Possible points for bonus question
        sessionPossiblePoints += 20;

        // Possible points for bonus question in this session
        if (bonusQuestionPoints > 0) {
          bonusPoints += bonusQuestionPoints;
          ++bonusCorrectAnswers;
          await updatePlayerScore(playerId, "bonus", bonusQuestionPoints);
        }
      }
    }
  }

  // Ensure the progress structure is correct
  if (!progress[playerId]) {
    progress[playerId] = {};
  }

  progress[playerId][category] = categoryProgress;

  await saveProgress(progress);

  // Update achievements
  await updateAchievements(playerId);

  // Notify user of their performance
  const totalQuestions = questions.length;
  const remainingQuestions = totalQuestions - categoryProgress.length;

  if (sessionPossiblePoints === 0 || sessionCorrectAnswers === 0) {
    consola.info(
      pc.dim(
        // eslint-disable-next-line @stylistic/max-len
        "You did not answer any questions correctly, or you have already answered all questions in this category or difficulty level.",
      ),
    );
  } else {
    consola.info(
      pc.green(
        // eslint-disable-next-line @stylistic/max-len
        `You have earned ${sessionPoints} out of ${sessionPossiblePoints} points in this session (${possiblePoints} available in ${category} ${difficulty}).`,
      ),
    );

    if (bonusPoints > 0) {
      consola.success(
        pc.green(`You have earned an additional ${bonusPoints} bonus points!`),
      );
    }

    consola.info(
      pc.blue(
        // eslint-disable-next-line @stylistic/max-len
        `You answered ${sessionCorrectAnswers} out of ${sessionPossiblePoints / (possiblePoints / totalQuestions)} questions correctly in this session (${totalQuestions - remainingQuestions} available in ${category} ${difficulty}).`,
      ),
    );

    if (bonusCorrectAnswers > 0) {
      consola.success(
        pc.cyan(
          `You answered ${bonusCorrectAnswers} bonus question(s) correctly.`,
        ),
      );
    }
  }
};

export const playGame = async (playerId: string): Promise<void> => {
  try {
    const categoryValue = await select({
      choices: categoriesList,
      message: "Choose a category to test your knowledge",
    });

    await playCategory(playerId, categoryValue);
  } catch (error) {
    handleGameError(error, "Failed to start game");
  }
};
