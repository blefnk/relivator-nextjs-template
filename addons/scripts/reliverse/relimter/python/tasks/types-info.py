# ! 🔴 USE AT OWN RISK 🔴 ! IT IS NOT FINISHED YET AND NOT TESTED TOO MUCH !

# This script provides a framework, but the crucial part, analyze_typescript_file, where we parse and extract the type information from TypeScript files, is not implemented. This requires a more sophisticated approach, possibly using a TypeScript parser or AST (Abstract Syntax Tree) analyzer in Python. The possible library for this is typescript-estree, which we can use via a Node.js script and then integrate its output into our Python script.
# Also, the information we might want to extract about each type could include:
# Type name | File where it's defined | Line number | Properties of the type (if it's an object)
# Extends or implements other types (inheritance/interfaces) | Usage count across the project

# TODO: Implement the logic to analyze the typescript file
# and extract type information

import csv
import os
import re
from typing import Any, Dict, List


def find_ts_files(directory: str) -> List[str]:
    ts_files = []
    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.endswith(".ts") or file.endswith(".tsx"):
                ts_files.append(os.path.join(root, file))
    return ts_files


def analyze_typescript_file(file_path: str) -> List[Dict[str, Any]]:
    type_info = []
    with open(file_path, "r", encoding="utf-8") as file:
        content = file.read()
        # This regex is a simple example and might need to be improved
        matches = re.findall(r"type\s+(\w+)\s+=\s+{([^}]*)}", content)
        for match in matches:
            type_name, type_definition = match
            type_info.append(
                {
                    "file": file_path,
                    "type_name": type_name,
                    "type_definition": type_definition.strip(),
                }
            )
    return type_info


def write_to_csv(data: List[Dict[str, Any]], output_file: str):
    if not data:
        print("No type information found. CSV file not created.")
        return

    with open(output_file, mode="w", newline="", encoding="utf-8") as file:
        writer = csv.DictWriter(file, fieldnames=data[0].keys())
        writer.writeheader()
        writer.writerows(data)


def main():
    project_directory = "src"
    output_csv = "typescript_analysis.csv"

    all_types = []
    for ts_file in find_ts_files(project_directory):
        types_in_file = analyze_typescript_file(ts_file)
        all_types.extend(types_in_file)

    write_to_csv(all_types, output_csv)


if __name__ == "__main__":
    main()
