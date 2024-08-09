# py addons\reliverse\relimter\python\tasks\list-variables-types.py

import argparse
import json
import logging
import os
import re
from concurrent.futures import ProcessPoolExecutor, as_completed
from fnmatch import fnmatch

# File extensions to check
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
    ".d.ts",
)

# Ignore list patterns
IGNORE_PATTERNS = [
    "**/.git",
    "**/.idea",
    "**/.next",
    "**/.nyc_output",
    "**/.pnp.*",
    "**/.yarn",
    "**/*.gif",
    "**/*.jpeg",
    "**/*.lock",
    "**/*.png",
    "**/build",
    "**/dist",
    "**/node_modules",
    "**/package-lock.yaml",
    "**/pnpm-lock.yaml",
    "**/yarn-error.log",
]

# Regular expressions to match variables, types, and other constructs
VAR_REGEX = re.compile(r"\b(const|let|var)\s+(\w+)")
TYPE_REGEX = re.compile(r"\b(type|interface|declare)\s+(\w+)")
FUNCTION_REGEX = re.compile(r"\bfunction\s+(\w+)")
CLASS_REGEX = re.compile(r"\bclass\s+(\w+)")
IMPORT_EXPORT_REGEX = re.compile(r"\b(import|export)\s+")
ENUM_REGEX = re.compile(r"\benum\s+(\w+)")


def is_ignored(path):
    for pattern in IGNORE_PATTERNS:
        if fnmatch(path, pattern):
            return True
    return False


def find_constructs(file_path):
    constructs = []

    try:
        with open(file_path, "r", encoding="utf-8") as file:
            lines = file.readlines()
            for line_num, line in enumerate(lines, start=1):
                for match in VAR_REGEX.finditer(line):
                    constructs.append(
                        {
                            "type": match.group(1),
                            "name": match.group(2),
                            "location": f"{file_path}:{line_num}:{match.start(2)}",
                            "used": check_usage(match.group(2), lines),
                        }
                    )
                for match in TYPE_REGEX.finditer(line):
                    constructs.append(
                        {
                            "type": match.group(1),
                            "name": match.group(2),
                            "location": f"{file_path}:{line_num}:{match.start(2)}",
                            "used": check_usage(match.group(2), lines),
                        }
                    )
                for match in FUNCTION_REGEX.finditer(line):
                    constructs.append(
                        {
                            "type": "function",
                            "name": match.group(1),
                            "location": f"{file_path}:{line_num}:{match.start(1)}",
                            "used": check_usage(match.group(1), lines),
                        }
                    )
                for match in CLASS_REGEX.finditer(line):
                    constructs.append(
                        {
                            "type": "class",
                            "name": match.group(1),
                            "location": f"{file_path}:{line_num}:{match.start(1)}",
                            "used": check_usage(match.group(1), lines),
                        }
                    )
                for match in IMPORT_EXPORT_REGEX.finditer(line):
                    constructs.append(
                        {
                            "type": match.group(1),
                            "name": None,
                            "location": f"{file_path}:{line_num}:{match.start(1)}",
                            "used": check_usage(match.group(1), lines),
                        }
                    )
                for match in ENUM_REGEX.finditer(line):
                    constructs.append(
                        {
                            "type": "enum",
                            "name": match.group(1),
                            "location": f"{file_path}:{line_num}:{match.start(1)}",
                            "used": check_usage(match.group(1), lines),
                        }
                    )
    except Exception as e:
        logging.error(f"Error processing file {file_path}: {e}")

    return constructs


def check_usage(name, lines):
    pattern = re.compile(r"\b" + re.escape(name) + r"\b")
    for line in lines:
        if pattern.search(line):
            return "Yes"
    return "No"


def process_files(file_paths):
    results = []
    with ProcessPoolExecutor() as executor:
        future_to_file = {
            executor.submit(find_constructs, file_path): file_path
            for file_path in file_paths
        }
        for future in as_completed(future_to_file):
            file_path = future_to_file[future]
            try:
                data = future.result()
                results.extend(data)
            except Exception as exc:
                logging.error(f"{file_path} generated an exception: {exc}")
    return results


def output_to_console(results):
    print("| Construct | Type | Location | Used |")
    print("|-----------|------|----------|------|")
    for item in results:
        name = item["name"] if item["name"] else "-"
        print(f"| {name} | {item['type']} | {item['location']} | {item['used']} |")


def main():
    # Parse command-line arguments
    parser = argparse.ArgumentParser(
        description="List all variables, functions, classes, and TypeScript types in specified files."
    )
    parser.add_argument(
        "--directory",
        type=str,
        default=".",
        help="The directory to scan for files. Default is the current directory.",
    )
    parser.add_argument(
        "--json_output",
        type=str,
        default="addons/.output/constructs.json",
        help="The output JSON file path. Default is 'addons/.output/constructs.json'.",
    )
    parser.add_argument(
        "--md_output",
        type=str,
        default="addons/.output/constructs.md",
        help="The output Markdown file path. Default is 'addons/.output/constructs.md'.",
    )
    parser.add_argument(
        "--console", action="store_true", help="Output results to console."
    )
    args = parser.parse_args()

    # Configure logging
    logging.basicConfig(
        level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s"
    )

    results = []
    file_paths = []

    # Walk through the directory and collect file paths with the specified extensions
    for root, dirs, files in os.walk(args.directory):
        # Remove ignored directories from traversal
        dirs[:] = [d for d in dirs if not is_ignored(os.path.join(root, d))]
        for file in files:
            file_path = os.path.join(root, file)
            if file.endswith(FILE_EXTENSIONS) and not is_ignored(file_path):
                file_paths.append(file_path)

    logging.info(f"Found {len(file_paths)} files to process.")

    # Process files concurrently
    results = process_files(file_paths)

    # Write results to JSON file
    with open(args.json_output, "w", encoding="utf-8") as json_file:
        json.dump(results, json_file, indent=4)

    # Write results to Markdown file
    with open(args.md_output, "w", encoding="utf-8") as md_file:
        md_file.write("| Construct | Type | Location | Used |\n")
        md_file.write("|-----------|------|----------|------|\n")
        for item in results:
            name = item["name"] if item["name"] else "-"
            md_file.write(
                f"| {name} | {item['type']} | {item['location']} | {item['used']} |\n"
            )

    logging.info(f"Results written to {args.json_output} and {args.md_output}")

    # Optionally output results to console
    if args.console:
        output_to_console(results)


if __name__ == "__main__":
    main()
