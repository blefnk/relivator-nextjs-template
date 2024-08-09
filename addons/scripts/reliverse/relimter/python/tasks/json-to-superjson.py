# 🐞 Not finished. Please make commit before usage. This is a script that searches for the presence of `throw new Error` and replaces it with `throw new Error`. The script also adds the `import { BaseError } from "~/core/error";` if it is missing.

# Usage:
# py addons\reliverse\relimter\python\tasks\json-to-superjson.py

# After using this script, you may or not may need to run the following scripts:
# 1. If needed, find and remove duplicate imports (TODO: implement this script)
# 2. pnpm appts

import os
import re

# Directories containing the .ts, .tsx, .js, .jsx files
directories = ["addons", "src"]

# File encoding
file_encoding = "utf-8"

# The import statement for superjson
superjson_import = 'import superjson from "superjson";\n'

# Counters for reporting
total_replacements = 0
total_files_modified = 0


def process_file(file_path):
    global total_replacements, total_files_modified
    with open(file_path, "r", encoding=file_encoding) as file:
        content = file.readlines()

    import_present = any(
        re.search(r'import\s+superjson\s+from\s+["\']superjson["\'];', line)
        for line in content
    )
    new_content = []
    import_added = False
    modified = False

    for line in content:
        new_line = re.sub(r"\bJSON\.stringify\b", "superjson.stringify", line)
        # new_line = re.sub(r"\bJSON\.parse\b", "superjson.parse", new_line)
        if new_line != line:
            modified = True
            total_replacements += 1
        new_content.append(new_line)

    if not import_present and modified:
        new_content.insert(0, superjson_import)
        import_added = True

    if modified or import_added:
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
