# 🐞 Not finished. Please make commit before usage. This is a script that searches for the presence of specific patterns in TypeScript files and adds import statements if they are missing.
# Currently, the script searches only for ComponentRef<...> and checks if the file has the corresponding import statement. If the import statement is missing, the script adds it: import type { ComponentRef } from "react";.

# Usage:
# py addons\reliverse\relimter\python\tasks\add-missing-ref-import.py

# After using this script, run the following scripts:
# 1. py addons\reliverse\relimter\python\tasks\fix-use-directives.py
# 2. If needed, find and remove duplicate imports (TODO: implement this script)
# 3. pnpm appts

import os
import re

# Processed path
components_folder = "src/components"

# Import statement to add
import_statement = 'import type { ComponentRef } from "react";\n'


# Function to check and add import statement
def check_and_add_import(file_path):
    with open(file_path, "r", encoding="utf-8") as file:
        content = file.readlines()

    # Check if import statement is already present
    has_import = any(import_statement.strip() in line for line in content)

    # Search for ComponentRef usage
    component_ref_usage = any(re.search(r"ComponentRef<.*>", line) for line in content)

    if component_ref_usage and not has_import:
        print(f"Adding import to {file_path}")
        content.insert(0, import_statement)

        with open(file_path, "w", encoding="utf-8") as file:
            file.writelines(content)
    else:
        print(f"No changes needed for {file_path}")


# Walk through the components folder
for root, _, files in os.walk(components_folder):
    for file in files:
        if file.endswith(".tsx"):
            file_path = os.path.join(root, file)
            check_and_add_import(file_path)

print("Script execution completed.")
