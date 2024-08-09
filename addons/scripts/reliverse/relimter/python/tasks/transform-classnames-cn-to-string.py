# ! 🔴 USE AT OWN RISK 🔴 ! IT IS NOT FINISHED YET AND NOT TESTED TOO MUCH !

# Script to search for disabled ESLint plugin rules
# Created by Nazar Kornienko https://github.com/blefnk
# To use run `py src/tools/unstable/transform_classnames_cn2string.py` !!! FROM THE ROOT
# Run `convert_crlf_to_lf.py`, then `pnpm appts` command

import os
import re

# Directory to search for .ts and .tsx files
directory = "src"

# Pattern to search for
pattern = re.compile(
    r"""
    className=\{cn\(\n
    (?:\s+"[^"]+",\n)+
    \s*\)\}
""",
    re.DOTALL | re.VERBOSE,
)


# Function to transform the matched pattern
def transform(match):
    classes = match.group(0)
    class_list = re.findall(r'"([^"]+)"', classes)
    class_string = " ".join(class_list)
    return f'className="{class_string}"'


# Function to process a single file
def process_file(file_path):
    with open(file_path, "r", encoding="utf-8") as file:
        content = file.read()

    new_content, count = re.subn(pattern, transform, content)

    if count > 0:
        with open(file_path, "w", encoding="utf-8") as file:
            file.write(new_content)
        print(f"Transformed {count} occurrence(s) in {file_path}")


# Function to walk through the directory and process files
def process_directory(directory):
    for root, _, files in os.walk(directory):
        for file in files:
            if file.endswith(".ts") or file.endswith(".tsx"):
                file_path = os.path.join(root, file)
                process_file(file_path)


# Execute the transformation
process_directory(directory)
