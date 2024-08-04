import consola from "consola";
import { execa } from "execa";

const { stdout } = await execa`pnpm check:execa`;

// Print command's output
consola.info(stdout);
