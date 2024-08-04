# With all flags: py addons\reliverse\relimter\python\tasks\parse-content.py --process addons\reliverse\academy --exclude *.json --comments slash --rewrite 1
# Interactively: py addons\reliverse\relimter\python\tasks\parse-content.py

import argparse
import fnmatch
import os
import sys


def get_user_input(prompt):
    return input(prompt)


def main():
    # Set up argument parser
    parser = argparse.ArgumentParser(description="Process some files.")
    parser.add_argument("--process", type=str, help="The path to the folder to process")
    parser.add_argument(
        "--exclude",
        type=str,
        help="Comma-separated list of filenames or patterns to exclude",
    )
    parser.add_argument(
        "--comments",
        type=str,
        choices=["hash", "slash"],
        default="slash",
        help='Comment style to use before each file content ("hash" for #, "slash" for //)',
    )
    parser.add_argument(
        "--rewrite",
        type=int,
        help="Specify the output file number to rewrite if it already exists",
    )

    args = parser.parse_args()

    if args.process:
        folder_path = args.process
    else:
        folder_path = get_user_input("Enter the path to the folder: ")

    if args.exclude:
        exclude_patterns = args.exclude.split(",")
    else:
        exclude_patterns = get_user_input(
            "Enter the filenames or patterns to exclude (separated by commas): "
        ).split(",")

    comment_style = "#" if args.comments == "hash" else "//"
    rewrite_number = args.rewrite

    try:
        # Normalize the folder path to handle different separators
        folder_path = os.path.normpath(folder_path)

        # Create the output directory if it doesn't exist
        output_dir = os.path.join("addons", ".output", "parse-content")
        os.makedirs(output_dir, exist_ok=True)

        # Determine the output file number
        file_number = 1
        while os.path.exists(os.path.join(output_dir, f"{file_number}.txt")):
            file_number += 1

        if rewrite_number is not None:
            output_file_path = os.path.join(output_dir, f"{rewrite_number}.txt")
            if not os.path.exists(output_file_path):
                print(f"Warning: File {rewrite_number}.txt does not exist.")
                user_choice = (
                    get_user_input(
                        f"Do you want to overwrite {file_number - 1}.txt (latest found file) or create a new file {file_number}.txt? (o - overwrite {file_number - 1}.txt / c - create {file_number}.txt): "
                    )
                    .strip()
                    .lower()
                )
                if user_choice == "o":
                    file_number -= 1
                elif user_choice == "c":
                    pass
                else:
                    print("Invalid choice. Exiting.")
                    sys.exit(1)
            else:
                file_number = rewrite_number

        # Write all content to the specified file
        output_file_path = os.path.join(output_dir, f"{file_number}.txt")
        with open(output_file_path, "w") as output_file:
            for root, _, files in os.walk(folder_path):
                for file_name in files:
                    # Check if file should be excluded based on patterns
                    if any(
                        fnmatch.fnmatch(file_name, pattern)
                        for pattern in exclude_patterns
                    ):
                        continue

                    # Construct the full file path
                    file_path = os.path.join(root, file_name)

                    # Read the file content
                    with open(file_path, "r") as file:
                        file_content = file.read()

                    # Write the filename and content to the output file
                    output_file.write(f"{comment_style} {file_name}\n")
                    output_file.write(file_content)
                    output_file.write("\n\n")  # Add some spacing between files

    except KeyboardInterrupt:
        print("\nProcess interrupted by user. Exiting...")


if __name__ == "__main__":
    main()
