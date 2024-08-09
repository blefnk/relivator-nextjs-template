import { defineAddon } from "@/scripts/utils";
import { defineCommand, runMain } from "citty";
import consola from "consola";

const main = defineCommand({
  meta: {
    name: "relicon",
    description: "@reliverse/relicon",
    version: "0.0.0-canary.0",
  },
  async run() {
    const message = defineAddon(
      "📦",
      "@reliverse/relicon",
      "action to perform",
      "<enter>",
    );

    const selected = await consola.prompt(message, {
      options: [
        "Add Configuration",
        "Remove Configuration",
        "Edit Configuration",
      ] as const,
      type: "select",
    });

    switch (selected) {
      case "Add Configuration":
        // await addConfig();
        consola.warn("addConfig is not implemented yet");
        break;

      case "Edit Configuration":
        // await editConfig();
        consola.warn("editConfig is not implemented yet");
        break;

      case "Remove Configuration":
        // await removeConfig();
        consola.warn("removeConfig is not implemented yet");
        break;

      default:
        break;
    }
  },
});

// import superjson from "superjson";
// import { destr } from "destr";
// Reads a configuration file and returns its contents as an object.
// export function readConfig(filePath: string): Record<string, unknown> {
//   if (fs.existsSync(filePath)) {
//     const data = fs.readFileSync(filePath, "utf8");
//     // Parse the JSON data and return it as an object
//     return destr(data);
//   }
//   // return destr(data);
//   throw new Error(`Configuration file not found: ${filePath}`);
// }
// Writes a given object to a configuration file.
// export function writeConfig(filePath: string, data: Record<string, unknown>) {
//   fs.writeFileSync(filePath, superjson.stringify(data, null, 2), "utf8");
// }
// Adds a new configuration key-value pair to a specified configuration file.
export function addConfig() {
  consola.warn("addConfig is not implemented yet");
}

// Edits an existing configuration key-value pair in a specified configuration file.
export function editConfig() {
  consola.warn("editConfig is not implemented yet");
}

// Removes a configuration key-value pair from a specified configuration file.
export function removeConfig() {
  consola.warn("removeConfig is not implemented yet");
}

runMain(main);

export default main;
