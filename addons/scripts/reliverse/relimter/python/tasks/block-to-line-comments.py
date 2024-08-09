# ⛔ WARNING: Not finished. Use at your own risk.
# py addons/scripts/reliverse/relimter/python/tasks/block-to-line-comments.py

import os
import re

# File extensions to process
FILE_EXTENSIONS = (
    ".js",
    ".ts",
    ".jsx",
    ".tsx",
    ".mjs",
    ".mts",
    ".cjs",
    ".cts",
    ".mjsx",
    ".mtsx",
)

# Regex patterns for block comments starting at the beginning of a line
multi_line_comment_pattern = re.compile(r"^\s*/\*[\s\S]*?\*/", re.MULTILINE)
special_directive_pattern = re.compile(
    r"/\*\s*eslint-disable\s+[^\*]*\*/", re.IGNORECASE
)

# Regex for cleaning up unwanted characters after conversion
cleanup_pattern = re.compile(r"//\s*[*\/]+")


def replace_comments(content, file_path):
    def multi_line_comment_replacer(match):
        comment = match.group(0)

        # Check for special directives and skip if found
        if special_directive_pattern.search(comment):
            print(
                f"✅ Skipped special directive in file {file_path}: {comment.strip()}"
            )
            return comment

        # Split the comment into lines and prepend '//' to each line
        lines = comment.split("\n")
        lines = [line.strip() for line in lines]

        # Check if the comment contains complex structures
        if any(re.search(r"[{};]", line) for line in lines):
            # print(f"Skipped complex comment in file {file_path}: {comment}")
            print(f"Skipped complex comment in file {file_path}")
            return comment

        single_line_comments = [
            "// " + line[1:].strip() if line.startswith("*") else "// " + line
            for line in lines
        ]

        # Join the lines back and clean up any unwanted characters
        single_line_comments = "\n".join(single_line_comments)
        single_line_comments = cleanup_pattern.sub("//", single_line_comments)
        return single_line_comments

    try:
        # Replace multi-line comments starting at the beginning of a line
        content = re.sub(
            multi_line_comment_pattern, multi_line_comment_replacer, content
        )
    except Exception as e:
        print(f"Error processing file {file_path}: {e}")
        return content

    return content


def process_file(file_path):
    with open(file_path, "r", encoding="utf-8") as file:
        content = file.read()

    new_content = replace_comments(content, file_path)

    if new_content != content:
        with open(file_path, "w", encoding="utf-8") as file:
            file.write(new_content)
        print(f"Processed file: {file_path}")
    else:
        print(f"✅ Nothing to convert in file: {file_path}")


def process_directory(directory):
    for root, _, files in os.walk(directory):
        for file in files:
            if file.endswith(FILE_EXTENSIONS):
                process_file(os.path.join(root, file))


if __name__ == "__main__":
    directories_to_process = ["./src", "./addons"]
    for directory in directories_to_process:
        process_directory(directory)
