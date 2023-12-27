module.exports = (wallaby) => ({
  // env: { type: "node", params: { runner: "--experimental-vm-modules" } },
  // files: ["!src/tests/jest/**/*.test.ts", "package.json"],
  // tests: ["src/tests/jest/**/*.test.ts"],
  maxConsoleMessagesPerTest: 10000,
  reportConsoleErrorAsError: true,
  workers: { restart: true },
  maxTraceSteps: 2000000,
  delays: { run: 2000 },
  testFramework: "jest",
  autoDetect: true,
  // compilers: {
  //   "**/*.ts?(x)": wallaby.compilers.typeScript({
  //     module: "es2017",
  //     target: "esnext",
  //     jsx: "React",
  //   }),
  // },
});
