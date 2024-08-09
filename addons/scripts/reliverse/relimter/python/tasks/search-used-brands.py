# Extract brands, websites, NPM libs, and etc used in the project
# py addons/scripts/reliverse/relimter/python/tasks/search-used-brands.py

import fnmatch
import json
import os
import re


def extract_brands(text):
    # Simple regex for brands: capitalized words
    return set(re.findall(r"\b[A-Z][a-zA-Z]+\b", text))


def extract_websites(text):
    # Regex for URLs
    return set(re.findall(r"(https?://[^\s]+)", text))


def extract_npm_libs(package_json):
    npm_libs = set()
    try:
        with open(package_json, "r", encoding="utf-8") as f:
            data = json.load(f)
            if "dependencies" in data:
                npm_libs.update(data["dependencies"].keys())
            if "devDependencies" in data:
                npm_libs.update(data["devDependencies"].keys())
    except Exception as e:
        print(f"Error reading {package_json}: {e}")
    return npm_libs


def is_binary(file_path):
    """
    Check if a file is binary.
    """
    try:
        with open(file_path, "rb") as file:
            for block in iter(lambda: file.read(1024), b""):
                if b"\0" in block:
                    return True
        return False
    except Exception as e:
        print(f"Error reading {file_path}: {e}")
        return False


def process_file(file_path, extracted_data):
    if is_binary(file_path):
        return

    try:
        with open(file_path, "r", encoding="utf-8") as file:
            content = file.read()
            extracted_data["brands"].update(extract_brands(content))
            extracted_data["websites"].update(extract_websites(content))
    except Exception as e:
        print(f"Error reading {file_path}: {e}")


def write_to_log(file_path, data):
    try:
        with open(file_path, "w", encoding="utf-8") as file:
            file.write("Brands:\n")
            for item in sorted(data["brands"]):
                file.write(f"{item}\n")
            file.write("\nWebsites:\n")
            for item in sorted(data["websites"]):
                file.write(f"{item}\n")
            file.write("\nNPM Libraries:\n")
            for item in sorted(data["npm_libs"]):
                file.write(f"{item}\n")
    except Exception as e:
        print(f"Error writing to {file_path}: {e}")


def should_ignore(path, ignore_patterns):
    for pattern in ignore_patterns:
        if fnmatch.fnmatch(path, pattern):
            return True
    return False


def main(project_dir, output_file):
    extracted_data = {"brands": set(), "websites": set(), "npm_libs": set()}

    # List of patterns to ignore
    ignore_patterns = [
        "**/.git",
        "**/.idea",
        "**/.million",
        "**/.next",
        "**/.nyc_output",
        "**/.pnp.*",
        "**/.putout.ts",
        "**/.turbo",
        "**/.venv",
        "**/.yarn",
        "**/*.gif",
        "**/*.jpeg",
        "**/*.json",
        "**/*.lock",
        "**/*.png",
        "**/*.pyd",
        "**/*.svg",
        "**/*.woff2",
        "**/build",
        "**/coverage",
        "**/dist-dev",
        "**/dist",
        "**/eslint.config.*",
        "**/fixture",
        "**/next-env.d.ts",
        "**/node_modules",
        "**/package-lock.json",
        "**/pnpm-lock.yaml",
        "**/public",
        "**/target",
        "**/yarn-error.log",
        "**/yarn.lock",
    ]

    # Check README.md and package.json first
    readme_path = os.path.join(project_dir, "README.md")
    package_json_path = os.path.join(project_dir, "package.json")

    if os.path.exists(readme_path):
        process_file(readme_path, extracted_data)

    if os.path.exists(package_json_path):
        extracted_data["npm_libs"].update(extract_npm_libs(package_json_path))

    # Check other files in the project directory
    for root, dirs, files in os.walk(project_dir):
        # Remove ignored directories from the walk
        dirs[:] = [
            d for d in dirs if not should_ignore(os.path.join(root, d), ignore_patterns)
        ]
        for file in files:
            file_path = os.path.join(root, file)
            if not should_ignore(file_path, ignore_patterns) and file not in [
                "README.md",
                "package.json",
            ]:
                process_file(file_path, extracted_data)

    # Write results to output file
    write_to_log(output_file, extracted_data)


if __name__ == "__main__":
    project_directory = "."
    output_file_path = "search-used-brands.log"
    main(project_directory, output_file_path)
