# 🐞 Not finished. Please make commit before usage. This is a script that searches for the presence of specific patterns in TypeScript files and adds import statements if they are missing.
# Currently, the script searches only for ComponentRef<...> and checks if the file has the corresponding import statement. If the import statement is missing, the script adds it: import type { ComponentRef } from "react";.

# Usage:
# py addons\reliverse\relimter\python\tasks\add-missing-url-import.py

# After using this script, run the following scripts:
# 1. py addons\reliverse\relimter\python\tasks\fix-use-directives.py
# 2. If needed, find and remove duplicate imports (TODO: implement this script)
# 3. pnpm appts

import os

# Directory containing the .tsx files
src_dir = "src"

# The import statement to add
import_statement = 'import { baseUrl } from "@/browser/shared/utils/url";\n'


def add_import_statement(file_path):
    with open(file_path, "r", encoding="utf-8") as file:
        lines = file.readlines()

    # Check if the import statement is already present
    if any(import_statement.strip() in line for line in lines):
        return

    # Check if 'baseUrl' is used in the file
    if not any("baseUrl" in line for line in lines):
        return

    # Add the import statement at the beginning of the file
    lines.insert(0, import_statement)

    with open(file_path, "w", encoding="utf-8") as file:
        file.writelines(lines)
    print(f"Added import statement to {file_path}")


def process_directory(directory):
    for root, _, files in os.walk(directory):
        for file in files:
            if file.endswith(".tsx"):
                file_path = os.path.join(root, file)
                add_import_statement(file_path)


if __name__ == "__main__":
    process_directory(src_dir)
