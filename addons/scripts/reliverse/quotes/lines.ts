import type { TLevel } from "@/scripts/reliverse/quotes/types";

import { config } from "@reliverse/core";

/* eslint-disable @stylistic/max-len */
export function getRandomElement<T>(array: T[]): T {
  if (array.length === 0) {
    throw new Error("Array is empty");
  }

  return array[Math.floor(Math.random() * array.length)] as T;
}

export const wiseQuotes = [
  "Imagination is more important than knowledge. © Albert Einstein",
  "Perfection is finally attained not when there is no longer anything to add, but when there is no longer anything to take away. © Antoine de Saint Exupery",
  "Life is like riding a bicycle. To keep your balance, you must keep moving. © Albert Einstein",
  "Success is not final, failure is not fatal: It is the courage to continue that counts. © Winston Churchill",
  "Talk is cheap. Show me the code. © Linus Torvalds",
  "The only limit to our realization of tomorrow is our doubts of today. © Franklin D. Roosevelt",
];

const webDevelopmentAdvice = {
  Advanced: [
    "Deep dive into the concepts of state management and how it impacts your application's performance.",
    "Familiarize yourself with design patterns and principles like SOLID and DRY to write cleaner code.",
    "Remember to always optimize your code for performance and scalability.",
    "Try to understand how server-side and client-side components work in Next.js and in the React ecosystem generally.",
  ],
  Beginner: [
    "Don't forget to learn HTML, CSS, and JavaScript basics. You will be even more successful if you understand these basics well.",
    "Make use of browser dev tools, like React Developer Tools, to debug and test your code.",
    "Practice building small projects to strengthen your understanding.",
    "Understand the basics of responsive design to make your websites look good on any device.",
    "JSON is a syntax for serializing objects, arrays, numbers, strings, booleans, and null. It is based upon JavaScript syntax but is distinct from it: some JavaScript is not JSON. © MDN",
  ],
  Intermediate: [
    "A closure is a function that remembers the environment in which it was created, even after the outer function has finished running. This means that the closure can still access variables from its parent function, even after that parent function has completed. JavaScript handles this by saving the closure's state in the heap memory. Closures are useful because they allow you to create private variables that can't be accessed from outside the function.",
    "Don't forget to learn React basics. It will help you work on more complex projects more easily.",
    "Learn Tailwind to write more maintainable classnames. Try to use shadcn/ui components.",
    "It's recommended to understand how to use Git and version control. You can refer to `The Detailed Git Guide` article: https://github.com/blefnk/relivator-nextjs-template/blob/main/.github/GITGUIDE.md",
  ],
};

// Combine all web dev advice into one array for easier random selection based on the level
const allWebDevelopmentAdvice = [
  ...webDevelopmentAdvice.Beginner,
  ...webDevelopmentAdvice.Intermediate,
  ...webDevelopmentAdvice.Advanced,
];

// Function to get a random web development advice based on difficulty level
export function getWebDevelopmentAdvice(level: TLevel): string {
  switch (level) {
    case "Advanced":
      return getRandomElement(allWebDevelopmentAdvice);

    case "Beginner":
      return getRandomElement(webDevelopmentAdvice.Beginner);

    case "Intermediate":
      return getRandomElement(
        webDevelopmentAdvice.Intermediate.concat(webDevelopmentAdvice.Beginner),
      );

    default:
      return "Keep learning and coding!";
  }
}

// Personalized quotes and reviews
export const personalQuotes = [
  "[Relivator v1.2.6 Release Blog Post] 👉 https://reliverse.org/relivator/v126",
  "Isn't coding so much better with some good music? Try working with Relivator while you listen to the beautiful songs on the MF Piano YouTube channel (https://youtube.com/@mfpiano). My brother runs the channel and would really appreciate your support. Subscribing, watching, liking, and commenting would help his channel grow. Thanks a bunch! © blefnk",
  "For experienced users: run 'pnpm reli:prepare' to update all dependencies to the latest versions and check if the code requires any adjustments.",
  "I learned a lot from using the Relivator project! I see the hard work that was put into it. It's truly an amazing open-source starter; I have built my startup using it. @blefnk, your hard work is impressive; it's astonishing how you manage it all alone. © demiroo (Özkan Demir)",
  `🙏 Please help ${config.framework.name} reach 1,000 stars on GitHub! Once this project reaches this goal, I will start my blog and video course on the basics of web development (HTML, CSS, JS), React, Next.js, TypeScript, related libraries, and many other topics. I will also be motivated to dedicate even more time to these projects, leading to more frequent updates. © blefnk (${config.engine.author})`,
  `Consider contributing code to the ${config.framework.repo} repository and receive many cool gifts. Any contributions are welcome! Thank you so much!`,
  `Enjoy using ${config.framework.name} and ${config.engine.name}! © blefnk (${config.engine.author})`,
  `Please help Relivator become even better! Star the repo – ${config.framework.repo}`,
  `Please visit ${config.framework.repo}#readme to learn detailed information about the ${config.framework.name} project and how to use it most efficiently.`,
];

// TypeScript Learning Quotes
export const tsLearningQuotes = [
  "If you already know JavaScript, TypeScript won't be too hard to learn. It's a great tool to have in your arsenal. © Danny Adams",
  "It's popular – knowing TypeScript will enable you to apply for more good jobs. © Danny Adams",
  "Learning TypeScript will give you a better understanding and a new perspective on JavaScript. © Danny Adams",
  "Readability – it is easier to see what the code is supposed to do. And when working in a team, it is easier to see what the other developers intended. © Danny Adams",
  "Research has shown that TypeScript can spot 15% of common bugs. © Danny Adams",
  "TypeScript adds static types to the language. This means you can catch errors early in the development process, leading to more robust and maintainable code. © Beau Carnes",
  "TypeScript is a superset of JavaScript, meaning that it does everything JavaScript does, but with added features. © Danny Adams",
  "TypeScript not only helps in code structuring and preventing runtime errors but also enhances code readability and predictability. © Beau Carnes",
];

// JavaScript Ecosystem Observations
export const observationQuotes = [
  "If two or more auto-fix rules are applied to the same code line, then ESLint in VSCode and ESLint CLI will perform auto-fix from the rule that goes first alphabetically.",
  `Open the ${config.framework.repo}#readme to learn many observations and tips about how to learn JS/TS, React, Next.js, and many other things.`,
  "The more you code, the more you learn.",
];
