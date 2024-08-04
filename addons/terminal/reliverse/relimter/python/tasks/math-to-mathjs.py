# 🐞 Not finished. Please make commit before usage. This is a script that searches for the presence of `throw new Error` and replaces it with `throw new Error`. The script also adds the `import { BaseError } from "~/core/error";` if it is missing.

# Usage:
# py addons\reliverse\relimter\python\tasks\math-to-mathjs.py

# After using this script, you may or not may need to run the following scripts:
# 1. If needed, find and remove duplicate imports (TODO: implement this script)
# 2. pnpm appts


import os
import re

# Directories containing the .ts, .tsx, .js, .jsx files
directories = ["addons", "src"]

# File encoding
file_encoding = "utf-8"

# Configuration object for math.js with separate type import and "|| {}"
mathjs_imports = """import { create, all } from 'mathjs';
import type { ConfigOptions } from 'mathjs';

const mathjsConfig: ConfigOptions = {
  relTol: 1e-12,
  absTol: 1e-15,
  matrix: 'Matrix',
  number: 'number',
  precision: 64,
  predictable: false,
  randomSeed: null
};
const math = create(all || {}, mathjsConfig);\n\n"""

# Mapping of native Math functions to math.js functions
math_functions = {
    "Math.abs": "math.abs",
    "Math.acos": "math.acos",
    "Math.acosh": "math.acosh",
    "Math.asin": "math.asin",
    "Math.asinh": "math.asinh",
    "Math.atan": "math.atan",
    "Math.atan2": "math.atan2",
    "Math.atanh": "math.atanh",
    "Math.cbrt": "math.cbrt",
    "Math.ceil": "math.ceil",
    "Math.clz32": "math.clz32",
    "Math.cos": "math.cos",
    "Math.cosh": "math.cosh",
    "Math.exp": "math.exp",
    "Math.expm1": "math.expm1",
    "Math.floor": "math.floor",
    "Math.fround": "math.fround",
    "Math.hypot": "math.hypot",
    "Math.imul": "math.imul",
    "Math.log": "math.log",
    "Math.log1p": "math.log1p",
    "Math.log2": "math.log2",
    "Math.log10": "math.log10",
    "Math.max": "math.max",
    "Math.min": "math.min",
    "Math.pow": "math.pow",
    "Math.random": "math.random",
    "Math.round": "math.round",
    "Math.sign": "math.sign",
    "Math.sin": "math.sin",
    "Math.sinh": "math.sinh",
    "Math.sqrt": "math.sqrt",
    "Math.tan": "math.tan",
    "Math.tanh": "math.tanh",
    "Math.trunc": "math.trunc",
}

# Counters for reporting
total_replacements = 0
total_files_modified = 0


def process_file(file_path):
    global total_replacements, total_files_modified
    with open(file_path, "r", encoding=file_encoding) as file:
        content = file.readlines()

    import_present = any(
        re.search(
            r'import\s+\{\s*create\s*,\s*all\s*\}\s+from\s+["\']mathjs["\'];', line
        )
        for line in content
    )
    type_import_present = any(
        re.search(
            r'import\s+type\s+\{\s*ConfigOptions\s*\}\s+from\s+["\']mathjs["\'];', line
        )
        for line in content
    )

    new_content = []
    import_added = False
    modified = False

    for line in content:
        new_line = line
        for native_func, mathjs_func in math_functions.items():
            new_line = re.sub(rf"\b{native_func}\b", mathjs_func, new_line)
        if new_line != line:
            modified = True
            total_replacements += 1
        new_content.append(new_line)

    if modified:
        # Find the last import statement to insert the math.js import after it
        import_lines = [
            i
            for i, line in enumerate(new_content)
            if re.match(r"^\s*import\s+.*;", line)
        ]
        if import_lines:
            last_import_index = import_lines[-1]
            if not import_present:
                new_content.insert(
                    last_import_index + 1, "import { create, all } from 'mathjs';\n"
                )
            if not type_import_present:
                new_content.insert(
                    last_import_index + 2,
                    "import type { ConfigOptions } from 'mathjs';\n",
                )
            new_content.insert(
                last_import_index + 3,
                "const mathjsConfig: ConfigOptions = {\n  relTol: 1e-12,\n  absTol: 1e-15,\n  matrix: 'Matrix',\n  number: 'number',\n  precision: 64,\n  predictable: false,\n  randomSeed: null\n};\nconst math = create(all || {}, mathjsConfig);\n\n",
            )
        else:
            new_content.insert(0, mathjs_imports)
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
