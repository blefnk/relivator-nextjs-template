import type { AcademyQuestion } from "@/scripts/reliverse/academy/types";

import { getCurrentDirname } from "@reliverse/fs";
import { destr } from "destr";
import fs from "fs-extra";
import { join } from "pathe";

// import { decryptAnswer } from "@/scripts/reliverse/academy/crypto";
const currentDirname = getCurrentDirname(import.meta.url);

const isQuestionArray = (data: unknown): data is AcademyQuestion[] => {
  return Array.isArray(data) && data.every(isQuestion);
};

const isQuestion = (item: unknown): item is AcademyQuestion => {
  if (typeof item !== "object" || item === null) {
    return false;
  }

  const questionItem = item as Record<string, unknown>;

  return (
    typeof questionItem.answer === "string" &&
    Array.isArray(questionItem.options) &&
    questionItem.options.every((option) => typeof option === "string") &&
    typeof questionItem.points === "number" &&
    typeof questionItem.question === "string"
  );
};

export const processFileAnswers = async (
  directory: string,
  process: (answer: string) => string,
): Promise<void> => {
  const questionsDirectory = join(currentDirname, directory);
  const files = await fs.readdir(questionsDirectory);

  await Promise.all(
    files
      .filter((file) => file.endsWith(".json"))
      .map(async (file) => {
        const filePath = join(questionsDirectory, file);
        const data = await fs.readFile(filePath, "utf8");
        const parsedData = destr(data);

        if (!isQuestionArray(parsedData)) {
          throw new Error(`Invalid question format in file ${file}`);
        }

        const questions = parsedData.map((question) => {
          const { answer } = question;

          // TODO: Consider decryption step, currently using direct answer processing
          // try {
          //   answer = decryptAnswer(answer);
          // } catch (error) {
          //   consola.error(
          //     `Answer is not encrypted or failed to decrypt: ${getErrorMessage(error)} in file ${file}`,
          //   );
          // }
          return {
            ...question,
            answer: process(answer),
          };
        });

        await fs.writeFile(
          filePath,
          JSON.stringify(questions, null, 2),
          "utf8",
        );
      }),
  );
};
