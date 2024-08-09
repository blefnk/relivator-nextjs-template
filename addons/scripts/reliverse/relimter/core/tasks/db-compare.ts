import consola from "consola";

// Function to parse schema file
const compareSchemas = (): string[] => {
  // todo: Add logic here to compare schema1 and schema2 and fill differences
  // ...
  return [];
};

// Main function to run the comparison
const main = () => {
  const differences = compareSchemas();

  if (differences.length === 0) {
    consola.info("No differences found.");
  } else {
    consola.info("Differences found:");

    for (const diff of differences) {
      consola.info(diff);
    }
  }
};

main();
