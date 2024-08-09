# py addons\reliverse\relimter\python\tasks\list-disable-directives.py

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

# Regular expressions to match specified comments or directives
PATTERNS = [
    re.compile(r"// @ts-expect-error.*"),
    re.compile(r"\{\s*\/\*\s*@ts-expect-error.*\*\/\s*\}"),
    re.compile(r"// @ts-ignore.*"),
    re.compile(r"\{\s*\/\*\s*@ts-ignore.*\*\/\s*\}"),
    re.compile(r"/\* eslint-disable.*"),
    re.compile(r"// eslint-disable-next-line.*"),
    re.compile(r"\{\s*\/\*\s*eslint-disable-next-line.*\*\/\s*\}"),
    re.compile(r"// biome-ignore.*"),
    re.compile(r"\{\s*\/\*\s*biome-ignore.*\*\/\s*\}"),
]


def is_ignored(path):
    for pattern in IGNORE_PATTERNS:
        if fnmatch(path, pattern):
            return True
    return False


def find_comments(file_path):
    comments = []

    try:
        with open(file_path, "r", encoding="utf-8") as file:
            lines = file.readlines()
            for line_num, line in enumerate(lines, start=1):
                for pattern in PATTERNS:
                    if pattern.search(line):
                        comments.append(
                            {
                                "pattern": pattern.pattern,
                                "location": f"{file_path}:{line_num}:{pattern.search(line).start()}",
                            }
                        )
    except Exception as e:
        logging.error(f"Error processing file {file_path}: {e}")

    return comments


def process_files(file_paths):
    results = []
    with ProcessPoolExecutor() as executor:
        future_to_file = {
            executor.submit(find_comments, file_path): file_path
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
    print("| Pattern | Location |")
    print("|---------|----------|")
    for item in results:
        print(f"| {item['pattern']} | {item['location']} |")


def main():
    # Parse command-line arguments
    parser = argparse.ArgumentParser(
        description="List locations of specific comments or directives in specified files."
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
        default="addons/.output/comments.json",
        help='The output JSON file path. Default is "addons/.output/comments.json".',
    )
    parser.add_argument(
        "--md_output",
        type=str,
        default="addons/.output/comments.md",
        help='The output Markdown file path. Default is "addons/.output/comments.md".',
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

    # Ensure output directory exists
    os.makedirs(os.path.dirname(args.json_output), exist_ok=True)
    os.makedirs(os.path.dirname(args.md_output), exist_ok=True)

    # Write results to JSON file
    with open(args.json_output, "w", encoding="utf-8") as json_file:
        json.dump(results, json_file, indent=4)

    # Write results to Markdown file
    with open(args.md_output, "w", encoding="utf-8") as md_file:
        md_file.write("| Pattern | Location |\n")
        md_file.write("|---------|----------|\n")
        for item in results:
            md_file.write(f"| {item['pattern']} | {item['location']} |\n")

    logging.info(f"Results written to {args.json_output} and {args.md_output}")

    # Optionally output results to console
    if args.console:
        output_to_console(results)


if __name__ == "__main__":
    main()
