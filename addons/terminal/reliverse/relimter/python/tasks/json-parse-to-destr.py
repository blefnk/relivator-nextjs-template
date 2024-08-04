# 🐞 Not finished. Please make commit before usage. This is a script that searches for the presence of `throw new Error` and replaces it with `throw new Error`. The script also adds the `import { BaseError } from "~/core/error";` if it is missing.

# Usage:
# py addons\reliverse\relimter\python\tasks\json-parse-to-destr.py

# After using this script, you may or not may need to run the following scripts:
# 1. If needed, find and remove duplicate imports (TODO: implement this script)
# 2. pnpm appts


import os
import re

# Directories containing the .ts, .tsx, .js, .jsx files
directories = ["addons", "src"]

# File encoding
file_encoding = "utf-8"

# ESM and CommonJS import statements for destr
esm_import = 'import { destr, safeDestr } from "destr";\n'
commonjs_import = 'const { destr, safeDestr } = require("destr");\n'

# Counters for reporting
total_replacements = 0
total_files_modified = 0


def process_file(file_path):
    global total_replacements, total_files_modified
    with open(file_path, "r", encoding=file_encoding) as file:
        content = file.readlines()

    import_replaced = False
    esm_import_present = any(
        re.search(r'import\s+{[^}]*\bdestr\b[^}]*}\s+from\s+["\']destr["\'];', line)
        for line in content
    )
    commonjs_import_present = any(
        re.search(
            r'const\s+{[^}]*\bdestr\b[^}]*}\s+=\s+require\s*\(\s*["\']destr["\']\s*\);',
            line,
        )
        for line in content
    )

    new_content = []
    for line in content:
        if "JSON.parse" in line:
            # Replace JSON.parse with destr
            new_line = re.sub(r"\bJSON\.parse\b", "destr", line)
            new_content.append(new_line)
            import_replaced = True
            total_replacements += 1
        else:
            new_content.append(line)

    if import_replaced and not (esm_import_present or commonjs_import_present):
        # Detect if the file uses ESM or CommonJS
        is_esm = any(re.search(r"\bimport\b", line) for line in content)
        is_commonjs = any(re.search(r"\brequire\b", line) for line in content)

        if is_esm:
            # Add ESM import statement
            new_content.insert(0, esm_import)
        elif is_commonjs:
            # Add CommonJS import statement
            new_content.insert(0, commonjs_import)

    # Write back to the file if modifications were made
    if import_replaced:
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
