# [UNSTABLE] ⛔ WARNING: This script will modify your codebase.
# The result may be hundreds "changed" files in Git Changes.
#
# Please make sure to back up your codebase before running this script.
#
#  ▶️ py addons/scripts/reliverse/relimter/python/tasks/avoid-hard-coded-numbers.py
# This script automatically refactors JavaScript/TypeScript codebase to replace hard-coded numbers with named constants. The script will scan through files with specific extensions, detect hard-coded numbers, and replace them with meaningful named constants.
# @see https://blog.codacy.com/what-is-clean-code

import re
from pathlib import Path

# File extensions to check
FILE_EXTENSIONS = (
    # ".js",
    # ".ts",
    # ".jsx",
    # ".tsx",
    # ".mjs",
    # ".mts",
    # ".cjs",
    # ".cts",
    # ".mjsx",
    ".mtsx",
)

# Mapping for common hard-coded numbers to named constants
NAMED_CONSTANTS = {
    0: "ZERO",
    1: "ONE",
    2: "TWO",
    3: "THREE",
    4: "FOUR",
    5: "FIVE",
    6: "SIX",
    7: "SEVEN",
    8: "EIGHT",
    9: "NINE",
    10: "TEN",
    0.1: "TEN_PERCENT",
    0.2: "TWENTY_PERCENT",
    0.25: "QUARTER",
    0.5: "HALF",
    0.75: "THREE_QUARTERS",
    1.5: "ONE_AND_HALF",
    3.14: "PI",
    100: "HUNDRED",
    1000: "THOUSAND",
    60: "SECONDS_IN_MINUTE",
    3600: "SECONDS_IN_HOUR",
    24: "HOURS_IN_DAY",
    365: "DAYS_IN_YEAR",
    1024: "KILOBYTE",
    1000000: "MILLION",
    1000000000: "BILLION",
    "7d": "DAYS_IN_WEEK",
    "7d/w": "DAYS_IN_WEEK",
}


def find_files(path: Path):
    """Recursively find all files in the given directory with the specified extensions."""
    return [f for f in path.rglob("*") if f.suffix in FILE_EXTENSIONS]


def replace_hard_coded_numbers(file_path: Path):
    """Replace hard-coded numbers and specific strings in the file with named constants."""
    with file_path.open("r", encoding="utf-8") as file:
        content = file.read()

    used_constants = set()

    def replacer(match):
        value = match.group(0)
        if value in NAMED_CONSTANTS:
            used_constants.add(NAMED_CONSTANTS[value])
            return NAMED_CONSTANTS[value]
        try:
            float_value = float(value)
            for key, constant in NAMED_CONSTANTS.items():
                if isinstance(key, (int, float)) and float_value == key:
                    used_constants.add(constant)
                    return constant
        except ValueError:
            pass
        return value

    # Update regex to match only numeric literals and specific strings
    pattern = re.compile(r'\b(?:const|var|let)\s+\w+\s*=\s*([\d\.]+|"7d"|"7d/w")')

    content = pattern.sub(replacer, content)

    if used_constants:
        constants_declaration = "\n".join(
            [
                f"const {constant} = {key};"
                for key, constant in NAMED_CONSTANTS.items()
                if constant in used_constants
            ]
        )
        content = constants_declaration + "\n\n" + content

    with file_path.open("w", encoding="utf-8") as file:
        file.write(content)


def process_files(path: Path):
    """Process all files in the given directory."""
    files = find_files(path)
    for file_path in files:
        replace_hard_coded_numbers(file_path)


if __name__ == "__main__":
    # Directory containing the files to process
    directory_path = Path("src")

    # Validate the directory path
    if not directory_path.exists() or not directory_path.is_dir():
        raise FileNotFoundError(
            f"The directory {directory_path} does not exist or is not a directory."
        )

    # Process the files
    process_files(directory_path)

    print(
        "[@reliverse/addons/relimter-python/avoid-hard-coded-numbers] Processing complete!"
    )
