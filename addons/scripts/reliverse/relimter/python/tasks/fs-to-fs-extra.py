# 🐞 Not finished. Please make commit before usage. This is a script that searches for the presence of `throw new Error` and replaces it with `throw new Error`. The script also adds the `import { BaseError } from "~/core/error";` if it is missing.

# Usage:
# py addons\reliverse\relimter\python\tasks\fs-to-fs-extra.py

# After using this script, you may or not may need to run the following scripts:
# 1. If needed, find and remove duplicate imports (TODO: implement this script)
# 2. pnpm appts


import os
import re

# Directories containing the .ts,.tsx files
directories = ["addons", "src"]

# File encoding
file_encoding = "utf-8"

# The new import statement for fs-extra
fs_extra_import = 'import fs from "fs-extra";\n'

# Counters for reporting
total_files_modified = 0


def process_file(file_path):
    global total_files_modified
    with open(file_path, "r", encoding=file_encoding) as file:
        content = file.readlines()

    import_replaced = False
    new_content = []
    functions_to_prefix = set()

    for line in content:
        # Find and replace import statements
        match = re.search(r'import\s+{([^}]*)}\s+from\s+["\'](fs|fs-extra)["\'];', line)
        if match:
            # Extract functions to prefix
            functions = match.group(1).split(",")
            for function in functions:
                functions_to_prefix.add(function.strip())
            new_content.append(fs_extra_import)
            import_replaced = True
        elif re.search(r'import\s+fs\s+from\s+["\']fs["\'];', line):
            new_content.append(fs_extra_import)
            import_replaced = True
        else:
            new_content.append(line)

    if import_replaced:
        # Prefix fs. to the relevant functions
        modified_content = []
        for line in new_content:
            for function in functions_to_prefix:
                line = re.sub(
                    r"\b" + re.escape(function) + r"\b", "fs." + function, line
                )
            modified_content.append(line)

        # Update counters if modifications were made
        total_files_modified += 1

        # Write the changes back to the file
        with open(file_path, "w", encoding=file_encoding) as file:
            file.writelines(modified_content)


def process_directory(directory):
    for root, _, files in os.walk(directory):
        for file in files:
            if file.endswith((".ts", ".tsx")):
                file_path = os.path.join(root, file)
                process_file(file_path)


for directory in directories:
    process_directory(directory)

print(f"Processing complete. Modified {total_files_modified} files.")
