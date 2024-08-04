import childProcess from "child_process";

// Run command capturing stdout. Trailing newlines are stripped (like the shell does).
export const runc = (command: string, options = {}) =>
  childProcess
    .execSync(command, {
      encoding: "utf8",
      ...options,
    })
    .replace(/\n+$/, "")
    .trim();

// Run command without capturing stdout.
export const run = (command: string, options = {}) =>
  childProcess.execSync(command, {
    stdio: "inherit",
    ...options,
  });

export const checkStagedChanges = (options: {
  cwd: string;
}) => runc("git diff-index --cached --name-status HEAD", options);

export const throwIfStagedChanges = (options: {
  cwd: string;
}) => {
  const changes = checkStagedChanges(options);

  if (changes.length > 0) {
    throw new Error(
      `Uncommitted changes in working directory ${options.cwd}:\n${changes}`,
    );
  }
};
