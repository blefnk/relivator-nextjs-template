# 🐞 Please commit the changes to the repository before running the script.
# >> py addons/scripts/reliverse/relimter/python/tasks/correct-comments-location.py

import os
import re


def process_file(filepath):
    with open(filepath, "r", encoding="utf-8") as file:
        lines = file.readlines()

    comments = []
    imports = []
    other_lines = []
    is_comment = True
    is_import = True

    for line in lines:
        if is_comment and line.strip().startswith("//"):
            comments.append(line)
        else:
            is_comment = False
            if is_import and line.strip().startswith("import"):
                imports.append(line)
            else:
                is_import = False
                other_lines.append(line)

    if comments:
        # Find the position to insert comments
        for idx, line in enumerate(other_lines):
            if re.match(r"^\s*(const|export|let|js|ts|interface|type)", line):
                insert_position = idx
                break
        else:
            insert_position = len(other_lines)

        # Reconstruct the file content
        new_content = (
            "".join(imports)
            + "".join(comments)
            + "".join(other_lines[insert_position:])
        )

        with open(filepath, "w", encoding="utf-8") as file:
            file.write(new_content)
            print(f"Processed file: {filepath}")


def process_folder(folder_path):
    for root, _, files in os.walk(folder_path):
        for file in files:
            if file.endswith(".ts") or file.endswith(".tsx"):
                filepath = os.path.join(root, file)
                process_file(filepath)


if __name__ == "__main__":
    src_folder = "src"
    process_folder(src_folder)
