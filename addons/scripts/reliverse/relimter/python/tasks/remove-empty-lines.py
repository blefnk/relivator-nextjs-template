# ! 🔴 USE AT OWN RISK 🔴 ! NOT TESTED TOO MUCH
# We'll use the pathlib module to handle file paths and the fnmatch module to apply the ignore patterns.

import fnmatch
import os
import sys
from pathlib import Path

# List of patterns to ignore
ignores = [
    "**/.__.env",
    "**/.env.example",
    "**/.env",
    "**/.eslintcache",
    "**/.git",
    "**/.gitattributes",
    "**/.github",
    "**/.gitignore",
    "**/.idea",
    "**/.million",
    "**/.next",
    "**/.npmrc",
    "**/.nyc_output",
    "**/.putout.json",
    "**/.turbo",
    "**/.venv",
    "**/.vercel",
    "**/.vscode",
    "**/.yarn",
    "**/*.env",
    "**/*.gif",
    "**/*.jpeg",
    "**/*.md",
    "**/*.mdx",
    "**/*.png",
    "**/*.py",
    "**/*.svg",
    "**/*.tsbuildinfo",
    "**/*.yml",
    "**/build",
    "**/coverage",
    "**/dist-dev",
    "**/dist",
    "**/fixture",
    "**/license",
    "**/node_modules",
    "**/package-lock.json",
    "**/pnpm-lock.yaml",
    "**/public",
]

# Allowed file extensions
allowed_extensions = {
    # ".js",
    # ".ts",
    # ".jsx",
    # ".tsx",
    # ".json",
    # ".mjs",
    # ".cjs",
    # "*.d.ts",
    ".mts",
}


def is_ignored(path, ignores):
    """Check if a path matches any of the ignore patterns."""
    for pattern in ignores:
        if fnmatch.fnmatch(path.as_posix(), pattern):
            return True
    return False


def remove_empty_lines_from_file(file_path):
    """Remove empty lines from a file."""
    try:
        with open(file_path, "r", encoding="utf-8") as file:
            lines = file.readlines()
        with open(file_path, "w", encoding="utf-8") as file:
            file.writelines(line for line in lines if line.strip())
        print(f"Processed: {file_path}")
    except Exception as e:
        print(f"Error processing {file_path}: {e}")


def process_directory(directory, ignores, allowed_extensions):
    """Process all files in the directory, excluding those that match ignore patterns."""
    try:
        for root, dirs, files in os.walk(directory):
            root_path = Path(root)
            # Remove ignored directories from the search
            dirs[:] = [d for d in dirs if not is_ignored(root_path / d, ignores)]
            if is_ignored(root_path, ignores):
                print(f"Ignored directory: {root_path}")
                continue
            for file in files:
                file_path = root_path / file
                if file_path.suffix in allowed_extensions and not is_ignored(
                    file_path, ignores
                ):
                    print(f"Processing file: {file_path}")
                    remove_empty_lines_from_file(file_path)
        print("Processing completed.")
    except Exception as e:
        print(f"Error during directory processing: {e}")


# Path to project directory
project_directory = "."

if __name__ == "__main__":
    process_directory(project_directory, ignores, allowed_extensions)
    print("Script execution finished.")
    sys.exit(0)
