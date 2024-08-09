# py addons\reliverse\relimter\python\tasks\print-project-tree.py

import argparse
import logging
import os
from fnmatch import fnmatch

# Ignore list patterns
IGNORE_PATTERNS = [
    "**/.git",
    "**/.idea",
    "**/.next",
    "**/.nyc_output",
    "**/.pnp.*",
    "**/.turbo",
    "**/.venv",
    "**/.yarn",
    "**/*.gif",
    "**/*.jpeg",
    "**/*.lock",
    "**/*.png",
    "**/build",
    "**/dist",
    "**/node_modules",
    "**/package-lock.json",
    "**/pnpm-lock.yaml",
    "**/target",
    "**/yarn-error.log",
]

OUTPUT_TEXT_FILE = "addons/.output/print-project-tree.txt"
OUTPUT_MD_FILE = "addons/.output/print-project-tree.md"


def is_ignored(path):
    for pattern in IGNORE_PATTERNS:
        if fnmatch(path, pattern):
            return True
    return False


def paint_tree(
    directory, prefix="", file=None, md_file=None, base_dir="", console=False
):
    entries = os.listdir(directory)
    entries.sort()
    for i, entry in enumerate(entries):
        path = os.path.join(directory, entry)
        if is_ignored(path):
            continue

        connector = "├── " if i < len(entries) - 1 else "└── "
        relative_path = os.path.relpath(path, base_dir)
        line = prefix + connector + entry
        md_line = prefix + connector + f"[{entry}]({relative_path})"

        if console:
            print(line)
        if file:
            file.write(line + "\n")
        if md_file:
            md_file.write(md_line + "\n")

        if os.path.isdir(path):
            extension = "│   " if i < len(entries) - 1 else "    "
            paint_tree(path, prefix + extension, file, md_file, base_dir, console)


def main():
    # Parse command-line arguments
    parser = argparse.ArgumentParser(description="Print the tree of project structure.")
    parser.add_argument(
        "--directory",
        type=str,
        default=".",
        help="The directory to scan. Default is the current directory.",
    )
    parser.add_argument(
        "--console",
        action="store_true",
        help="Show the result in the console.",
    )
    args = parser.parse_args()

    # Configure logging
    logging.basicConfig(
        level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s"
    )

    root_directory = args.directory

    if not os.path.isdir(root_directory):
        logging.error(f"The specified directory does not exist: {root_directory}")
        return

    os.makedirs(os.path.dirname(OUTPUT_TEXT_FILE), exist_ok=True)
    os.makedirs(os.path.dirname(OUTPUT_MD_FILE), exist_ok=True)

    with (
        open(OUTPUT_TEXT_FILE, "w", encoding="utf-8") as text_file,
        open(OUTPUT_MD_FILE, "w", encoding="utf-8") as md_file,
    ):
        text_file.write(root_directory + "\n")
        md_file.write(
            "# Project Tree Structure\n\n"
            "Use `Cmd/Ctrl+Shift+P -> >Markdown: Open Preview` to view this file in VSCode (ensure you've Markdown extension installed)\n\n"
            "Run the following script to update this tree: `py addons/scripts/reliverse/relimter/python/tasks/scripts/print-project-tree.py`\n\n"
            "```md\n"
        )
        md_file.write(f"{root_directory}\n")

        paint_tree(
            root_directory,
            file=text_file,
            md_file=md_file,
            base_dir=root_directory,
            console=args.console,
        )

        md_file.write("```\n")

    logging.info(f"Tree structure written to {OUTPUT_TEXT_FILE} and {OUTPUT_MD_FILE}")


if __name__ == "__main__":
    main()
