# 🐞 Not finished. Please make commit before usage. This is a script that searches for the presence of `throw new Error` and replaces it with `throw new Error`. The script also adds the `import { BaseError } from "~/core/error";` if it is missing.

# Usage:
# py addons\reliverse\relimter\python\tasks\node-fetch-native.py

# After using this script, you may or not may need to run the following scripts:
# 1. If needed, find and remove duplicate imports (TODO: implement this script)
# 2. pnpm appts


import os
import re

# Directories containing the .ts, .tsx, .js, .jsx files
directories = ["addons", "src"]

# File encoding
file_encoding = "utf-8"

# The import statement for node-fetch-native
fetch_import = 'import fetch from "node-fetch-native";\n'

# Additional named imports from node-fetch-native
named_imports = [
    "Blob",
    "FormData",
    "Headers",
    "Request",
    "Response",
    "AbortController",
]

# Counters for reporting
total_replacements = 0
total_files_modified = 0


def process_file(file_path):
    global total_replacements, total_files_modified
    with open(file_path, "r", encoding=file_encoding) as file:
        content = file.readlines()

    import_replaced = False
    new_content = []
    imports_added = False
    contains_fetch_usage = any(re.search(r"\bfetch\b", line) for line in content)

    fetch_already_imported = any(
        re.search(r'import\s+fetch\s+from\s+["\']node-fetch-native["\'];', line)
        for line in content
    )

    for line in content:
        # Replace node-fetch import statements
        if re.search(r'import\s+fetch\s+from\s+["\']node-fetch["\'];', line):
            if not fetch_already_imported:
                new_content.append(fetch_import)
                fetch_already_imported = True
            import_replaced = True
        elif re.search(
            r'import\s+{?\s*fetch\s*}?\s+from\s+["\']node-fetch["\'];', line
        ):
            if not fetch_already_imported:
                new_content.append(fetch_import)
                fetch_already_imported = True
            import_replaced = True
        else:
            new_content.append(line)

    # Add fetch import if fetch is used but not imported
    if contains_fetch_usage and not fetch_already_imported:
        new_content.insert(0, fetch_import)
        imports_added = True

    # Replace individual named imports from node-fetch to node-fetch-native
    for named_import in named_imports:
        for i, line in enumerate(new_content):
            new_content[i] = re.sub(
                rf'import\s+{{[^}}]*\b{named_import}\b[^}}]*}}\s+from\s+["\']node-fetch["\'];',
                f'import {named_import} from "node-fetch-native";',
                line,
            )

    if import_replaced or imports_added:
        total_replacements += 1
        total_files_modified += 1
        with open(file_path, "w", encoding=file_encoding) as file:
            file.writelines(new_content)


def process_directory(directory):
    for root, _, files in os.walk(directory):
        for file in files:
            if file.endswith((".ts", ".tsx", ".js", ".jsx")):
                file_path = os.path.join(root, file)
                process_file(file_path)


for directory in directories:
    process_directory(directory)

print(
    f"Processing complete. {total_replacements} replacements in {total_files_modified} files."
)
