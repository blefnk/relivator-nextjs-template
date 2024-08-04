# ⛔ May be unstable. Please make a commit before usage. This is a script that removes duplicate comments from the codebase.
# 🐍 py addons\reliverse\relimter\python\tasks\remove-duplicates-comments.py

import glob
import os
import re


def remove_duplicate_comments(file_path):
    # The comment patterns to exclude
    exclude_patterns = [
        re.compile(r"^\s*//\s*@.*"),
        re.compile(r"^\s*//\s*eslint.*"),
        re.compile(r"^\s*//\s*biome.*"),
    ]

    with open(file_path, "r", encoding="utf-8") as file:
        lines = file.readlines()

    cleaned_lines = []
    seen_comments = set()

    # Process the lines in reverse to keep the latest instance of each comment
    for line in reversed(lines):
        if any(pattern.match(line) for pattern in exclude_patterns):
            cleaned_lines.append(line)
            continue

        if line.startswith("//"):
            if line in seen_comments:
                continue
            seen_comments.add(line)

        cleaned_lines.append(line)

    # Reverse the cleaned lines to restore the original order
    cleaned_lines.reverse()

    # Check if there are any changes
    if cleaned_lines != lines:
        # Write the cleaned lines back to the file only if there are changes
        with open(file_path, "w", encoding="utf-8") as file:
            file.writelines(cleaned_lines)
        print(f"Processed file: {file_path}")
    # else:
    # print(f"No changes in file: {file_path}")


def process_all_ts_files(base_dirs):
    for base_dir in base_dirs:
        for file_path in glob.iglob(
            os.path.join(base_dir, "**", "*.ts"), recursive=True
        ):
            remove_duplicate_comments(file_path)


# The directories to search for .ts files
directories_to_process = ["src", "addons"]
process_all_ts_files(directories_to_process)
