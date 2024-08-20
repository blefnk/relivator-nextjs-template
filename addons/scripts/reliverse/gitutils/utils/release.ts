import { getCurrentWorkingDirectory } from "@/../packageJson";
import { throwIfStagedChanges } from "@/scripts/reliverse/gitutils/utils/shell";
import consola from "consola";
import log4js from "log4js";

process.on("unhandledRejection", (error) => {
  consola.error("Unhandled Rejection:", error);
  process.exit(1);
});

log4js.configure({
  appenders: {
    console: {
      type: "console",
    },
  },
  categories: {
    default: {
      appenders: ["console"],
      level: "info",
    },
  },
});

const cwd = getCurrentWorkingDirectory();

// Pass an object with the `cwd` property
throwIfStagedChanges({
  cwd,
});

consola.warn("This utils script is not finished yet...");

process.exit(0);
