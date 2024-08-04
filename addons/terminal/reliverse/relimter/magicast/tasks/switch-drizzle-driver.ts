import consola from "consola";

const accepted = await consola.prompt(
  "We're going to switch Drizzle driver. Do you want to continue?",
);

if (accepted) {
  consola.info(
    "Canceled. We still working on this task. Please wait for the next update.",
  );
}
