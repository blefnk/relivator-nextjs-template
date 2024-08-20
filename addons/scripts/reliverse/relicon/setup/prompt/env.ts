import { confirm, input, password } from "@inquirer/prompts";
import { getRootDirname } from "@reliverse/fs";
import fs from "fs-extra";
import { join } from "pathe";

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
      type: "input",
      key: "NEXT_PUBLIC_APP_URL",
      message: "Specify the website domain in production",
      default: "http://localhost:3000",
    },
    { type: "input", key: "DATABASE_URL", message: "Database URL" },
    {
      type: "password",
      key: "AUTH_SECRET",
      message:
        "Auth Secret (e.g.: EnsureUseSomethingRandomHere44CharactersLong)",
    },
    {
      type: "password",
      key: "AUTH_DISCORD_SECRET",
      message: "Auth Discord Secret",
    },
    { type: "input", key: "AUTH_DISCORD_ID", message: "Auth Discord ID" },
    {
      type: "password",
      key: "AUTH_GITHUB_SECRET",
      message: "Auth GitHub Secret",
    },
    { type: "input", key: "AUTH_GITHUB_ID", message: "Auth GitHub ID" },
    {
      type: "password",
      key: "AUTH_GOOGLE_SECRET",
      message: "Auth Google Secret",
    },
    { type: "input", key: "AUTH_GOOGLE_ID", message: "Auth Google ID" },
    {
      type: "input",
      key: "NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY",
      message: "Clerk Publishable Key",
    },
    { type: "password", key: "CLERK_SECRET_KEY", message: "Clerk Secret Key" },
    {
      type: "confirm",
      key: "NEXT_PUBLIC_ORGANIZATIONS_ENABLED",
      message: "Organizations Enabled",
      default: false,
    },
    {
      type: "input",
      key: "NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY",
      message: "Stripe Publishable Key",
    },
    {
      type: "password",
      key: "STRIPE_SECRET_KEY",
      message: "Stripe Secret Key",
    },
    {
      type: "password",
      key: "STRIPE_WEBHOOK_SIGNING_SECRET",
      message: "Stripe Webhook Signing Secret",
    },
    {
      type: "input",
      key: "STRIPE_PROFESSIONAL_SUBSCRIPTION_PRICE_ID",
      message: "Stripe Professional Subscription Price ID",
    },
    {
      type: "input",
      key: "STRIPE_ENTERPRISE_SUBSCRIPTION_PRICE_ID",
      message: "Stripe Enterprise Subscription Price ID",
    },
    {
      type: "confirm",
      key: "PYTHON_INSTALLED",
      message: "Python Installed",
      default: false,
    },
    {
      type: "confirm",
      key: "ENABLE_VERCEL_TOOLBAR",
      message: "Enable Vercel Toolbar",
      default: false,
    },
    {
      type: "confirm",
      key: "ENABLE_VT_ON_PRODUCTION",
      message: "Enable VT on Production",
      default: false,
    },
    {
      type: "confirm",
      key: "ENABLE_FEATURE_FLAGS",
      message: "Enable Feature Flags",
      default: false,
    },
    { type: "password", key: "FLAGS_SECRET", message: "Flags Secret" },
    {
      type: "password",
      key: "REMOTION_GITHUB_TOKEN",
      message: "Remotion GitHub Token",
    },
    {
      type: "password",
      key: "UPLOADTHING_SECRET",
      message: "Uploadthing Secret",
    },
    { type: "input", key: "UPLOADTHING_APP_ID", message: "Uploadthing App ID" },
    {
      type: "input",
      key: "NEXT_PUBLIC_RESEND_API_KEY",
      message: "Resend API Key",
    },
    {
      type: "input",
      key: "NEXT_PUBLIC_RESEND_EMAIL_FROM",
      message: "Resend Email From",
      default: "onboarding@resend.dev",
    },
    { type: "input", key: "LOGLIB_ID", message: "Loglib ID" },
    {
      type: "input",
      key: "DISCORD_WEBHOOK_URL",
      message: "Discord Webhook URL",
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
      message: "Do you want to save these settings to .env file?",
      default: true,
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
