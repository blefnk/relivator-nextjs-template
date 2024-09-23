import { confirm, input, password } from "@inquirer/prompts";
import fs from "fs-extra";
import { join } from "pathe";

import { getRootDirname } from "@reliverse/fs";

// TODO: 🐞 Still in development! Please use at own risk!

const rootDirname = getRootDirname(import.meta.url, 6);
const envFilePath = join(rootDirname, ".env");

type PromptType = "confirm" | "input" | "password";

type Question = {
  default?: boolean | string;
  key: string;
  message: string;
  type: PromptType;
};

function createPrompt(
  type: PromptType,
  message: string,
  defaultValue?: boolean | string,
) {
  const options: { default?: boolean | string; message: string } = { message };

  if (defaultValue !== undefined) {
    options.default = defaultValue;
  }

  if (type === "input") {
    return input(options as { default?: string; message: string });
  } else if (type === "password") {
    return password(options as { default?: string; message: string });
  } else {
    return confirm(options as { default?: boolean; message: string });
  }
}

async function askQuestions() {
  const questions: Question[] = [
    {
      default: "http://localhost:3000",
      key: "NEXT_PUBLIC_APP_URL",
      message: "Specify the website domain in production",
      type: "input",
    },
    { key: "DATABASE_URL", message: "Database URL", type: "input" },
    {
      key: "AUTH_SECRET",
      message:
        "Auth Secret (e.g.: EnsureUseSomethingRandomHere44CharactersLong)",
      type: "password",
    },
    {
      key: "AUTH_DISCORD_SECRET",
      message: "Auth Discord Secret",
      type: "password",
    },
    { key: "AUTH_DISCORD_ID", message: "Auth Discord ID", type: "input" },
    {
      key: "AUTH_GITHUB_SECRET",
      message: "Auth GitHub Secret",
      type: "password",
    },
    { key: "AUTH_GITHUB_ID", message: "Auth GitHub ID", type: "input" },
    {
      key: "AUTH_GOOGLE_SECRET",
      message: "Auth Google Secret",
      type: "password",
    },
    { key: "AUTH_GOOGLE_ID", message: "Auth Google ID", type: "input" },
    {
      key: "NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY",
      message: "Clerk Publishable Key",
      type: "input",
    },
    { key: "CLERK_SECRET_KEY", message: "Clerk Secret Key", type: "password" },
    {
      default: false,
      key: "NEXT_PUBLIC_ORGANIZATIONS_ENABLED",
      message: "Organizations Enabled",
      type: "confirm",
    },
    {
      key: "NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY",
      message: "Stripe Publishable Key",
      type: "input",
    },
    {
      key: "STRIPE_SECRET_KEY",
      message: "Stripe Secret Key",
      type: "password",
    },
    {
      key: "STRIPE_WEBHOOK_SIGNING_SECRET",
      message: "Stripe Webhook Signing Secret",
      type: "password",
    },
    {
      key: "STRIPE_PROFESSIONAL_SUBSCRIPTION_PRICE_ID",
      message: "Stripe Professional Subscription Price ID",
      type: "input",
    },
    {
      key: "STRIPE_ENTERPRISE_SUBSCRIPTION_PRICE_ID",
      message: "Stripe Enterprise Subscription Price ID",
      type: "input",
    },
    {
      default: false,
      key: "PYTHON_INSTALLED",
      message: "Python Installed",
      type: "confirm",
    },
    {
      default: false,
      key: "ENABLE_VERCEL_TOOLBAR",
      message: "Enable Vercel Toolbar",
      type: "confirm",
    },
    {
      default: false,
      key: "ENABLE_VT_ON_PRODUCTION",
      message: "Enable VT on Production",
      type: "confirm",
    },
    {
      default: false,
      key: "ENABLE_FEATURE_FLAGS",
      message: "Enable Feature Flags",
      type: "confirm",
    },
    { key: "FLAGS_SECRET", message: "Flags Secret", type: "password" },
    {
      key: "REMOTION_GITHUB_TOKEN",
      message: "Remotion GitHub Token",
      type: "password",
    },
    {
      key: "UPLOADTHING_SECRET",
      message: "Uploadthing Secret",
      type: "password",
    },
    { key: "UPLOADTHING_APP_ID", message: "Uploadthing App ID", type: "input" },
    {
      key: "NEXT_PUBLIC_RESEND_API_KEY",
      message: "Resend API Key",
      type: "input",
    },
    {
      default: "onboarding@resend.dev",
      key: "NEXT_PUBLIC_RESEND_EMAIL_FROM",
      message: "Resend Email From",
      type: "input",
    },
    { key: "LOGLIB_ID", message: "Loglib ID", type: "input" },
    {
      key: "DISCORD_WEBHOOK_URL",
      message: "Discord Webhook URL",
      type: "input",
    },
  ];

  const answers: Record<string, boolean | string> = {};

  for (const question of questions) {
    const answer = await createPrompt(
      question.type,
      question.message,
      question.default,
    );

    answers[question.key] = answer;
  }

  return answers;
}

function generateEnvContent(answers: Record<string, boolean | string>) {
  const keys = Object.keys(answers);

  return keys.map((key) => `${key}="${answers[key]}"`).join("\n");
}

async function main() {
  try {
    const answers = await askQuestions();

    console.log("\nPlease review your answers:");
    console.log(generateEnvContent(answers));

    const confirmed = await confirm({
      default: true,
      message: "Do you want to save these settings to .env file?",
    });

    if (confirmed) {
      fs.writeFileSync(envFilePath, generateEnvContent(answers).trim());
      console.log(`.env file has been generated at ${envFilePath}`);
    } else {
      console.log("Aborted! The .env file was not generated.");
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

main();
