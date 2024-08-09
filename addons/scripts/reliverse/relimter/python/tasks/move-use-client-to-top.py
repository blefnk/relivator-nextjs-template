# 🐞 Please commit the changes to the repository before running the script.
# >> py addons/scripts/reliverse/relimter/python/tasks/move-use-client-to-top.py

import os


def process_file(filepath):
    with open(filepath, "r", encoding="utf-8") as file:
        lines = file.readlines()

    use_client_lines = []
    other_lines = []
    found_use_client = False

    for line in lines:
        if '"use client";' in line or '"use client";' in line:
            use_client_lines.append(line)
            found_use_client = True
        else:
            other_lines.append(line)

    if found_use_client:
        with open(filepath, "w", encoding="utf-8") as file:
            file.writelines(use_client_lines)
            file.writelines(other_lines)
            print(f"Processed file: {filepath}")


def process_folder(folder_path):
    for root, _, files in os.walk(folder_path):
        for file in files:
            if file.endswith(".tsx"):
                filepath = os.path.join(root, file)
                process_file(filepath)


if __name__ == "__main__":
    src_folder = "src"
    process_folder(src_folder)
