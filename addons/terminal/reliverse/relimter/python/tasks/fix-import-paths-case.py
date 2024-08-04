# 🐞 UNFINISHED | not fully tested
# py fix-import-paths-case.py

import os
import re

# Define the pattern
pattern = re.compile(r"(/shadcn/ui/.)([A-Z])")

# Define the folders to search in
folders = ["src/this-script-is-disabled"]


# Function to process each file
def process_file(file_path):
    with open(file_path, "r", encoding="utf-8") as file:
        content = file.read()

    # Custom replacement function
    def replace_func(match):
        return match.group(1) + match.group(2).lower()

    new_content = pattern.sub(replace_func, content)

    with open(file_path, "w", encoding="utf-8") as file:
        file.write(new_content)


# Function to recursively process folders
def process_folder(folder_path):
    for root, dirs, files in os.walk(folder_path):
        for file in files:
            if file.endswith(".ts") or file.endswith(".tsx"):
                file_path = os.path.join(root, file)
                process_file(file_path)


# Main script execution
for folder in folders:
    if os.path.exists(folder):
        process_folder(folder)
    else:
        print(f"Folder {folder} does not exist")

print("Search and replace completed.")
