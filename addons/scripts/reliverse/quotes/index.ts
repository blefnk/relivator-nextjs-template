import type { TLevel } from "@/scripts/reliverse/quotes/types";

import {
  getRandomElement,
  getWebDevelopmentAdvice,
  observationQuotes,
  personalQuotes,
  tsLearningQuotes,
  wiseQuotes,
} from "@/scripts/reliverse/quotes/lines";
import { advancedTsLearningQuotes } from "@/scripts/reliverse/quotes/more";
import { debugEnabled } from "~/../reliverse.config";
import consola from "consola";
import { ofetch } from "ofetch";
// @ts-expect-error missing types
import pick from "pick-random-weighted";
import pc from "picocolors";

const isString = (a: unknown) => typeof a === "string";

// Helper function to get a random quote as a string  (1 least frequent; 4 - most frequent))
async function fetchRandomQuote(): Promise<string> {
  // Categories and their respective weights
  const categories: [number, number][] = [
    // Wise quotes
    [1, 1],

    // Web development
    [2, 3],

    // Personal quotes
    [3, 4],

    // TypeScript learning quotes
    [4, 2],

    // Advanced TypeScript learning
    [5, 4],

    // Programming quotes
    [6, 4],

    // Observations
    [7, 1],
  ];

  // Pick a random category based on the weights
  const randomCategory = pick(categories);
  let quote = "";

  switch (randomCategory) {
    case 1:
      quote = getRandomElement(wiseQuotes);
      break;

    case 2:
      const difficultyLevel: TLevel = getRandomElement([
        "Beginner",
        "Intermediate",
        "Advanced",
      ]);

      quote = getWebDevelopmentAdvice(difficultyLevel);
      break;

    case 3:
      quote = getRandomElement(personalQuotes);
      break;

    case 4:
      quote = getRandomElement(tsLearningQuotes);
      break;

    case 5:
      quote = `${getRandomElement(advancedTsLearningQuotes)}. © Matt Pocock`;
      break;

    case 6:
      quote = await fetchProgrammingQuote();
      break;

    case 7:
      quote = getRandomElement(observationQuotes);
      break;
  }

  return quote;
}

export async function getRandomQuote(): Promise<void> {
  const quote = await fetchRandomQuote();

  consola.info(`\n${pc.dim("@reliverse/quotes")} ${pc.italic(quote)}\n`);
}

type TQuote = {
  author: string;
  quote: string;
};

async function fetchProgrammingQuote(): Promise<string> {
  try {
    const res = await ofetch(
      "https://programming-quotesapi.vercel.app/api/random",
    );

    if (!res.ok) {
      // `Failed to fetch programming quote. Status: ${res.status}`,
      return await fetchRandomQuote();
    }

    const quote = (await res.json()) as TQuote;

    return `${quote.quote} © ${quote.author}`;
  } catch (error) {
    if (debugEnabled) {
      let getErrorMessage = "An unknown error occurred in @reliverse/quotes";

      if (error instanceof Error) {
        getErrorMessage = error.message;
      } else if (isString(error)) {
        getErrorMessage = error;
      }

      consola.error("Failed to fetch programming quote:", getErrorMessage);
    }

    // Fallback to display a random quote again
    return await fetchRandomQuote();
  }
}
