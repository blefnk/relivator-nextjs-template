# 🐞 Not finished. Please make commit before usage. This is a script that searches for the presence of `throw new Error` and replaces it with `throw new Error`. The script also adds the `import { BaseError } from "~/core/error";` if it is missing.

# Usage:
# py addons\reliverse\relimter\python\tasks\path-to-pathe.py

# After using this script, you may or not may need to run the following scripts:
# 1. If needed, find and remove duplicate imports (TODO: implement this script)
# 2. pnpm appts


import os
import re

# Directories containing the .ts, .tsx, .js, .jsx files
directories = ["addons", "src"]

# File encoding
file_encoding = "utf-8"

# The import statement for pathe
pathe_import = 'import { join, resolve, dirname, basename, extname } from "pathe";\n'

# Extra utilities import statement for pathe
pathe_utils_import = (
    'import { filename, normalizeAliases, resolveAlias } from "pathe/utils";\n'
)

# Counters for reporting
total_replacements = 0
total_files_modified = 0


def process_file(file_path):
    global total_replacements, total_files_modified
    with open(file_path, "r", encoding=file_encoding) as file:
        content = file.readlines()

    import_replaced = False
    new_content = []

    for line in content:
        # Replace path import statements
        if re.search(r'import\s+{?[a-zA-Z0-9_,\s]*}?\s+from\s+["\']path["\'];', line):
            # Check if pathe_utils_import is needed
            if re.search(
                r'import\s+{?\s*(filename|normalizeAliases|resolveAlias)\s*}?\s+from\s+["\']path["\'];',
                line,
            ):
                new_content.append(pathe_utils_import)
            else:
                new_content.append(pathe_import)
            import_replaced = True
        else:
            new_content.append(line)

    if import_replaced:
        # Prefix path functions with appropriate pathe imports
        functions = [
            "join",
            "resolve",
            "dirname",
            "basename",
            "extname",
            "filename",
            "normalizeAliases",
            "resolveAlias",
        ]
        modified_content = []
        for line in new_content:
            for func in functions:
                line = re.sub(r"\bpath\." + func + r"\b", func, line)
            modified_content.append(line)

        # Update counters if modifications were made
        total_replacements += 1
        total_files_modified += 1

        # Write the changes back to the file
        with open(file_path, "w", encoding=file_encoding) as file:
            file.writelines(modified_content)


def process_directory(directory):
    for root, _, files in os.walk(directory):
        for file in files:
            if file.endswith((".ts", ".tsx", ".js", ".jsx")):
                file_path = os.path.join(root, file)
                process_file(file_path)


for directory in directories:
    process_directory(directory)

print(f"Processing complete. Modified {total_files_modified} files.")
