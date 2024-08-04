import consola from "consola";
import { execa } from "execa";
import { detectPackageManager } from "nypm";

const isString = (a: unknown): a is string => typeof a === "string";

type ExecuteOptions = {
  cwd?: string;
  stdio?: "ignore" | "inherit" | "pipe";
};

async function execute(
  command: string,
  packageManager?: string,
  options: ExecuteOptions = {},
) {
  try {
    let pm = packageManager;

    // Detect package manager if not provided
    if (!pm) {
      const detectedPM = await detectPackageManager(
        options.cwd || process.cwd(),
      );

      const manager = String(detectedPM);

      if (!isString(manager)) {
        throw new TypeError("Detected package manager is not a string.");
      }

      pm = manager;
    }

    // Execute the command using the detected or provided package manager
    const { stdout } = await execa(pm, command.split(" "), options);

    // Print command's output
    consola.info(stdout);

    return stdout;
  } catch (error) {
    consola.error(`Failed to execute command: ${command}`);
    consola.error(error);

    throw error;
  }
}

export default execute;
