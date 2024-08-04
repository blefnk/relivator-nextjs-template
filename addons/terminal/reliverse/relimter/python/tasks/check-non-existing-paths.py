import fnmatch
import json
import os

IGNORE_PATTERNS = [
    "**/node_modules",
    "**/.git",
    "**/.idea",
    "**/.next",
    "**/build",
    "**/dist",
]


def matches_ignore_pattern(path, patterns):
    """Check if the path matches any of the ignore patterns."""
    for pattern in patterns:
        if fnmatch.fnmatch(path, pattern):
            return True
    return False


def find_json_files(root_dir, ignore_patterns):
    """Recursively find all JSON files in the root directory, ignoring specified patterns."""
    json_files = []
    for root, _, files in os.walk(root_dir):
        if matches_ignore_pattern(root, ignore_patterns):
            continue
        for file in files:
            if file.endswith(".json"):
                json_files.append(os.path.join(root, file))
    return json_files


def check_paths_in_json(json_files):
    """Check paths in JSON files and log non-existing paths."""
    non_existing_paths = []

    for json_file in json_files:
        with open(json_file, "r") as file:
            try:
                data = json.load(file)
                for key, value in data.items():
                    if isinstance(value, str) and not os.path.isabs(
                        value
                    ):  # Assuming paths are in string format and relative
                        if not os.path.exists(
                            os.path.join(os.path.dirname(json_file), value)
                        ):
                            non_existing_paths.append((json_file, key, value))
            except json.JSONDecodeError:
                print(f"Error decoding JSON in file: {json_file}")

    return non_existing_paths


def write_output(non_existing_paths, output_file):
    """Write the non-existing paths to the output file."""
    with open(output_file, "w") as file:
        for json_file, key, value in non_existing_paths:
            file.write(f"File: {json_file}, Key: {key}, Path: {value}\n")


def main():
    root_dir = "."
    output_file = "addons/.output/non_existing_paths.txt"

    json_files = find_json_files(root_dir, IGNORE_PATTERNS)
    non_existing_paths = check_paths_in_json(json_files)
    write_output(non_existing_paths, output_file)
    print(f"Check complete. Results written to {output_file}")


if __name__ == "__main__":
    main()
