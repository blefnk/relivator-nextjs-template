# 🐞 Please commit the changes to the repository before running the script. The script will update import paths in the src directory to use barrel files.
# py addons\reliverse\relimter\python\tasks\barrel-shadcn-primitives.py

import argparse
import os
import re

# File extensions to check
FILE_EXTENSIONS = (".jsx", ".tsx")

# Regular expression to match import statements
IMPORT_REGEX = re.compile(
    r'(?P<import>import\s+{[^}]+}\s+from\s+["\'])(?P<path>~\/components\/Primitives[\/\w-]*)(["\'])'
)


def update_imports(file_path):
    with open(file_path, "r", encoding="utf-8") as file:
        lines = file.readlines()

    modified = False
    updated_lines = []

    for line in lines:
        match = IMPORT_REGEX.search(line)
        if match:
            import_statement = match.group("import")
            import_path = match.group("path")
            import_extension = match.group(3)

            # Only update if the path contains a deeper directory structure within ~/components/Primitives
            if import_path.startswith("@/components/ui/"):
                new_import_path = "/".join(import_path.split("/")[:3])
                new_import_statement = (
                    f"{import_statement}{new_import_path}{import_extension}"
                )
                updated_line = line.replace(match.group(0), new_import_statement)
                updated_lines.append(updated_line)
                modified = True
            else:
                updated_lines.append(line)
        else:
            updated_lines.append(line)

    if modified:
        with open(file_path, "w", encoding="utf-8") as file:
            file.writelines(updated_lines)
        print(f"Updated imports in {file_path}")


def process_files(directory):
    for root, _, files in os.walk(directory):
        for file in files:
            if file.endswith(FILE_EXTENSIONS):
                file_path = os.path.join(root, file)
                update_imports(file_path)


def main():
    # Parse command-line arguments
    parser = argparse.ArgumentParser(
        description="Update import paths to use barrel files in the src directory."
    )
    parser.add_argument(
        "--directory",
        type=str,
        default="src",
        help="The directory to scan. Default is 'src'.",
    )
    args = parser.parse_args()

    process_files(args.directory)


if __name__ == "__main__":
    main()
