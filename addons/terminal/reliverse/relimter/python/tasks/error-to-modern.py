# 🐞 Not finished. Please make commit before usage. This is a script that searches for the presence of `throw new Error` and replaces it with `throw new Error`. The script also adds the `import { BaseError } from "~/core/error";` if it is missing.

# Usage:
# py addons\reliverse\relimter\python\tasks\error-to-modern.py

# After using this script, you may or not may need to run the following scripts:
# 1. If needed, find and remove duplicate imports (TODO: implement this script)
# 2. pnpm appts


import os
import re

# Directories containing the .ts,.tsx files
directories = ["addons", "src"]

# File encoding
file_encoding = "utf-8"

# The import statement for BaseError
base_error_import = "\n"

# Counters for reporting
total_replacements = 0
total_files_modified = 0


def process_file(file_path):
    global total_replacements, total_files_modified
    with open(file_path, "r", encoding=file_encoding) as file:
        content = file.readlines()

    # Check if the file contains `throw new Error` or `throw new Error`
    contains_error = any(
        re.search(r"\bthrow\s+new\s+(Error|BaseError)\b", line) for line in content
    )

    if not contains_error:
        return  # Skip the file if it does not contain any relevant throw statements

    # Check if BaseError import is already present
    base_error_import_present = any(
        re.search(
            r'import\s+{[^}]*\bBaseError\b[^}]*}\s+from\s+["\']~\/utils["\'];', line
        )
        for line in content
    )

    if not base_error_import_present:
        # Find the latest import line
        last_import_index = -1
        utils_import_index = -1
        multi_line_import = False

        for i, line in enumerate(content):
            if line.strip().startswith("import "):
                last_import_index = i
                if re.search(r'import\s+{[^}]*}\s+from\s+["\']~\/utils["\'];', line):
                    utils_import_index = i
                elif re.search(r"import\s+{[^}]*", line) and "};" not in line:
                    multi_line_import = True

        if utils_import_index != -1:
            # Append BaseError to existing utils import
            if (
                "{" in content[utils_import_index]
                and "}" in content[utils_import_index]
            ):
                if content[utils_import_index].strip().endswith(";"):
                    content[utils_import_index] = content[utils_import_index].replace(
                        "}", ", BaseError}"
                    )
                else:
                    content[utils_import_index] = (
                        content[utils_import_index].strip()[:-1] + ",\n BaseError\n};\n"
                    )
        elif multi_line_import:
            # Handle multi-line imports
            for j in range(last_import_index, len(content)):
                if "};" in content[j]:
                    content[j] = content[j].replace("};", ",\n BaseError\n};")
                    break
        else:
            # Add a new import statement for BaseError
            content.insert(last_import_index + 1, base_error_import)

    # Replace `throw new Error` with `throw new Error`
    replacements = 0
    for i, line in enumerate(content):
        new_line = re.sub(r"\bthrow\s+new\s+Error\b", "throw new Error", line)
        if new_line != line:
            replacements += 1
            content[i] = new_line

    # Update counters if modifications were made
    if replacements > 0 or not base_error_import_present:
        total_replacements += replacements
        total_files_modified += 1

        # Write the changes back to the file
        with open(file_path, "w", encoding=file_encoding) as file:
            file.writelines(content)


def process_directory(directory):
    for root, _, files in os.walk(directory):
        for file in files:
            if file.endswith((".ts", ".tsx")):
                file_path = os.path.join(root, file)
                process_file(file_path)


for directory in directories:
    process_directory(directory)

print(
    f"Processing complete. {total_replacements} replacements in {total_files_modified} files."
)
